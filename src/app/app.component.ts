import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from './service/spotify.service';
import { tap } from 'rxjs/operators';
import { SpotifyPlaylistComponent } from './spotify-playlist/spotify-playlist.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  accessTokenObtained = false;
  spotifyPlaylist: SpotifyPlaylistComponent;

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {
    this.spotifyPlaylist = new SpotifyPlaylistComponent(this.spotifyService);
    // Should probably move this callback logic to a separate callback component
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.spotifyService.getAccessToken(code)
          .subscribe((response: any) => {
            // Set accessTokenObtained to true
            this.accessTokenObtained = true;
            this.spotifyPlaylist.loadPlaylists();
            //console.log(response);
          });
      }
    });
  }

  login() {
    this.spotifyService.authorize();
  }

}
