import requests
from bs4 import BeautifulSoup

# Funktion zum Scrapen der IPTV-Links von einer Webseite
def scrape_iptv_links(url):
    try:
        response = requests.get(url)  # Holt die Webseite
        response.raise_for_status()  # Überprüft, ob die Anfrage erfolgreich war
        soup = BeautifulSoup(response.text, 'html.parser')  # Parsen des HTML-Inhalts

        links = []
        # Suche nach allen <a>-Tags mit href-Attribut
        for link in soup.find_all('a', href=True):
            # Wenn der Link 'm3u' enthält, füge ihn zur Liste hinzu
            if 'm3u' in link['href']:
                links.append(link['href'])

        return links

    except requests.exceptions.RequestException as e:
        print(f"Fehler beim Abrufen der URL {url}: {e}")
        return []

# Beispiel-URLs für IPTV-Listen
iptv_urls = [
    'https://iptv-org.github.io/iptv-countries/',  # Beispiel-URL 1
    'https://www.iptvcat.com/',  # Beispiel-URL 2
    'https://www.xiptv.com/'  # Beispiel-URL 3
]

# Für jede URL die IPTV-Links scrapen und ausgeben
for url in iptv_urls:
    print(f"Scraping von URL: {url}")
    iptv_links = scrape_iptv_links(url)
    if iptv_links:
        print(f"Gefundene m3u-Links auf {url}:")
        for link in iptv_links:
            print(link)  # Gibt jeden gefundenen m3u-Link aus
    else:
        print(f"Keine m3u-Links gefunden auf {url}.")
    print('-' * 50)
