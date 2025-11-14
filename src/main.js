import "./style.css";
import { searchArtists } from "./api.js";
import {
  onSearchSubmit,
  showLoading,
  showError,
  showEmpty,
  renderArtists,
} from "./ui.js";

async function handleSearch(term) {
  if (!term) {
    showError("Digite o nome de um artista para buscar.");
    return;
  }

  try {
    showLoading();
    const artists = await searchArtists(term);

    if (artists.length === 0) {
      showEmpty();
    } else {
      renderArtists(artists);
    }
  } catch (error) {
    console.error(error);
    showError("Ocorreu um erro ao buscar os artistas. Tente novamente.");
  }
}

onSearchSubmit(handleSearch);