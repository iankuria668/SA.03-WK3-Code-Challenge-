document.addEventListener("DOMContentLoaded", () => {
    // Linking DOM Elements
    const movieList = document.getElementById('films');
    const movieTitle = document.getElementById('title');
    const movieRuntime = document.getElementById('runtime');
    const movieShowtime = document.getElementById('showtime');
    const movieDescription = document.getElementById('film-info');
    const moviePoster = document.getElementById('poster');
    const buyTicketButton = document.getElementById('buy-ticket');
    const deleteFilmButton = document.getElementById('delete-movie');
    const ticketNum = document.getElementById('ticket-num');

    //Variables to store movie data
    let currentMovie = null;
    let moviesData =  [];

    //Function to display movie Details
    function displayMovieDetails(movie) {
        //Movie Poster
        moviePoster.src = movie.poster;
        moviePoster.alt = movie.title;
        //Movie Title
        movieTitle.innerHTML = movie.title;
        //Movie Runtime
        movieRuntime.innerHTML = `${movie.runtime} minutes`;
        //Movie Showtime
        movieShowtime.innerHTML = movie.showtime;
        //Movie Description
        movieDescription.innerHTML = movie.description;
        //Available Tickets
        ticketNum.innerHTML = movie.capacity - movie.tickets_sold;

        //Updating the button text based on ticker Availability
        if (movie.tickets_sold >= movie.capacity){
            buyTicketButton.textContent = 'Sold Out';
            buyTicketButton.setAttribute('disabled','true');
        }else{
            buyTicketButton.textContent ='Buy Ticket';
            buyTicketButton.removeAttribute('disabled');
        }
        //Enabling the Delete Movie Button
        deleteFilmButton.removeAttribute('disabled');
    }

    //Function to handle the Buy Ticket button click
    function buyTicket(){
        if (currentMovie){
            //Checking if there are anyy available tickets
            if(currentMovie.tickets_sold < currentMovie.capacity){
                //Update the sold tickets count
                currentMovie.tickets_sold++
                updateTicketInfo(currentMovie)
            }
        }
    }

    //Function to handle updating the information on the server
    function updateTicketInfo(movie){
        if(movie){
            //Sending a PUT request
            fetch(`http://localhost:3000/films/${movie.id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(movie),
            })
                .then((response) => {
                    if(!response.ok){
                        throw new Error ('Network response was not ok');
                    }
                    return response.json();
                })
                .then((updatedMovie) => {
                    //Update the currentMovie with the updated data
                    currentMovie = updatedMovie;
                    displayMovieDetails(updatedMovie);
                })
                .catch((error) => {
                    console.error('Update erroe:',error);
                });
        }
    }

    //Function to handle th eDelete Movie Button Click
    function deleteCurrentMovie(){x
        if (currentMovie){
            //Send a DELETE request to the server
            fetch(`http://localhost:3000/films/${currentMovie.id}`,{
                method: 'DELETE',
            })
            .then((response) => {
                if (!response.ok){
                    throw new Error('Network response was not OK');
                }
            return response.json();
            })
            .then (() => {
                //Remove the movie from the local data
                const index = moviesData.findIndex((m) => m.id === currentMovie.id);
                if (index !== -1){
                    moviesData.splice(index,1);
                }
                //Clear the currentMovie
                currentMovie = null;

                //Clear Movie Details
                movieTitle.innerHTML = ''
                moviePoster.innerHTML = '';
                movieDescription.innerHTML = '';
                movieRuntime.innerHTML = '';
                movieShowtime.innerHTML = '';
                ticketNum.innerHTML = '';

                //Disabling th Buy Ticket and Delete Movie Button
                buyTicketButton.setAttribute('disabled','true');
                deleteFilmButton.setAttribute('disabled','true');

                //Updating the movie menu
                updateMovieList();

                //Display details of the first movie in the updated list
                if (moviesData.length > 0){
                    currentMovie = moviesData[0];
                    displayMovieDetails(currentMovie);
                }
            })
            .catch((error) => {
                console.error('Delete Error', error);
            });
        }
    }

    //Function to update the movie list
    function updateMovieList(){
        // Clear any existing li elements
        movieList.innerHTML = '';

        //Create and populate li elements for each movie
        moviesData.forEach((movie) => {
            const li = document.createElement('li');
            li.textContent = movie.title;

            //Adding an event listener to the li element
            li.addEventListener('click',() => {
                currentMovie = movie;
                displayMovieDetails(movie);
            });
            
            //Append the li element to the movielist
            movieList.appendChild(li);

        });
    }


    //Make a GET request to the JSON server when the content is loaded
    fetch('http://localhost:3000/films')
        .then((response) => {
            if (!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            //Check if the data is in an array of moview
            if (Array.isArray(data)) {
                moviesData = data;

            //Displaying the details of the first movie by default if available
            if (data.length > 0){
                currentMovie = data[0];
                displayMovieDetails(currentMovie)
            }

            //Update the movie list
            updateMovieList();

            //Adding a click event listener to the Buy Ticket button
            buyTicketButton.addEventListener('click', buyTicket);

            //Adding a click event listener to the delete button
            deleteFilmButton.addEventListener('click', deleteCurrentMovie);
        } else {
            movieList.innerHTML = 
            '<li>Invalid JSON Format. Expected on array of movies.</li>';
        }
    })
    .catch ((error) => {
            console.error('Fetch Error:',error);
            movieList.innerHTML = '<li>Error fetching data.</li>'
        });  
});