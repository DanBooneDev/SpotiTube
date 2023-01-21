
// Your Spotify access token
const access_token = '';

// my redirect url
const redirect_uri = "https://danboonedev.github.io/SpotiTube/";
const client_id = "596ac70f5b3a4b65af8f8cb2c608f90b";
const scopes = "user-library-read";

// The Spotify Web API endpoint for retrieving playlists
const playlists_endpoint = 'https://api.spotify.com/v1/me/playlists';

const spotify_login_button = document.getElementById("spotify-login-button");
const spotify_playlists_button = document.getElementById("spotify-playlists-button");

spotify_login_button.addEventListener("click", function(){
    
  console.log("spotify login button pressed");
    // Redirect the user to the Spotify Authorization URL
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes}&response_type=code`;

});

spotify_playlists_button.addEventListener("click", function(){
  // Use axios to send a GET request to the Spotify Web API
  axios.get(playlists_endpoint, {
    headers: {
        'Authorization': 'Bearer ' + access_token
    }
  }).then(response => {
    // Log the response data
    console.log(response.data);
  }).catch(error => {
    // Log the error
    console.error(error);
  });

});

