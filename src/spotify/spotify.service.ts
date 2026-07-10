import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AuthResponse } from './interfaces/auth-response.interface';
import { ArtistResponse } from './interfaces/artist.interface';

@Injectable()
export class SpotifyService {
  private accessToken: string | null;
  private tokenExpiry: number = 0;

  private readonly CLIENT_ID: string;
  private readonly CLIENT_SECRET: string;

  constructor(
    private readonly httpService: HttpService,
    configService: ConfigService,
  ) {
    this.CLIENT_ID = configService.getOrThrow<string>('SPOTIFY_CLIENT_ID');
    this.CLIENT_SECRET = configService.getOrThrow<string>(
      'SPOTIFY_CLIENT_SECRET',
    );
  }

  public async getArtist(id: string): Promise<ArtistResponse> {
    await this.authenticate();

    const response = await firstValueFrom(
      this.httpService.get<ArtistResponse>(
        `https://api.spotify.com/v1/artists/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        },
      ),
    );

    return response.data;
  }

  private async authenticate() {
    if (this.accessToken && this.tokenExpiry > Date.now()) {
      return;
    }

    const creds = Buffer.from(
      `${this.CLIENT_ID}:${this.CLIENT_SECRET}`,
    ).toString('base64');

    const response = await firstValueFrom(
      this.httpService.post<AuthResponse>(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        {
          headers: {
            Authorization: `Basic ${creds}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      ),
    );

    this.accessToken = response.data.access_token;
    this.tokenExpiry = Date.now() + response.data.expires_in * 1000;
  }
}
