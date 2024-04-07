let baseUrl = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
    // Render movie details on page
    fetchMovieDetails();

    // Render menu with all movies
    fetchAllMovies();

    // Add event listener to buy ticket button
    document.getElementById("buy-ticket").addEventListener("click", buyTicket);

    // Add event listener to delete button
    document.querySelectorAll('delete-button').forEach(button => {
        button.addEventListener("click", deleteFilm);
    });

    // Adding the fetchMovieDetails function
    function fetchMovieDetails() {
        fetch(baseUrl + "/films/1")
            .then(response => response.json())
            .then(movie => {
                document.getElementById("title").innerHTML = movie.title;
                document.getElementById("runtime").innerHTML = movie.runtime + " Minutes";
                document.getElementById("showtime").innerHTML = movie.showtime;
                document.getElementById("film-info").innerHTML = movie.description;
                document.getElementById("poster").src = movie.poster;
                document.getElementById("poster").alt = movie.title;
                document.getElementById("ticket-num").innerHTML = movie.capacity - movie.tickets_sold;
            })
            .catch(error => console.error("Error fetching movie details:", error));
            

    // Indicate if the movie is sold out
                if (movie.tickets_sold >= movie.capacity) {
                    document.getElementById("buy-ticket").disabled = true;
                    document.getElementById("buy-ticket").innerHTML = "Sold Out";
                }
           
    }

    // Adding Movies to the lis
    function fetchAllMovies() {
        fetch(baseUrl + "/films")
            .then(response => response.json())
            .then(movies => {
                movies.forEach(movie => {
                    const listItem = document.createElement("li");
                    listItem.classList.add("film", "item");
                    listItem.innerHTML = movie.title;
                    document.getElementById("films").appendChild(listItem);
                });
            })
            .catch(error => console.error("Error fetching movies:", error));
    }            
            



});