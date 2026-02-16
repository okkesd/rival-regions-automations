# cloudscraper needs to be installed

import requests
import json
from datetime import datetime, timedelta
import sys
import time
import cloudscraper

if (len(sys.argv) > 1):
    
    arg1 = sys.argv[1]
    if (len(sys.argv) > 2):
        arg2 = sys.argv[2]
        if (len(sys.argv) > 3):
            arg3 = sys.argv[3] # 101643
        else: 
            arg3 = 101643
         
        if (len(sys.argv) > 4 and sys.argv[4]): # c
            arg4 = sys.argv[4]
        else:
            arg4 = "6ed08bb641100b1a8dce966eff8398a9"

        if (len(sys.argv) > 5 and sys.argv[5]): # rr_add
            arg5 = sys.argv[5]
        else:
            arg5 = 'e6b14dc854ecb26f5924ff74de24261d'

        if (len(sys.argv) > 6 and sys.argv[6]): # rr_id
            arg6 = sys.argv[6]
        else:
            arg6 = '868625164333238'
            
        if (len(sys.argv) > 7 and sys.argv[7]): # rr
            arg7 = sys.argv[7]
        else:
            arg7 = '2dda27e8478725da39a02cf6ae09b030'
        if (len(sys.argv) > 8):
            arg8 = sys.argv[8]
            
# changes every log in
php_sessid = arg1 # "th6kf2ca6me1r2vkjsnuen9mpp"
rr_f = arg2 # "69a72b873602f73a67fac61cfa10d6ac"

factory = arg3 # 100405 #  18171

rr= arg7 # "f9f695776d7612f6af20a6fd046bec1a" , '2dda27e8478725da39a02cf6ae09b030'
rr_id= arg6 # "2001352321", '868625164333238'
rr_add= arg5 # "0c0ccbb9da87e6550711f7c336f50cf8", 'e6b14dc854ecb26f5924ff74de24261d'
c = arg4 # 'd4b457aca19d7f05e6bbf19af1a731f2', '6ed08bb641100b1a8dce966eff8398a9'
kim = arg8

url = 'https://rivalregions.com/factory/assign'

headers = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
    "Content-Length" : "49",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": f"PHPSESSID={php_sessid}; rr={rr}; rr_id={rr_id}; rr_add={rr_add}; rr_f={rr_f}",
    "Origin": "https://rivalregions.com",
    "Priority": "u=1, i",
    "Referer": "https://rivalregions.com/",
    "Sec-Ch-Ua": '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": '"Windows"',
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest"
}

cookies = {
    'PHPSESSID': php_sessid,
    'rr' : rr,
    'rr_id': rr_id,
    'rr_add' : rr_add,
    'rr_f' : rr_f
}

data = {
    'factory': factory,
    'c' : c
}
print(f'rr is: {rr}')

scraper = cloudscraper.create_scraper()

work = scraper.post(url=url, headers=headers, data=(data), cookies=cookies)
time.sleep(3)
if (work.status_code == 200):
    print(f"work basarili, time: {datetime.now().hour}:{datetime.now().minute} \n response: {work.text}")
else: 
    print(f"there is an error in work, time: {datetime.now().hour}:{datetime.now().minute}\n response: {work.text}")


url_auto = "https://rivalregions.com/work/autoset/"

headers_auto = {
    "Accept": "text/html, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7,fr;q=0.6",
    "Content-Length" : "72",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": f"PHPSESSID={php_sessid}; rr={rr}; rr_id={rr_id}; rr_add={rr_add}; rr_f={rr_f}",
    "Origin": "https://rivalregions.com",
    "Priority": "u=1, i",
    "Referer": "https://rivalregions.com/",
    "Sec-Ch-Ua": '"Google Chrome";v="129", "Not)A;Brand";v="8","Chromium";v="129"',
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": '"Windows"',
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest"
}

data_auto = {
    'c' : c,
    'mentor' : 0,
    'factory' : factory,
    'type' : 26,
    'lim' : 0
}

auto_set = scraper.post(url=url_auto, headers=headers_auto, data=data_auto, cookies=cookies)

if (auto_set.status_code == 200):
    print(f"auto setted succesfully at {datetime.now().hour}:{datetime.now().minute}\n response: {auto_set.text}")
else:
    print(f"there is an errot at {datetime.now().hour}:{datetime.now().minute}\n response: {auto_set.text}")

# Get the current time
now = datetime.now()

# Add 7 hours and 40 minutes
future_time = now + timedelta(hours=7, minutes=40)

# Format the result as HH:MM
formatted_time = future_time.strftime("%H:%M")

hour = future_time.hour
minute = future_time.minute
if (minute > 58):
    minute = 1
    hour += 1

url = "http://localhost:3004/api/rv_sell_fly"
headers = {
    'Content-Type': 'application/json'  # This is crucial for Express to recognize the body as JSON
}

body = { 
    'sess_id' : php_sessid, 
    'rr_f' : rr_f,
    'c' : c,
    'rr_add' : rr_add,
    'rr_id' : rr_id,
    'rr': rr,
    #'reg_id' : '200073', # mars
    #'factory': '101643', # rv fab
    'kim' : kim,

    'hour' : hour,
    'minute' : minute,
}

back_fly = requests.post(url=url, data=json.dumps(body), headers=headers)

url_work = "http://localhost:3004/api/work"
headers_work = {
    'Content-Type' : "application/json"
}
body_work = {
    'sess_id' : php_sessid, 
    'rr_f' : rr_f,
    'c' : c,
    'rr_add' : rr_add,
    'rr_id' : rr_id,
    'rr': rr,
    

    'factory' : '95240', # helium'da calis
    'hour' : hour,
    'minute' : minute+1,
}
work = requests.post(url=url_work, headers=headers_work, data=json.dumps(body_work))