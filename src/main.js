import "./style.css";
import { searchArtists } from "./api.js";
import {
  onSearchSubmit,
  showLoading,
  showError,
  showEmpty,
  renderArtists,
  renderRecentSearches,
  onRecentClick,
} from "./ui.js";
import { saveSearch, getRecentSearches } from "./storage.js";

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
      saveSearch(term);
      renderRecentSearches(getRecentSearches());
    }
  } catch (error) {
    console.error(error);
    showError("Ocorreu um erro ao buscar os artistas. Tente novamente.");
  }
}

onSearchSubmit(handleSearch);
renderRecentSearches(getRecentSearches());

onRecentClick((term) => {
  // opcional: preencher o input visualmente
  const inputEl = document.querySelector("#artist-input");
  if (inputEl) inputEl.value = term;
  // reexecuta a busca
  handleSearch(term);
});