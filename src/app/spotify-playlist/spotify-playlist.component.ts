import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SpotifyService } from '../service/spotify.service';
import { of } from 'rxjs';
import { Playlist } from './playlist';

@Component({
  selector: 'app-spotify-playlist',
  templateUrl: './spotify-playlist.component.html',
  styleUrls: ['./spotify-playlist.component.css']
})
export class SpotifyPlaylistComponent{
  
  playlists$: Observable<Playlist[]> = of([]);

  constructor(private spotifyService: SpotifyService) {
  }

  loadPlaylists(): void {
    this.playlists$ = this.spotifyService.getUserPlaylists().pipe(
      map((response: any) => response.items.map((item: any) => ({
        name: item.name,
        description: item.description,
        author: item.owner.display_name,
        tracks: []
      })))
    );
  
    this.playlists$.subscribe((playlists: Playlist[]) => {
      console.log(playlists);
    });
  }

}
