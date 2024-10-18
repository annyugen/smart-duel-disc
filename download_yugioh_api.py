import urllib.request, json

# Fetch all cards info from YGOPRODECK public API 
def download_yugioh_json():
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36'}

    url = "https://db.ygoprodeck.com/api/v7/cardinfo.php"
    req = urllib.request.Request(url=url, headers=headers)

    with urllib.request.urlopen(req) as response:
        data = json.load(response)
        json.dump(data.get("data"), open("YuGiOh.json", "w"))
        print("Downloaded cards info successfully!")

# Converting list of json objects into Python dict with card id as the key
def convert_json_to_dict(yugioh_json):
    yugioh_dict = {}
    for card in yugioh_json:
        id = card['id']
        yugioh_dict[id] = card
    return yugioh_dict

if __name__ == '__main__':
    try:
        with open('YuGiOh.json', 'r') as file:
            yugioh_json = json.load(file)
            data = convert_json_to_dict(yugioh_json)
            print("Generate cards dictionary successfully")
    except FileNotFoundError:
        print("YuGiOh.json not found! Might need to download it first!")
    except Exception as e:
        print("Unexpected error occured:", e)

