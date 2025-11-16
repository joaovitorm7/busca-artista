const STORAGE_KEY = "recentSearches";
const MAX_ENTRIES = 10;

function safeParse(value) {
    try {
        return JSON.parse(value);
    } catch {
        return null;
    }
}

export function getRecentSearches() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const arr = safeParse(raw);
        if (!Array.isArray(arr)) return [];
        return arr;
    } catch {
        return [];
    }
}

export function saveSearch(term) {
    if (!term || typeof term !== "string") return;
    const normalized = term.trim();
    if (normalized === "") return;

    try {
        const current = getRecentSearches();
        // Remover ocorrência anterior se existir
        const filtered = current.filter((t) => t.toLowerCase() !== normalized.toLowerCase());
        // Colocar no começo
        filtered.unshift(normalized);
        // Limitar o tamanho
        const sliced = filtered.slice(0, MAX_ENTRIES);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sliced));
    } catch {
        // falha silenciosa — não bloquear a busca
    }
}

export function clearRecentSearches() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch {
        // ignore
    }
}