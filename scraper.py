import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import time

# Beispiel: Scrape IPTV Links
def scrape_iptv_links(url):
    # Für statische Seiten:
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    for a_tag in soup.find_all('a', href=True):
        if 'm3u' in a_tag['href']:
            print(a_tag['href'])

# Beispiel: Scrape IPTV Links mit Selenium (für dynamische Seiten)
def scrape_dynamic_iptv_links(url):
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    driver.get(url)
    time.sleep(3)  # Warten auf vollständiges Laden
    links = driver.find_elements(By.XPATH, "//a[contains(@href, 'm3u')]")
    for link in links:
        print(link.get_attribute('href'))
    driver.quit()

# Beispiel-URLs
iptv_urls = ['https://iptv-org.github.io/iptv-countries/']
for url in iptv_urls:
    print(f"Scraping: {url}")
    scrape_iptv_links(url)
