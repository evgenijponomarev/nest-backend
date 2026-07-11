import { type DynamicModule, Global, Module } from '@nestjs/common';
import {
  SpotifyOptions,
  SpotifyAsyncOptions,
  SpotifyOptionSymbol,
} from './interfaces/spotify-options.interface';
import { SpotifyService } from './spotify.service';
import { HttpModule } from '@nestjs/axios';

// @Global()
@Module({
  // imports: [HttpModule.register({})],
  // providers: [SpotifyService],
  // exports: [SpotifyService],
})
export class SpotifyModule {
  static forRoot(options: SpotifyOptions): DynamicModule {
    return {
      module: SpotifyModule,
      imports: [HttpModule],
      providers: [
        {
          provide: SpotifyOptionSymbol,
          useValue: options,
        },
        SpotifyService,
      ],
      exports: [SpotifyService],
      global: true,
    };
  }

  static forRootAsync(options: SpotifyAsyncOptions): DynamicModule {
    return {
      module: SpotifyModule,
      imports: [HttpModule, ...(options.imports || [])],
      providers: [
        {
          provide: SpotifyOptionSymbol,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        SpotifyService,
      ],
      exports: [SpotifyService],
      global: true,
    };
  }
}
