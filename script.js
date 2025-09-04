// Static movie data (15 movies total)
const allMovies = [
  {
    title: "Inception",
    poster: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg",
    vote_average: 8.8,
    genre_ids: [28, 878],
  },
  {
    title: "Interstellar",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    vote_average: 8.6,
    genre_ids: [12, 18, 878],
  },
  {
    title: "Avengers: Endgame",
    poster: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg",
    vote_average: 8.4,
    genre_ids: [28, 12, 878],
  },
  {
    title: "The Dark Knight",
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3ekE6Hhz9gvIbiFSUPxt-FyAh4zXTXX0bjQ&s",
    vote_average: 9.0,
    genre_ids: [28, 80, 18],
  },
  {
    title: "The Matrix",
    poster: "https://m.media-amazon.com/images/I/71rNJQ2g-EL._AC_SY679_.jpg",
    vote_average: 8.7,
    genre_ids: [28, 878],
  },
  {
    title: "Spider-Man: No Way Home",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/thumb/0/00/Spider-Man_No_Way_Home_poster.jpg/250px-Spider-Man_No_Way_Home_poster.jpg",
    vote_average: 8.3,
    genre_ids: [28, 12, 878],
  },
  {
    title: "Black Panther",
    poster:
      "https://lumiere-a.akamaihd.net/v1/images/p_blackpanther_19754_4ac13f07.jpeg?region=0%2C0%2C540%2C810",
    vote_average: 7.3,
    genre_ids: [28, 12, 878],
  },
  {
    title: "Avatar",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg",
    vote_average: 7.9,
    genre_ids: [12, 14, 878],
  },
  // ⭐ New Movies Added Below ⭐
  {
    title: "Titanic",
    poster:
      "https://m.media-amazon.com/images/M/MV5BYzYyN2FiZmUtYWYzMy00MzViLWJkZTMtOGY1ZjgzNWMwN2YxXkEyXkFqcGc@._V1_.jpg",
    vote_average: 7.8,
    genre_ids: [18, 10749],
  },
  {
    title: "Frozen II",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZTE1YjlmZjctNjIwNi00NDQ0LTlmMzgtYWZkY2RkZTMwNTdmXkEyXkFqcGc@._V1_.jpg",
    vote_average: 7.0,
    genre_ids: [16, 12, 10402],
  },
  {
    title: "The Lion King",
    poster:
      "https://lumiere-a.akamaihd.net/v1/images/p_thelionking_19752_1_0b9de87b.jpeg",
    vote_average: 8.5,
    genre_ids: [16, 12, 18],
  },
  {
    title: "Joker",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Joker_%282019_film%29_poster.jpg/250px-Joker_%282019_film%29_poster.jpg",
    vote_average: 8.5,
    genre_ids: [80, 18, 53],
  },
  {
    title: "Guardians of the Galaxy",
    poster:
      "https://m.media-amazon.com/images/M/MV5BM2ZmNjQ2MzAtNDlhNi00MmQyLWJhZDMtNmJiMjFlOWY4MzcxXkEyXkFqcGc@._V1_.jpg",
    vote_average: 8.0,
    genre_ids: [28, 12, 878],
  },
  {
    title: "Shrek",
    poster:
      "https://images.moviesanywhere.com/5948f139cd669fb5984d2c782e7678be/99cedd1f-ae78-4026-a3e8-b79840b71cbc.jpg",
    vote_average: 7.9,
    genre_ids: [16, 35, 10751],
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    poster: "https://m.media-amazon.com/images/I/81iqZ2HHD-L._AC_SY679_.jpg",
    vote_average: 7.6,
    genre_ids: [12, 14, 10751],
  },
];

// Genres map
const genres = {
  28: "Action",
  12: "Adventure",
  14: "Fantasy",
  16: "Animation",
  18: "Drama",
  35: "Comedy",
  53: "Thriller",
  80: "Crime",
  878: "Sci-Fi",
  10402: "Music",
  10749: "Romance",
  10751: "Family",
};

// DOM elements
const searchBox = document.getElementById("search-box");
const movieGrid = document.getElementById("movie-grid");
const sortSelect = document.getElementById("sort-select");
const genreSelect = document.getElementById("genre-select");

// Populate genre dropdown
function populateGenreDropdown() {
  Object.entries(genres).forEach(([id, name]) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = name;
    genreSelect.appendChild(option);
  });
}

// Display movies
function displayMovies(movies) {
  movieGrid.innerHTML = "";

  if (!movies || movies.length === 0) {
    movieGrid.innerHTML = "<p>No movies found.</p>";
    return;
  }

  movies.forEach((movie, index) => {
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

    const card = document.createElement("div");
    card.classList.add("movie-card");
    card.id = `movie-${index}`;
    card.setAttribute("role", "listitem");

    card.innerHTML = `
      <img src="${movie.poster}" alt="Poster of ${movie.title}" class="movie-poster">
      <div class="movie-title">${movie.title}</div>
      <div class="movie-rating">⭐ ${rating}</div>
    `;

    movieGrid.appendChild(card);
  });
}

// Apply search, sorting & genre filters
function applyFilters() {
  let filtered = [...allMovies];

  // Search
  const query = searchBox.value.trim().toLowerCase();
  if (query.length > 0) {
    filtered = filtered.filter((m) => m.title.toLowerCase().includes(query));
  }

  // Genre filter
  const selectedGenre = genreSelect.value;
  if (selectedGenre) {
    filtered = filtered.filter((m) =>
      m.genre_ids.includes(parseInt(selectedGenre))
    );
  }

  // Sort by rating
  if (sortSelect.value === "rating-desc") {
    filtered.sort((a, b) => b.vote_average - a.vote_average);
  } else if (sortSelect.value === "rating-asc") {
    filtered.sort((a, b) => a.vote_average - b.vote_average);
  }

  displayMovies(filtered);
}

// Event Listeners
searchBox.addEventListener("keyup", applyFilters);
sortSelect.addEventListener("change", applyFilters);
genreSelect.addEventListener("change", applyFilters);

// Init
document.addEventListener("DOMContentLoaded", () => {
  populateGenreDropdown();
  displayMovies(allMovies);
});
