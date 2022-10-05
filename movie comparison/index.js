let leftMovie;
let rightMovie;

const onMovieSelect = async function (movie, sumaryEl, side) {
  const response = await axios.get(`http://www.omdbapi.com/`, {
    params: {
      apikey: `ce62ce19`,
      i: movie.imdbID,
    },
  });
  console.log(response.data);
  sumaryEl.innerHTML = movieTemplate(response.data);
  side === "left" ? (leftMovie = response.data) : (rightMovie = response.data);
  if (leftMovie && rightMovie) {
    runComparison();
  }
};

const runComparison = function () {
  const leftSideStats = document.querySelectorAll("#left-sumary .notification");
  const rightSideStats = document.querySelectorAll(
    "#right-sumary .notification"
  );
  leftSideStats.forEach((leftStat, index) => {
    const rightStat = rightSideStats[index];
    const rightValue = +rightStat.dataset.value;
    const leftValue = +leftStat.dataset.value;
    if (rightValue > leftValue) {
      leftStat.classList.remove("is-primary");
      leftStat.classList.add("is-warning");
    } else {
      rightStat.classList.remove("is-primary");
      rightStat.classList.add("is-warning");
    }
  });
};

const movieTemplate = function (movieDetail) {
  const dollar = +movieDetail.BoxOffice.slice(1).replaceAll(",", "");
  const metaScore = +movieDetail.Metascore;
  const imdbRating = +movieDetail.imdbRating.replace(".", "");
  const imdbVote = +movieDetail.imdbVotes.replaceAll(",", "");
  const award = movieDetail.Awards.split(" ").reduce((prev, word) => {
    const value = +word;
    if (isNaN(value)) {
      return prev;
    } else {
      return (prev += value);
    }
  }, 0);
  return `
  <article class="media">
    <figure class="media-left">
     <p class="image">
      <img src="${movieDetail.Poster}"/>
     </p>
    </figure>
    <div class="media-content">
     <div class="content">
      <h1>${movieDetail.Title} (${movieDetail.Year})</h1>
      <h4>${movieDetail.Genre}</h4>
      <p>${movieDetail.Plot}</p>
     </div>
    </div>
  </article>
  <article data-value="${award}" class="notification is-primary">
   <p class="title">${movieDetail.Awards}</p>
   <p class="subtitle">Award</p>
  </article>
  <article data-value="${dollar}" class="notification is-primary">
   <p class="title">${movieDetail.BoxOffice}</p>
   <p class="subtitle">Box Office</p>
  </article>
  <article data-value="${metaScore}" class="notification is-primary">
   <p class="title">${movieDetail.Metascore}</p>
   <p class="subtitle">Metascore</p>
  </article>
  <article data-value="${imdbRating}" class="notification is-primary">
   <p class="title">${movieDetail.imdbRating}</p>
   <p class="subtitle">IMDB rating</p>
  </article>
  <article data-value="${imdbVote}" class="notification is-primary">
   <p class="title">${movieDetail.imdbVotes}</p>
   <p class="subtitle">IMDB Votes</p>
  </article>
  `;
};

const autoCompleteConfig = {
  renderOption(movie) {
    return `
            <img src="${movie.Poster === "N/A" ? "" : movie.Poster}"/>
            <h1>${movie.Title} (${movie.Year})</h1>
            `;
  },
  inputValue(movie) {
    return `${movie.Title} (${movie.Year})`;
  },
  async fetchData(query) {
    const response = await axios.get(`http://www.omdbapi.com/`, {
      params: {
        apikey: `ce62ce19`,
        s: query,
      },
    });
    if (response.data.Error) return [];
    console.log(response.data);
    return response.data.Search;
  },
};

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector("#left-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#left-sumary"), "left");
  },
});
createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector("#right-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#right-sumary"), "right");
  },
});
