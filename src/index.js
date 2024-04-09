let baseUrl = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {

    // Fetch movie details
    function fetchMovieDetails() {
        fetch(baseUrl + "/films/1")
            .then(response => response.json())
            .then(movie => {
                document.getElementById("title").innerHTML = movie.title;
                document.getElementById("runtime").innerHTML = movie.runtime + " minutes";
                document.getElementById("showtime").innerHTML = movie.showtime;
                document.getElementById("film-info").innerHTML = movie.description;
                document.getElementById("poster").src = movie.poster;
                document.getElementById("poster").alt = movie.title;
                document.getElementById("ticket-num").innerHTML = movie.capacity - movie.tickets_sold;           
            })
            .catch(error => console.error("Error fetching movie details:", error));
    }
    fetchMovieDetails();

    // Check if movie is sold out and update buy ticket button
    function checkTickets() {
        fetch(`${baseUrl}/films/1`)
            .then(response => response.json())
            .then(movie => {
                if (movie.tickets_sold >= movie.capacity) {
                    document.getElementById("buy-ticket").textContent = "Sold Out";
                    document.getElementById("buy-ticket").disabled = true;
                } else {
                    document.getElementById("buy-ticket").textContent = "Buy Ticket";
                    document.getElementById("buy-ticket").disabled = false;
                }
            })
            .catch(error => console.error("Error fetching movie details:", error));
    }

    checkTickets();    

    // Create movie menu list
    function createMovieList() {
        const movieMenu = document.getElementById('films');
        movieMenu.innerHTML = '';
        fetch(baseUrl + "/films")
            .then(response => response.json())
            .then(films => {
                films.forEach(movie => {
                    const listItem = document.createElement('li');
                    listItem.classList.add('film', 'item');
                    listItem.innerHTML = movie.title;
                    movieMenu.appendChild(listItem);
                });
            })
            .catch(error => console.error("Error fetching movie list:", error));
    }

    createMovieList();

    // Making the film Menu Clickable
    const filmMenu = document.getElementById('films');
    filmMenu.addEventListener('click', (event) => {
        const selectedMovie = event.target.textContent;
        fetch(baseUrl + "/films")
            .then(response => response.json())
            .then(films => {
                const movie = films.find(movie => movie.title === selectedMovie);
                if (movie) {
                    document.getElementById("title").innerHTML = movie.title;
                    document.getElementById("runtime").innerHTML = movie.runtime + " minutes";
                    document.getElementById("showtime").innerHTML = movie.showtime;
                    document.getElementById("film-info").innerHTML = movie.description;
                    document.getElementById("poster").src = movie.poster;
                    document.getElementById("poster").alt = movie.title;
                    document.getElementById("ticket-num").innerHTML = movie.capacity - movie.tickets_sold;

                    // Check if movie is sold out and update buy ticket button
                    if (movie.tickets_sold >= movie.capacity) {
                        document.getElementById("buy-ticket").textContent = "Sold Out";
                        document.getElementById("buy-ticket").disabled = true;
                    } else {
                        document.getElementById("buy-ticket").textContent = "Buy Ticket";
                        document.getElementById("buy-ticket").disabled = false;
                    }
                }
            })
            .catch(error => console.error("Error fetching movie details:", error));
    });

    // Creating the buy Ticket function

    // Creating a delete Button function
    
});
