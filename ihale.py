from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options
import time
import sys

# Komut satırı argümanı al
kim = sys.argv[1]

# Kullanıcı bilgilerini ayarla
if kim.lower() == "buddha":
    email = "email" # "Donbalogluali07@gmail.com"
    password = "password" # "AqUBSGGP"

elif (kim.lower() == "riyad" or kim.lower() == "mahrez") :
    email = "email" # ""
    password = "password" # ""



# Headless modda tarayıcı ayarları
options = Options()
options.add_argument("--headless")  # Headless mode
options.add_argument("--disable-gpu")  # GPU kullanımını devre dışı bırak
options.add_argument("--no-sandbox")  # Güvenlik için
options.add_argument("--disable-dev-shm-usage")  # Bellek sorunlarını önler

# Tarayıcı başlat
browser = webdriver.Firefox(options=options)

try:
    # RivalRegions giriş sayfasına git
    browser.get("https://rivalregions.com/")
    time.sleep(4)

    # Giriş bilgilerini doldur ve gönder
    email_field = browser.find_element(By.NAME, "mail")
    email_field.send_keys(email)

    password_field = browser.find_element(By.NAME, "p")
    password_field.send_keys(password)
    time.sleep(1)
    submit_button = browser.find_element(By.NAME, "s")
    submit_button.click()
    time.sleep(2)

    # Açık artırma sayfasına git ve yenile
    browser.get("https://rivalregions.com/#auction/all")
    browser.refresh()
    print("auctions")
    time.sleep(2)

    tbody = browser.find_element(By.ID, "list_tbody")

    if len(tbody.find_elements(By.XPATH, "./*")) > 2:
        print("gold var")

        table_r = ""
        time.sleep(1)
        for i in range(len(tbody.find_elements("css selector", ":scope > *"))):
            if "1000 G" in tbody.find_elements("css selector", ":scope > *")[i].text:
                table_r = tbody.find_elements("css selector", ":scope > *")[i]

        time.sleep(1)
        last_td = table_r.find_elements("css selector", ":scope > *")[-1]
        last_button = last_td.find_element("css selector", ":scope > *")
        last_button.click()
        print("entering auction page")
        time.sleep(2)

        while True:
            browser.refresh()
            time.sleep(2)
            kimin = browser.find_element(By.ID, "auction_name_t")
            count_down = browser.find_element(By.CLASS_NAME, "hasCountdown").text
            print(count_down)
            if kim not in kimin.text.lower():
                price = browser.find_element(By.ID, "auction_price_t").text.replace(".", "")
                print(price)

                time.sleep(1)
                

                if price == "" or count_down == "00:00" or int(price) > 515000000000:
                    print(f"price is (problematic): {price}")
                    print(f"ihale bitti, kazanan: {kimin.text}")
                    break

                elif int(price) < 200000000000:
                    action_input = browser.find_element(By.NAME, "auction_input")
                    action_input.clear()
                    action_input.send_keys(300000000000)
                    print("putting 300000000000")
                else:
                    action_input = browser.find_element(By.NAME, "auction_input")
                    action_input.clear()
                    action_input.send_keys(int(price) + 50000)
                    print(f"putting {int(price) + 500000000}")

                ver_button = browser.find_element(By.CLASS_NAME, "button_green")
                ver_button.click()
            else:
                if (count_down == "00:00"):
                    print(f"price is (problematic): {price}")
                    print(f"ihale bitti, kazanan: {kimin.text}")
                    break
                print(f"bizim: {kimin.text}")

            browser.refresh()
            time.sleep(25)
            print("next_turn...")
    else:
        print("gold yok...")
        print(len(tbody.find_elements(By.XPATH, "./*")))

finally:
    time.sleep(5)
    browser.quit()
