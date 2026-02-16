import zlib
import requests
from datetime import datetime
import sys
import time
import cloudscraper
from bs4 import BeautifulSoup
import json

if (len(sys.argv) > 1):
    
    arg1 = sys.argv[1]
    if (len(sys.argv) > 2):
        arg2 = sys.argv[2]

         
        if (len(sys.argv) > 3 and sys.argv[3]): # c
            arg3 = sys.argv[3]
        else:
            arg4 = "6ed08bb641100b1a8dce966eff8398a9"

        if (len(sys.argv) > 4 and sys.argv[4]): # rr_add
            arg4 = sys.argv[4]
        else:
            arg5 = 'e6b14dc854ecb26f5924ff74de24261d'

        if (len(sys.argv) > 5 and sys.argv[5]): # rr_id
            arg5 = sys.argv[5]
        else:
            arg6 = '868625164333238'
            
        if (len(sys.argv) > 6 and sys.argv[6]): # rr
            arg6 = sys.argv[6]
        else:
            arg7 = '2dda27e8478725da39a02cf6ae09b030'
            
# changes every log in
sess_id = arg1 # "th6kf2ca6me1r2vkjsnuen9mpp"
rr_f = arg2 # "69a72b873602f73a67fac61cfa10d6ac"


rr= arg6 # "f9f695776d7612f6af20a6fd046bec1a" , '2dda27e8478725da39a02cf6ae09b030'
rr_id= arg5 # "2001352321", '868625164333238'
rr_add= arg4 # "0c0ccbb9da87e6550711f7c336f50cf8", 'e6b14dc854ecb26f5924ff74de24261d'
c = arg3 # 'd4b457aca19d7f05e6bbf19af1a731f2', '6ed08bb641100b1a8dce966eff8398a9'

def main():
    stat_url = "https://rivalregions.com/perks/up/3/2"

    stat_headers = {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Length" : "34",
        "Content-Type" : "application/x-www-form-urlencoded",
        "Cookie": f"rr_f={rr_f}; rr={rr}; rr_id={rr_id}; rr_add={rr_add}; PHPSESSID={sess_id};",
        "Origin" : "https://rivalregions.com",
        "Priority": "u=1, i",
        "Referer": "https://rivalregions.com/",   
        "Sec-Ch-Ua": '"Chromium";v="130", "Opera";v="115", "Not?A_Brand";v="99"',
        "Sec-Ch-Ua-Mobile" : "?0",
        "Sec-Ch-Ua-Platform" : "Linux",

        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "TE" : "trailers",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0",
        "X-Requested-With": "XMLHttpRequest"
    }

    cookies_lls = {
        'PHPSESSID' : sess_id,
        'rr' : rr,
        'rr_add' : rr_add,
        'rr_f' : rr_f,
        'rr_id' : rr_id
    }

    data = {
        'c' : c
    }

    scraper = cloudscraper.create_scraper()

    stat1 = scraper.post(url=stat_url, headers=stat_headers, cookies=cookies_lls, data=(data))

    #print("Should be upgraded the stat education")
    #print(datetime.today())
    #print(stat1.text)
    url_main = f"https://rivalregions.com/main/content?c={c}"

    stat_main = {
        "Accept": "text/html, */*; q=0.01",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.5",
        "Connection" : "keep-alive",
        "Cookie": f"rr_f={rr_f}; rr={rr}; rr_id={rr_id}; rr_add={rr_add}; PHPSESSID={sess_id};",
        
        "Host" : "rivalregions.com",
        #"Priority": "u=1, i",
        "Referer": "https://rivalregions.com/",   
        #"Sec-Ch-Ua": '"Chromium";v="130", "Opera";v="115", "Not?A_Brand";v="99"',
        #"Sec-Ch-Ua-Mobile" : "?0",
        #"Sec-Ch-Ua-Platform" : "Linux",

        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "TE" : "trailers",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0",
        "X-Requested-With": "XMLHttpRequest"
    }

    get_main = scraper.get(url=url_main, headers=stat_main, cookies=cookies_lls)

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

    main_soup = souper(get_main)

    div_2 = main_soup.find("div", perk="3") # class_="perk_source_4 turn_0"
    #print((div_2))
    div = div_2.find("div", class_="hasCountdown").text
    hour = div[-5:-3]
    minute = div[-2:]

    sys.stdout.write(json.dumps({"hour": hour, "minute": minute}))

if __name__ == "__main__":
    main()


"""  
    // Function to schedule mainJob recursively
    function scheduleRecursiveTask(hour, minute) {
        const recursiveCronExpression = `${minute+1} ${hour} * * *`;
        console.log(`Scheduling mainJob recursively with expression: ${recursiveCronExpression}`);

        const task = cron.schedule(recursiveCronExpression, () => {
            // Run the main job
            const next_time = mainJob();

            // Stop the current task after running
            task.stop();

            // Recursively schedule the next run
            scheduleRecursiveTask(next_time.hour, next_time.minute);
        });

        task.start();
    }

    // First task logic (runs at the specified hour and minute)
    const firstTask = cron.schedule(firstTaskExpression, () => {
        console.log(`Starting the second task.`);
        
        let next_time = mainJob(); // Call the main job to run it immeadiaately

        // Start the second task every 5 minutes
        //startSecondTask();
        scheduleRecursiveTask(next_time.hour, next_time.minute)
        fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Current Cron-Jobs: ${cron.getTasks()}\n`);
        // Stop the first task after starting the second task
        firstTask.stop();
    });

    // Start the first task (scheduler)
    firstTask.start();

"""