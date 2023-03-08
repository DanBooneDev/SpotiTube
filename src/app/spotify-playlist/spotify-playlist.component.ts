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
export class SpotifyPlaylistComponent implements OnInit {
  
  playlists$: Observable<Playlist[]> = of([]);

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.loadPlaylists();
  }

  loadPlaylists(): void {
    this.playlists$ = this.spotifyService.getPlaylists();
  }
}
