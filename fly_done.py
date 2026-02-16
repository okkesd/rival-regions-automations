import sys
import cloudscraper
import json
from urllib import parse
import zlib
from bs4 import BeautifulSoup
"""
    'sess_id' : "665emeai6mm9ca2n41oj4rn8c7", 
    'rr_f' : "e174af2572c5c40d52c067ac8ed39669",
    'c' : 'd4b457aca19d7f05e6bbf19af1a731f2',
    'rr_add' : '73d135a4d0b044d6eb1c55eb25d3af98',
    'rr_id' : '2001352321',
    'rr':'6b1a9e8de68ae25727dbcc1b518c0523' ,
"""
reg_id = sys.argv[1]
c = sys.argv[2]
php_sessid = sys.argv[3]
rr_f = sys.argv[4]
rr = sys.argv[5]
rr_add = sys.argv[6]
rr_id = sys.argv[7]


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

def try_fly():
    url_try = f"https://rivalregions.com/map/region_data/{reg_id}/1?c={c}"

    headers_try = {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.5",
        "Connection" : "keep-alive",
        "Cookie": f"rr={rr};rr_id={rr_id};rr_add={rr_add};rr_f={rr_f};PHPSESSID={php_sessid}",
        #"Host": "rivalregions.com",
        "Priority": "u=1, i",
        "Referer": "https://rivalregions.com/",
        'Sec-Ch-Ua': '"Chromium";v="130", "Opera";v="115", "Not?A_Brand";v="99"',
        'Sec-Ch-Ua-Mobile': '?0' ,
        'Sec-Ch-Ua-Platform': "Linux",


        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "TE" : "trailers",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0",
        "X-Requested-With": "XMLHttpRequest"
    }
    cookies_try = {
        'PHPSESSID' : php_sessid,
        'rr' : rr,
        'rr_add' : rr_add,
        'rr_f' : rr_f,
        'rr_id' : rr_id
    }

    scraper = cloudscraper.create_scraper()

    try1 = scraper.get(url=url_try, headers=headers_try, cookies=cookies_try)

    print(try1.text)
    tr = souper(try1)

    div = tr.find("div", class_="map_d_b")["class"]

    if ("button_red" in div):
        return 0
    else:
        return 1
    
def fly():
    url_fly = f"https://rivalregions.com/map/region_move/{reg_id}"

    headers_fly = {
        "Accept" : "*/*",
        "Accept-Encoding" : "gzip, deflate, br, zstd",
        "Accept-Language" : "en-US,en;q=0.5",
        #"Connection" : "keep-alive",
        "Content-Length" : "45",
        "Content-Type" : "application/x-www-form-urlencoded",
        "Cookie" : f"rr={rr}; rr_id={rr_id}; rr_add={rr_add}; rr_f={rr_f};PHPSESSID={php_sessid}",
        #"Host" : "rivalregions.com",
        "Origin" : "https://rivalregions.com",
        "Priority" : "u=1, i",
        "Referer" : "https://rivalregions.com/",
        'Sec-Ch-Ua': '"Chromium";v="130", "Opera";v="115", "Not?A_Brand";v="99"',
        'Sec-Ch-Ua-Mobile': '?0' ,
        'Sec-Ch-Ua-Platform': "Linux",
        "Sec-Fetch-Dest" : "empty",
        "Sec-Fetch-Mode" : "cors",
        "Sec-Fetch-Site" : "same-origin",
        "TE" : "trailers",
        "User-Agent" : "Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0",
        "X-Requested-With" : "XMLHttpRequest"
    }
    cookies_fly = {
        'PHPSESSID' : php_sessid,
        'rr' : rr,
        'rr_add' : rr_add,
        'rr_f' : rr_f,
        'rr_id' : rr_id
    }
    data_fly = {
        'type' : '2',
        'c' : c,
        'b' : '1'
    }

    scraper = cloudscraper.create_scraper()

    fly_post = scraper.post(url=url_fly, headers=headers_fly, cookies=cookies_fly, data=data_fly)
    
    soup = souper(fly_post)
    hour = soup.find('div', class_="additional").text[-5:]
    minute = hour[-2:]
    hour = hour[:2]
    print('fly : ', hour + minute)
    

def get_reg():
    url_reg = f"https://rivalregions.com/map/details/{reg_id}?c={c}"

    headers_reg = {
        "Accept": "text/html, */*; q=0.01",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.5",
        "Connection" : "keep-alive",
        "Cookie": f"rr={rr};rr_id={rr_id};rr_add={rr_add};rr_f={rr_f};PHPSESSID={php_sessid}",
        "Host": "rivalregions.com",
        "Priority": "u=0",
        "Referer": "https://rivalregions.com/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "TE" : "trailers",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0",
        "X-Requested-With": "XMLHttpRequest"
    }

    cookies_reg = {
        'PHPSESSID' : php_sessid,
        'rr' : rr,
        'rr_add' : rr_add,
        'rr_f' : rr_f,
        'rr_id' : rr_id
    }

    scraper = cloudscraper.create_scraper()

    get_reg = scraper.get(url=url_reg, headers=headers_reg, cookies=cookies_reg)

    reg = souper(get_reg)

    h1 = reg.find("h1", class_="slide_title").findChildren("span")[0]["action"][18:]

    return h1 # state id

def get_state(h1):
    url_state = f"https://rivalregions.com/map/state_details/{h1}?c={c}"

    headers_state = {
        "Accept": "text/html, */*; q=0.01",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.5",
        "Connection" : "keep-alive",
        "Cookie": f"rr={rr};rr_id={rr_id};rr_add={rr_add};rr_f={rr_f};PHPSESSID={php_sessid}",
        "Host": "rivalregions.com",
        "Priority": "u=0",
        "Referer": "https://rivalregions.com/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "TE" : "trailers",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0",
        "X-Requested-With": "XMLHttpRequest"
    }
    cookies_state = {
        'PHPSESSID' : php_sessid,
        'rr' : rr,
        'rr_add' : rr_add,
        'rr_f' : rr_f,
        'rr_id' : rr_id
    }

    scraper = cloudscraper.create_scraper()

    get_state = scraper.get(url=url_state, headers=headers_state, cookies=cookies_state)

    state = souper(get_state)

    capital = state.find("div", title="Capitale")["action"][12:]

    return capital

def send_wp(capital):

    url_req = f"https://rivalregions.com/map/add_request_perm_s/{capital}"

    headers_req = {
        "Accept" : "text/html, */*; q=0.01",
        "Accept-Encoding" : "gzip, deflate, br, zstd",
        "Accept-Language" : "en-US,en;q=0.5",
        "Connection" : "keep-alive",
        "Content-Length" : "44",
        "Content-Type" : "application/x-www-form-urlencoded",
        "Cookie" : f"rr={rr}; rr_id={rr_id}; rr_add={rr_add}; rr_f={rr_f};PHPSESSID={php_sessid}",
        "Host" : "rivalregions.com",
        "Origin" : "https://rivalregions.com",
        "Priority" : "u=0",
        "Referer" : "https://rivalregions.com/",
        "Sec-Fetch-Dest" : "empty",
        "Sec-Fetch-Mode" : "cors",
        "Sec-Fetch-Site" : "same-origin",
        "TE" : "trailers",
        "User-Agent" : "Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0",
        "X-Requested-With" : "XMLHttpRequest"
    }
    cookies_req = {
        'PHPSESSID' : php_sessid,
        'rr' : rr,
        'rr_add' : rr_add,
        'rr_f' : rr_f,
        'rr_id' : rr_id
    }
    data_req = {
        'post' : 'post',
        'c' : c
    }

    scraper = cloudscraper.create_scraper()

    send_req = scraper.post(url=url_req, headers=headers_req, cookies=cookies_req, data=data_req)



#sonuc = try_fly()
sonuc = 1

if (sonuc == 1):
    
    fly()

else:
    
    state_id = get_reg()

    capital = get_state(state_id)

    send_wp(capital) # after that close but create another cron-job to run this after 10 minutes