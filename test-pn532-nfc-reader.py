import time
import binascii
import ndef

from pn532pi import Pn532, pn532
from pn532pi import Pn532I2c

PN532_I2C = Pn532I2c(1)
nfc = Pn532(PN532_I2C)

def setup():
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
    time.sleep(1)
    success, uid = nfc.readPassiveTargetID(pn532.PN532_MIFARE_ISO14443A_106KBPS)
    if (success):
        print("Found card")
        print("UID Value: {}".format(binascii.hexlify(uid)))
        if (len(uid) == 4):
            print("Authenticate block 4 with default KEYA")
            keya= bytearray([0xD3, 0xF7, 0xD3, 0xF7, 0xD3, 0xF7])
            for block in range(4,5):   
                success = nfc.mifareclassic_AuthenticateBlock(uid, block, 0, keya)
                if (success):
                    #print("Sector 1 (Blocks 4..7) authenticated")
                    success, data = nfc.mifareclassic_ReadDataBlock(block)
                    time.sleep(1)
                    if (success):
                        print("Raw data at block {}: {}".format(block, data))
                        decoded_data = binascii.hexlify(data)
                        print("Reading Block {}: {}".format(block, decoded_data))
                        #print("Decoded Block {}: {}".format(block, ndef.message_decoder(decoded_data)))
                    else:
                        print("Failed to read requested block. Try another key?")
        else:
            print("Failed to authenticate. Try another key?")
            
    return False

if __name__ == '__main__':
    setup()
    found = loop()
    while not found:
        found = loop()
