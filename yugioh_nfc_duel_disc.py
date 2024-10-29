import time
import binascii
import json
import logging

from pn532pi import Pn532, pn532
from pn532pi import Pn532I2c

PN532_I2C = Pn532I2c(1)
nfc = Pn532(PN532_I2C)


def setup():
    # Load card data as dict
    load_card_data()
    
    # Starting NFC reader
    time.sleep(5)
    nfc.begin()
    time.sleep(5)    
    version_data = nfc.getFirmwareVersion()
    time.sleep(5)
    if (not version_data):
        print("Didn't find PN532 board")
        raise RuntimeError("Didn't find PN532 board")
    
    print("Found PN5 {:#x} Firmware ver. {:d}.{:d}".format((version_data >> 24) & 0xFF, (version_data >> 16) & 0xFF,
                                                           (version_data >> 8) & 0xFF))
    nfc.SAMConfig()
    print("Waiting for Card ...")
    
def loop():
    card_code = None # This will hold the complete card code
    
    time.sleep(1)
    success, uid = nfc.readPassiveTargetID(pn532.PN532_MIFARE_ISO14443A_106KBPS)
    if (success):
        print("Found card")
        print("UID Value: {}".format(binascii.hexlify(uid)))
        if (len(uid) == 4):
            print("Authenticate block 4 with default KEYA")
            keya= bytearray([0xD3, 0xF7, 0xD3, 0xF7, 0xD3, 0xF7])
            
            # The yugioh card code is within block 4 & 5. For example, a complete card code 87074380
            # Authneticate block 4 and get the last byte
            success = nfc.mifareclassic_AuthenticateBlock(uid, 4, 0, keya)
            if (success):
                # Reading block 4
                success, data = nfc.mifareclassic_ReadDataBlock(4)
                time.sleep(1)
                if (success):
                    logging.debug("Raw data at block 4: {}".format(data))
                    logging.debug("Reading Block 4 last byte: {}".format(data[11:17]))
                    card_code = data[11:17]
                else:
                    print("Failed to read requested block. Try another key?")
                    
                # Reading block 5
                success, data = nfc.mifareclassic_ReadDataBlock(5)
                time.sleep(1)
                if (success):
                    logging.debug("Raw data at block 5: {}".format(data))
                    logging.debug("Reading Block 5 first couple bytes: {}".format(data[0:3]))
                    card_code = card_code + data[0:3]
                else:
                    print("Failed to read requested block. Try another key?")                
            else:
                print("Failed to authenticate. Try another key?")

            print("Card Passcode: {}".format(card_code))
    return False


# Converting list of json objects into Python dict with card id as the key
def convert_json_to_dict(yugioh_json):
    yugioh_dict = {}
    for card in yugioh_json:
        id = card['id']
        yugioh_dict[id] = card
    return yugioh_dict

def load_card_data():
    try:
        with open('YuGiOh.json', 'r') as file:
            yugioh_json = json.load(file)
            data = convert_json_to_dict(yugioh_json)
            print("Generate cards dictionary successfully!")
            return data
    except FileNotFoundError:
        logging.error("YuGiOh.json not found! Might need to download it first!")
        return None
    except Exception as e:
        logging.error("Unexpected error occured: {}".format(e))
        return None

if __name__ == '__main__':
    setup()
    found = loop()
    while not found:
        found = loop()
