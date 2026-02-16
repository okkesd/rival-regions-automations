# requires bs4, cloudscraper

import requests
import zlib
from bs4 import BeautifulSoup
import time
import sys
import cloudscraper

if (len(sys.argv) > 1):
    
    arg1 = sys.argv[1]
    if (len(sys.argv) > 2):
        
        arg2 = sys.argv[2]
        if (len(sys.argv) > 3): # c
            arg3 = sys.argv[3]
        else:
            arg3 = "d4b457aca19d7f05e6bbf19af1a731f2"
            
        if (len(sys.argv) > 4): # rr_add
            arg4 = sys.argv[4]
        else:
            arg4 = "0c0ccbb9da87e6550711f7c336f50cf8"
            
        if (len(sys.argv) > 5): # rr_id
            arg5 = sys.argv[5]
        else:
            arg5 = "2001352321"
            
        if (len(sys.argv) > 6): # rr
            arg6 = sys.argv[6]
        else:
            arg6 = "f9f695776d7612f6af20a6fd046bec1a"
            
# changes every log in
php_sessid = arg1 # "th6kf2ca6me1r2vkjsnuen9mpp"
rr_f = arg2 # "69a72b873602f73a67fac61cfa10d6ac"

rr= arg6
rr_id= arg5
rr_add= arg4
c = arg3

url_gold = "https://rivalregions.com/parliament/donew/42/0/0"
url_oil = "https://rivalregions.com/parliament/donew/42/3/0"
url_dia = "https://rivalregions.com/parliament/donew/42/15/0"

tmp_gov_gold = '0'
tmp_gov_oil = '3'
tmp_gov_dia = '15'

headers = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
    "Content-Length" : "46",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": f"PHPSESSID={php_sessid}; rr={rr}; rr_id={rr_id}; rr_add={rr_add}; rr_f={rr_f}",
    "Origin": "https://rivalregions.com",
    "Priority": "u=1, i",
    "Referer": "https://rivalregions.com/",
    "Sec-Ch-Ua": '"Not)A;Brand";v="99", "Opera GX";v="113", "Chromium";v="127"',
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": '"Windows"',
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36  OPR/113.0.0.0 (Edition std-1)",
    "X-Requested-With": "XMLHttpRequest"
}

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

resources = [(url_gold,tmp_gov_gold,"gold")] # , (url_oil,tmp_gov_oil,"oil"), (url_dia,tmp_gov_dia,"dia")

scraper = cloudscraper.create_scraper()

for resource in resources:

    data = {
        'tmp_gov': resource[1],
        'c': c
    }
    response = scraper.post(resource[0], headers=headers, data=data)

    decoded_content = response.content.decode("utf-8")

    if decoded_content == "ok":
        print(f"{resource[2]} is recharged")
    else: 
        print(f"there is an error in {resource[2]}...(end of the world). Response: {response.text}")

    time.sleep(1)