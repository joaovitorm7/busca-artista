const form = document.querySelector("#search-form");
const input = document.querySelector("#artist-input");
const resultsContainer = document.querySelector("#results");
const statusElement = document.querySelector("#status");

export function onSearchSubmit(callback) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const term = input.value.trim();
    callback(term);
  });
}

export function showLoading() {
  statusElement.textContent = "Buscando artistas...";
  resultsContainer.innerHTML = "";
}

export function showError(message) {
  statusElement.textContent = message;
  resultsContainer.innerHTML = "";
}

export function showEmpty() {
  statusElement.textContent = "Nenhum artista encontrado.";
  resultsContainer.innerHTML = "";
}

export function renderArtists(artists) {
  statusElement.textContent = `Encontrados ${artists.length} artista(s).`;
  resultsContainer.innerHTML = "";

  artists.forEach((artist) => {
    const card = document.createElement("article");
    card.classList.add("artist-card");

    const thumb = document.createElement("img");
    thumb.classList.add("artist-thumb");
    thumb.alt = `Foto de ${artist.name}`;
    thumb.src =
      artist.thumb ||
      "https://via.placeholder.com/150x150?text=Sem+imagem";

    const name = document.createElement("h2");
    name.textContent = artist.name;

    const meta = document.createElement("p");
    meta.classList.add("artist-meta");
    const year = artist.formedYear ? `Desde ${artist.formedYear}` : "Ano não informado";
    const style = artist.style || "Estilo não informado";
    const genre = artist.genre || "Gênero não informado";
    meta.textContent = `${year} • ${style} • ${genre}`;

    const bio = document.createElement("p");
    bio.classList.add("artist-bio");

    const bioText =
      artist.bioPT ||
      artist.bioEN ||
      "Biografia não disponível neste idioma.";

    const shortBio =
      bioText.length > 300 ? bioText.slice(0, 300) + "..." : bioText;
    bio.textContent = shortBio;

    card.appendChild(thumb);
    card.appendChild(name);
    card.appendChild(meta);
    card.appendChild(bio);

    resultsContainer.appendChild(card);
  });
}