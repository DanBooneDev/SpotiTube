import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from './service/spotify.service';
import { SpotifyPlaylistComponent } from './spotify-playlist/spotify-playlist.component';
import { Playlist } from './spotify-playlist/playlist';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  accessTokenObtained = false;
  playlists$: Observable<Playlist[]> = of([]);

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.spotifyService.getAccessToken(code)
          .subscribe((response: any) => {
            this.accessTokenObtained = true;
          });
      }
    });
  }

  login() {
    this.spotifyService.authorize();
  }

}
