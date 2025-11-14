const BASE_URL = import.meta.env.VITE_AUDIO_DB_BASE_URL;
const API_KEY  = import.meta.env.VITE_AUDIO_DB_API_KEY;

export async function searchArtists(artistName) {
  if (!artistName) {
    return [];
  }

  const url = `${BASE_URL}/${API_KEY}/search.php?s=${encodeURIComponent(artistName)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`);
  }

  const data = await response.json();

  if (!data.artists) {
    return [];
  }

  return data.artists.map((artist) => ({
    id: artist.idArtist,
    name: artist.strArtist,
    thumb: artist.strArtistThumb,
    formedYear: artist.intFormedYear,
    style: artist.strStyle,
    genre: artist.strGenre,
    bioPT: artist.strBiographyPT,
    bioEN: artist.strBiographyEN,
  }));
}