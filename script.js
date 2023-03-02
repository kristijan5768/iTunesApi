const h1 = document.createElement("h1");
h1.textContent = "Artist Search API";

const searchContainer = document.createElement("div");
searchContainer.classList.add("search-container");

const searchBar = document.createElement("input");
searchBar.setAttribute("type", "text");
searchBar.setAttribute("id", "search-bar");
searchBar.setAttribute("placeholder", "SEARCH");

const searchButton = document.createElement("button");
searchButton.setAttribute("type", "button");
searchButton.textContent = "GO";
searchButton.addEventListener("click", search);

searchContainer.appendChild(searchBar);
searchContainer.appendChild(searchButton);

const searchResults = document.createElement("div");
searchResults.setAttribute("id", "search-results");

document.body.appendChild(h1);
document.body.appendChild(searchContainer);
document.body.appendChild(searchResults);

function search() {
  const query = document.getElementById("search-bar").value;

  if (!query) {
    const searchResults = document.getElementById("search-results");
    searchResults.innerHTML = "<p>Nema rezultata pretrage.</p>";
    return;
  }

  fetch(
    `https://itunes.apple.com/search?entity=allArtist&attribute=allArtistTerm&term=${query}`
  )
    .then((response) => response.json())
    .then((data) => {
      const results = data.results;

      const searchResults = document.getElementById("search-results");
      searchResults.innerHTML = "";
      for (let result of results) {
        const resultElement = document.createElement("div");
        resultElement.innerHTML = `<h3>${result.artistName}</h3><p>${result.primaryGenreName}</p>`;
        searchResults.appendChild(resultElement);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
