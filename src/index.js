const imdb_url = "https://m.imdb.com";
const API_KEY = "api_key=951a265e3ef47c76b1be4410641ac67e";
const BASE_URL = "https://api.themoviedb.org/3";
const img_url = "https://image.tmdb.org/t/p/original";
const apiKey = "apiKey=62ffac58c57333a136053150eaa1b587";
const API_URL = BASE_URL + API_KEY;
const input = document.getElementById("input");
const searchbutton = document.getElementById("searchbutton");
const banner = document.getElementById("poster-img");
const requests = {
  fetchPopular: `${BASE_URL}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&${API_KEY}`,
  fetchTrending: `${BASE_URL}/trending/all/week?${API_KEY}&language=en-US`,
  fetchNetflixOrignals: `${BASE_URL}/discover/tv?${API_KEY}&with_networks=213`,
  fetchActionMovies: `${BASE_URL}/discover/movie?${API_KEY}&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?${API_KEY}&with_genres=35`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?${API_KEY}&with_genres=27`,
  fetchActor: `${BASE_URL}/person/person_id?${API_KEY}&language=en-US
  `
};
const delIcon = document.getElementById("delete-icon");

// function that get movie desc less words
function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

function removeSearchResult() {
  console.log("Do something");
}
originalNetflix();

// make a button do the fuction testing
// originalNetflix(input.value);
searchbutton.addEventListener("click", () => {
  searchMovies(input.value);
  actorNetflix(input.value);

  if (input.value) {
    document.getElementById("resultDiv").style.visibility = "visible";
  } else document.getElementById("resultDiv").style.visibility = "hidden";
});

//  function that get  Film array by search * have to with input . value in the button
async function searchMovies(search_movie_name) {
  const response = await fetch(
    `${BASE_URL}/search/movie?${API_KEY}&query=${search_movie_name}`
  );
  const data = await response.json();
  console.log(data, "all movie");
  const setMovie = data.results;
  console.log(setMovie);

  const showSearchMovie = document.getElementById("resultDiv");
  setMovie.slice(0, 10).forEach((movie) => {
    // console.log(movie.backdrop_path);
    const searchResults = document.createElement("div");
    searchResults.className = "first-section";
    searchResults.innerHTML = `    
  <div id="main_content" class="main-inf">
    <img
      id="posterBanner"
      src="${img_url + movie.backdrop_path}"
      alt=""
    />
    <img class="overlay" src="overlay.png" alt="" />
    <div class="movie-info">
      <h1 id="banner_title" class="movie-tilte title">${
        movie.original_title
      }</h1>
      <h4 id="banner_desc" class="movie-descripd">Desc</h4>
      <div class="main-button">
        <button class="watchbtn">Watch</button>
        <button class="addbtn">+</button>
      </div>
    </div>
  </div>
`;
    showSearchMovie.appendChild(searchResults);
  });
  // const title = document.getElementById("banner_title");
  // title.textContent = setMovie.title;
  // const desc = document.getElementById("banner_desc");
  // desc.textContent = truncate(setMovie.overview, 90);
  // console.log(title);
  // document.getElementById("posterBanner").src =
  //   img_url + setMovie.backdrop_path;
}

//  function that get Original Netflix Film array
async function originalNetflix() {
  // searchMovies();
  const response = await fetch(
    `${BASE_URL}/discover/tv?${API_KEY}&with_networks=213`
  );
  const data = await response.json();
  console.log(data, "main banner");
  const setMovie =
    data.results[Math.floor(Math.random() * data.results.length - 1)];
  const desc = document.getElementById("banner_desc");
  desc.textContent = truncate(setMovie.overview, 90);
  const title = document.getElementById("banner_title");
  title.innerText = setMovie.name;
  document.getElementById("posterBanner").src =
    img_url + setMovie.backdrop_path;
}

// function that get Trending Netflĩx film
// async function trendingNetflix() {
//   const response = await fetch(requests.trendingNetflix);
//   const data = await response.json();
//   console.log(data);
//   const setMovie =
//     data.results[Math.floor(Math.random() * data.results.length - 1)];
//   const title = document.getElementById("banner_title");
//   title.textContent = setMovie.title;
//   const desc = document.getElementById("banner_desc");
//   desc.textContent = truncate(setMovie.overview, 100);
//   console.log(title);
//   document.getElementById("posterBanner").src =
//     img_url + setMovie.backdrop_path;
// }

// function that get Actor Netflix
async function actorNetflix() {
  // Fetch data
  const resp = await fetch(
    `${BASE_URL}/person/popular?${API_KEY}&language=en-US&page=1`
  );
  const data = await resp.json();
  const setMovie = data.results;
  console.log(setMovie, "actor");

  //  second-main-second
  const actorContainer = document.getElementById("actor_container");
  setMovie.forEach((movie) => {
    const bestActorMovie = document.createElement("div");
    bestActorMovie.className = "second-content";
    bestActorMovie.innerHTML = `
    <img   class="actorimg"
      src="${img_url + movie.profile_path}"
      alt=""
    />

    <img  class="overlay" src="overlay.png" alt="" />
    <div class="second-content-detail">
      <div class="second-content-actor">${movie.name}</div>
      <!-- <div class="second-content-movies">+30</div> -->
    </div>
    <div class="second-btn">
      <button class="second-btn addbtn">+</button>
    </div>
  `;
    actorContainer.appendChild(bestActorMovie);
  });
  //  third -main-section
  const continueMovie = document.getElementById("continue_container");
  setMovie.forEach((movie) => {
    const continueMoiveDiv = document.createElement("div");
    continueMoiveDiv.className = "third-content";
    continueMoiveDiv.innerHTML = `
    <img
      id="contunie_watching_img"
      src="${img_url + movie.known_for[0].backdrop_path}"
      alt=""
    />
  </div>`;
    continueMovie.appendChild(continueMoiveDiv);
  });
}
actorNetflix();
//Left -Section
async function trendingLeft() {
  // Fetch data
  const resp = await fetch(requests.fetchTrending);
  const data = await resp.json();
  const setMovie = data.results;
  console.log(setMovie, "trending");

  const trendingContainer = document.getElementById("leftTrending");
  setMovie.slice(0, 15).forEach((movie) => {
    const trendingLeftSection = document.createElement("div");
    trendingLeftSection.className = "favourites-content";
    trendingLeftSection.innerHTML = `
<img
  id="firstLeftImg"
  src="${img_url + movie.poster_path}"
  alt=""
/>
<div class="favourites-bottom">
  <div class="favourites-info">
    <div class="favourites-title">${movie.original_title}</div>
    <!-- <div class="favourites-gernes">Action</div> -->
  </div>
  <div class="score-box">
    <div class="imdb">IMDB</div>
    <div id="leftScore" class="score">${movie.vote_average}</div>
  </div>
</div>
`;
    trendingContainer.appendChild(trendingLeftSection);
  });
}
trendingLeft();

// fetch(
//   `https://actor-movie-api1.p.rapidapi.com/getid/input.value?apiKey=62ffac58c57333a136053150eaa1b587`,
//   options
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// async function actorsNetflix(search_term) {
//   const response = await fetch(
//     `https://actor-movie-api1.p.rapidapi.com/getid/${search_term}?${apiKey}`
//   );
//   const data = await response.json();
//   console.log(data);
// }
// actorsNetflix("Jack");

//  fecth Action Movie
async function actionNetflix() {
  const resp = await fetch(requests.fetchActionMovies);
  const data = await resp.json();
  console.log(data, "action");
  const setMovie = data.results;

  const actionMovie = document.getElementById("action_container");
  setMovie.forEach((movie) => {
    const actionMovieDiv = document.createElement("div");
    actionMovieDiv.className = "third-content";
    actionMovieDiv.innerHTML = `
    <img
      id="thirdImg"
      src="${img_url + movie.backdrop_path}"
      alt=""
    />
  </div>`;
    actionMovie.appendChild(actionMovieDiv);
  });
}

actionNetflix();

//  fecth Comedy Movie

async function comedyNetflix() {
  const resp = await fetch(requests.fetchComedyMovies);
  const data = await resp.json();
  const setMovie = data.results;
  console.log(setMovie, "comedy");
  // document.getElementById("comedyImg").src =
  //   img_url + data.results[0].backdrop_path;
  const comedyContainer = document.getElementById("comedy_container");
  setMovie.forEach((movie) => {
    const bestComedyMovie = document.createElement("div");
    bestComedyMovie.className = "third-content";
    bestComedyMovie.innerHTML = `
        <img
          id="comedyImg"
          src="${img_url + movie.backdrop_path}"
          alt=""
        />
     `;
    comedyContainer.appendChild(bestComedyMovie);
  });
  // console.log(setMovie.results[0].backdrop_path);
}

comedyNetflix();
