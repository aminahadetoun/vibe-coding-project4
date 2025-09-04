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

// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>VibeFlix</title>
//     <link rel="stylesheet" href="style.css" />
//   </head>
//   <body>
//     <!-- Header -->
//     <header id="header">VibeFlix</header>

//     <!-- Search & Filters -->
//     <div id="controls">
//       <input
//         type="text"
//         id="search-box"
//         placeholder="Search for movies..."
//         aria-label="Search movies"
//       />

//       <select id="sort-select" aria-label="Sort movies">
//         <option value="">Sort By</option>
//         <option value="rating-desc">Rating: High → Low</option>
//         <option value="rating-asc">Rating: Low → High</option>
//       </select>

//       <select id="genre-select" aria-label="Filter by genre">
//         <option value="">All Genres</option>
//       </select>
//     </div>

//     <!-- Movie Grid -->
//     <section id="movie-grid" role="list">
//       <div class="movie-card" id="movie-1">
//         <img
//           src="https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg"
//           alt="Inception Poster"
//           class="movie-poster"
//         />
//         <div class="movie-title">Inception</div>
//         <div class="movie-rating">⭐ 8.8</div>
//       </div>

//       <div class="movie-card" id="movie-2">
//         <img
//           src="https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg"
//           alt="Interstellar Poster"
//           class="movie-poster"
//         />
//         <div class="movie-title">Interstellar</div>
//         <div class="movie-rating">⭐ 8.6</div>
//       </div>

//       <div class="movie-card" id="movie-3">
//         <img
//           src="https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg"
//           alt="Avengers Endgame Poster"
//           class="movie-poster"
//         />
//         <div class="movie-title">Avengers: Endgame</div>
//         <div class="movie-rating">⭐ 8.4</div>
//       </div>

//       <div class="movie-card" id="movie-4">
//         <img
//           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3ekE6Hhz9gvIbiFSUPxt-FyAh4zXTXX0bjQ&s"
//         />
//         <div class="movie-title">The Dark Knight</div>
//         <div class="movie-rating">⭐ 9.0</div>
//       </div>

//       <div class="movie-card" id="movie-5">
//         <img
//           src="https://m.media-amazon.com/images/I/71rNJQ2g-EL._AC_SY679_.jpg"
//           alt="The Matrix Poster"
//           class="movie-poster"
//         />
//         <div class="movie-title">The Matrix</div>
//         <div class="movie-rating">⭐ 8.7</div>
//       </div>

//       <div class="movie-card" id="movie-6">
//         <img
//           src="https://upload.wikimedia.org/wikipedia/en/thumb/0/00/Spider-Man_No_Way_Home_poster.jpg/250px-Spider-Man_No_Way_Home_poster.jpg"
//           alt="Spider-Man No Way Home Poster"
//           class="movie-poster"
//         />
//         <div class="movie-title">Spider-Man: No Way Home</div>
//         <div class="movie-rating">⭐ 8.3</div>
//       </div>

//       <div class="movie-card" id="movie-7">
//         <img
//           src="https://lumiere-a.akamaihd.net/v1/images/p_blackpanther_19754_4ac13f07.jpeg?region=0%2C0%2C540%2C810"
//           alt="Black Panther Poster"
//           class="movie-poster"
//         />
//         <div class="movie-title">Black Panther</div>
//         <div class="movie-rating">⭐ 7.3</div>
//       </div>

//       <div class="movie-card" id="movie-8">
//         <img
//           src="data:image/jpeg;base64,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"
//           alt="Avatar Poster"
//           class="movie-poster"
//         />
//         <div class="movie-title">Avatar</div>
//         <div class="movie-rating">⭐ 7.9</div>
//       </div>
//     </section>

//     <script src="script.js"></script>
//   </body>
// </html>
