let baseUrl = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
    // Fetch movie details
    function fetchMovieDetails() {
        fetch(baseUrl + "/films/1")
            .then(response => response.json())
            .then(movie => {
                document.getElementById("title").innerHTML = movie.title;
                document.getElementById("runtime").innerHTML = movie.runtime + " minutes";
                document.getElementById("showtime").innerHTML = movie.showtime ;
                document.getElementById("film-info").innerHTML = movie.description;
                document.getElementById("poster").src = movie.poster;
                document.getElementById("poster").alt = movie.title;
                document.getElementById("ticket-num").innerHTML = movie.capacity - movie.tickets_sold;
            })
            .catch(error => console.error("Error fetching movie details:", error));
            
    }

    fetchMovieDetails();

    //Create movie menu list

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

    // 

    // Indicate if the movie is sold out
                  //if (movie.tickets_sold >= movie.capacity) {
                      //document.getElementById("buy-ticket").disabled = true;
                      //document.getElementById("buy-ticket").innerHTML = "Sold Out";
                  //}

});