import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private readonly clientId = '596ac70f5b3a4b65af8f8cb2c608f90b';
  private readonly clientSecret = 'f6fff9650d65486ca99bcaf3360477e5';
  private readonly redirectUri = 'http://localhost:4200/callback';
  private readonly apiUrl = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) { }

  authorize() {
    const scope = 'user-read-private user-read-email'; // permissions needed
    const url = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${this.redirectUri}&scope=${scope}`;
    // Open the authorization URL in a new window/tab
    window.open(url, '_self');
  }

  // Step 2: Exchange the authorization code for an access token
  getAccessToken(code: string): Observable<string> {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const params = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', this.redirectUri)
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret);
      return this.http.post<{access_token: string}>(tokenUrl, params).pipe(
        map(response => response.access_token),
        tap(token => localStorage.setItem('access_token', token))
      );
  }

  getUserPlaylists(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${accessToken}`
    };
    const params = new HttpParams()
      .set('limit', '50');
    const url = `${this.apiUrl}/me/playlists`;
    return this.http.get(url, { headers, params });
  }
}
