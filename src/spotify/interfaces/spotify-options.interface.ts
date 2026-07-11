import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

export const SpotifyOptionSymbol = Symbol('SPOTIFY_OPTIONS');

export type SpotifyOptions = {
  clientId: string;
  clientSecret: string;
};

export type SpotifyAsyncOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<SpotifyOptions>, 'useFactory' | 'inject'>;
