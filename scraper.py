import requests
from bs4 import BeautifulSoup

# Funktion zum Scrapen der IPTV-Links
def scrape_iptv_links():
    url = 'https://example.com/iptv-links'  # Ersetze dies mit der tatsächlichen URL
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    links = []
    for link in soup.find_all('a', href=True):
        if 'm3u' in link['href']:
            links.append(link['href'])
    
    return links

# Alle Links speichern oder verarbeiten
iptv_links = scrape_iptv_links()
print(iptv_links)
