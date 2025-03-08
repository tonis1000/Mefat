// Beispiel für das Laden eines m3u-Streams in den Player
function loadStream(m3uUrl) {
  const player = document.getElementById('tv-player');
  player.innerHTML = `<video controls autoplay>
    <source src="${m3uUrl}" type="application/x-mpegURL">
    Ihr Browser unterstützt das Videoformat nicht.
  </video>`;
}

// Beispiel-Stream zum Testen
loadStream('https://example.com/path/to/stream.m3u8');
