# cloudscraper, bs4 and other libraries need to be installed

import requests
import json
import zlib
import cloudscraper
#import brotli
from bs4 import BeautifulSoup
import sys
#import time
import subprocess
from datetime import datetime

if (len(sys.argv) > 1):
    
    arg1 = sys.argv[1]
    if (len(sys.argv) > 2):
        
        arg2 = sys.argv[2]
        if (len(sys.argv) > 3): # c
            arg3 = sys.argv[3]
            
        if (len(sys.argv) > 4): # rr_add
            arg4 = sys.argv[4]
            
        if (len(sys.argv) > 5): # rr_id
            arg5 = sys.argv[5]
            
        if (len(sys.argv) > 6): # rr
            arg6 = sys.argv[6]
        if (len(sys.argv) > 7):
            arg7 = sys.argv[7]

def printer(name):
    content_encoding = name.headers.get('Content-Encoding')

    # Decompress the response content based on the encoding
    if content_encoding == 'gzip':
        decompressed_content = zlib.decompress(name.content, zlib.MAX_WBITS | 16)
    elif content_encoding == 'deflate':
        decompressed_content = zlib.decompress(name.content)
    #elif content_encoding == 'br':
    #    decompressed_content = brotli.decompress(name.content)
    else:
        decompressed_content = name.content

    html_content = decompressed_content.decode('utf-8')

    soup = BeautifulSoup(html_content, 'html.parser')
    print(soup.prettify())
    
    
def souper(name):
    content_encoding = name.headers.get('Content-Encoding')

    # Decompress the response content based on the encoding
    if content_encoding == 'gzip':
        decompressed_content = zlib.decompress(name.content, zlib.MAX_WBITS | 16)
    elif content_encoding == 'deflate':
        decompressed_content = zlib.decompress(name.content)
    #elif content_encoding == 'br':
    #    decompressed_content = brotli.decompress(name.content)
    else:
        decompressed_content = name.content

    html_content = decompressed_content.decode('utf-8')

    soup = BeautifulSoup(html_content, 'html.parser')
    return soup

url0 = f"https://rivalregions.com/storage?c={arg3}" # 6ed08bb641100b1a8dce966eff8398a9
url1 = "https://rivalregions.com/storage/market/26"
url2 = "https://rivalregions.com/storage/sell/26"

rr_f = arg2 # "2371c50576d04f474ee1fa7d19bcbbd4"
php_sessid = arg1 # "c7rpeeq1fr9ojrcmsu140uhelr"
c = arg3 #'6ed08bb641100b1a8dce966eff8398a9'
rr_add = arg4 # 4fa825f8e2523fd88336b322e95362a4
rr_id = arg5 # 868625164333238
rr = arg6 # 45dbac3c5f93d3ec953b4c003dfedc7f
kim = arg7

headers = {
    'Accept' : 'text/html, */*; q=0.01',
    'Accept-Encoding' : 'gzip, deflate, br, zstd',
    'Accept-Language' : 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7,fr;q=0.6',
    'Content-Length' : '34',
    'Content-Type' : 'application/x-www-form-urlencoded',
    'Cookie' :  f'PHPSESSID={php_sessid}; rr={rr}; rr_id={rr_id}; rr_add={rr_add}; rr_f={rr_f}',
    'Origin' : 'https://rivalregions.com',
    'Priority': 'u=1, i',
    'Referer': 'https://rivalregions.com/',
    'Sec-Ch-Ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
    'Sec-Ch-Ua-Mobile' : '?0',
    'Sec-Ch-Ua-Platform': "Windows",
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
}
cookies = {
    'PHPSESSID' : php_sessid,
    'rr' : rr,
    'rr_add' : rr_add,
    'rr_f' : rr_f,
    'rr_id' : rr_id
}
data = {    
    'c': c
}


def check_flying():
    url = f"https://rivalregions.com/main/content?c={c}"

    headers_overview = {
        "Accept": "text/html, */*; q=0.01",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.5",
        "Connection" : "keep-alive",
        "Cookie": f"rr_f={rr_f}; rr={rr}; rr_id={rr_id}; rr_add={rr_add}; PHPSESSID={php_sessid};",
        
        "Host" : "rivalregions.com",
        "Priority": "u=0",
        "Referer": "https://rivalregions.com/",   
        

        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "TE" : "trailers",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0",
        "X-Requested-With": "XMLHttpRequest"
    }

    cookies_overview = {
        'PHPSESSID' : php_sessid,
        'rr' : rr,
        'rr_add' : rr_add,
        'rr_f' : rr_f,
        'rr_id' : rr_id
    }

    data = {
        'c' : c
    }

    scraper = cloudscraper.create_scraper()

    overview = scraper.get(url=url, headers=headers_overview, cookies=cookies_overview)

    soup = souper(overview)
    if soup.find("div", class_="map_d_b_ind"):
        is_flying = soup.find("div", class_="button_red pointer map_d_b_ind index_registartion_home").getText().strip()
        return is_flying.lower()
    else: 
        return ""


now = datetime.now()
scraper = cloudscraper.create_scraper()

get1 = scraper.get(url=url0, headers=headers,cookies=cookies, data=data)
#printer(get1)
soup_main = souper(get1)
span = soup_main.find("span", class_="storage_number_change", attrs={'url': '26'}).text
depodaki = int(span.replace(".",""))
print("Depoda bulunan: ",depodaki)
if (depodaki == 0):
    print("Stop")
    sys.exit(0)
if (depodaki < 3000000):
    print("fly")
    if (kim == "buddha"):
        lls_amount = "188"
    else:
        lls_amount = "228"

    if ("annuler" in check_flying()):
        print("already done")
    else:
        buy_lls = subprocess.run(["python3", "lss.py", php_sessid, rr_f, "200073", rr, rr_id, rr_add, c, lls_amount])

        fly_done = subprocess.run(["python3", "fly_done.py", "200073", c, php_sessid, rr_f, rr, rr_add, rr_id], capture_output=True, text=True) 
        hour = fly_done.stdout.split(":")[-1].strip()[:2]
        minute = int(fly_done.stdout.split(":")[-1].strip()[2:]) + 1

        if ((minute) > 58):
            minute = 1
            hour += 1
    
        # work and sell e request at

        url = "http://localhost:3004/api/work_and_sell"
        headers = {
            'Content-Type': 'application/json'
        }
        body = {
            'sess_id' : php_sessid,
            'rr_f' : rr_f,
            'c' : c,
            'rr_add' : rr_add,
            'rr_id' : rr_id,
            'rr':rr,

            'hour' : hour,
            'minute' : minute,
            'kim' : kim,
            'factory' : '101643'
        }

        work_and_gly = requests.post(url=url, data=json.dumps(body), headers=headers)
        print("must be flied now...")

if (depodaki > 614400):        
    miktar = 614400        
elif (depodaki > 154):
    miktar = depodaki
else: 
    print("Stop bir hata var")
    sys.exit(0)


kimin_headers = {
    'Accept' : 'text/html, */*; q=0.01',
    'Accept-Encoding' : 'gzip, deflate, br, zstd',
    'Accept-Language' : 'en-US,en;q=0.9,fr;q=0.8',
    'Content-Length' : '34',
    'Content-Type' : 'application/x-www-form-urlencoded',
    'Cookie' :  f'PHPSESSID={php_sessid}; rr={rr}; rr_id={rr_id}; rr_add={rr_add}; rr_f={rr_f}',
    'Origin' : 'https://rivalregions.com',
    'Priority': 'u=1, i',
    'Referer': 'https://rivalregions.com/',
    'Sec-Ch-Ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Opera";v="119"',
    'Sec-Ch-Ua-Mobile' : '?0',
    'Sec-Ch-Ua-Platform': "Linux",
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 OPR/119.0.0.0',
    "X-requested-with" : "XMLHttpRequest"
}
post1 = scraper.post(url=url1, headers=kimin_headers, cookies=cookies, data=(data)) # rv'ye tiklama islemi
soup_1 = souper(post1)
kimin = soup_1.findAll("span", class_="storage_see")[1]["action"]
market_fiyati = int(soup_1.findAll("span", class_="dot")[3].text[:-2].replace(".",""))
print("Guncel market fiyati: ", market_fiyati)
ekle_or_degistir = soup_1.find("span", class_="storage_sell dot").text[:1]

if (ekle_or_degistir == "p" and depodaki == 0): 
    print("ERROR: Depo bos ve teklifte kaynak yok, program kapatiliyor...")
    print("Stop")
    sys.exit(0)
    #break # depo bos ve offre yok

if (kimin == f"slide/profile/{rr_id}" or market_fiyati < 70000): # bizim ya da fiyat dusuk
    print("En iy fiyat bizim veya satis fiyati cok dusuk...")
    print("Su anki saat: ",now.strftime("%H:%M:%S"))
    #print("Sleep 310...\n")
    #time.sleep(310)
    
else: # bizim degil ve satmaya uygun
    if (ekle_or_degistir == "m"):
        
        post2 = scraper.post(url=url2, headers=headers, cookies=cookies, data=data)
        
        soup_2 = souper(post2)
        offre_inp = int(soup_2.find("input", class_="storage_sell_ammount")["value"])
        
        
        if (offre_inp < 614400 and offre_inp+depodaki < 614400):
            miktar = offre_inp+depodaki
        else: miktar = 614400
        
    elif (ekle_or_degistir == "p"):
        post2 = scraper.post(url=url2, headers=headers, cookies=cookies, data=data)
        
        soup_2 = souper(post2)
        vergi = int(soup_2.find("div", class_="small").text[-3:-2])
        if (vergi > 0):
            print("ERROR: Vergi 0'dan fazla oldugu icin program kapatiliyor...")
            print("Stop")
            sys.exit(0)
            #break
    else: 
        print("ERROR: modifier ya da placer bulunamadi, post1 de hata var...")
        print("Stop")
        sys.exit(0)
        #break
    
    fiyat = market_fiyati - 1
    print("Yeni fiyat ekleniyor:", fiyat)
    post3_headers = {
    'authority': 'rivalregions.com',
    'method': 'POST',
    'path': f'/storage/newsell/26/{miktar}/{fiyat}',
    'scheme': 'https',
    'Accept' : 'text/html, */*; q=0.01',
    'Accept-Encoding' : 'gzip, deflate, br, zstd',
    'Accept-Language' : 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7,fr;q=0.6',
    'Content-Length' : '34',
    'Content-Type' : 'application/x-www-form-urlencoded',
    'Cookie' : f'PHPSESSID={php_sessid}; rr=45dbac3c5f93d3ec953b4c003dfedc7f; rr_id=868625164333238; rr_add=4fa825f8e2523fd88336b322e95362a4; rr_f={rr_f}',
    'Origin' : 'https://rivalregions.com',
    'Priority': 'u=1, i',
    'Referer': 'https://rivalregions.com/',
    'Sec-Ch-Ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
    'Sec-Ch-Ua-Mobile' : '?0',
    'Sec-Ch-Ua-Platform': "Windows",
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    }
    post3_cookies = {
        'PHPSESSID' : php_sessid,
        'rr' : '45dbac3c5f93d3ec953b4c003dfedc7f',
        'rr_id' : '868625164333238',
        'rr_add' : '4fa825f8e2523fd88336b322e95362a4',
        'rr_f' : rr_f
    }
    url3 = "https://rivalregions.com/storage/newsell/26/" + str(miktar) + "/" + str(fiyat)
    
    post3 = scraper.post(url=url3, headers=post3_headers, cookies=post3_cookies, data=data)
    print("Su anki saat: ",now.strftime("%H:%M:%S"))
    printer(post3)
    #print("Sleep 310...\n")
    #time.sleep(310)