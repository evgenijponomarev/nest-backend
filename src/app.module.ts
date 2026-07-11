import { ConfigModule } from '@nestjs/config';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { ReviewModule } from './review/review.module';
import { ActorModule } from './actor/actor.module';
import { PrismaModule } from './prisma/prisma.module';
import { getGraphQLConfig } from './config/graphql.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigService } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { ArtistModule } from './artist/artist.module';
import { SpotifyModule } from './spotify/spotify.module';
import { getSpotifyConfig } from './config/spotify.config';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    MovieModule,
    ReviewModule,
    ActorModule,
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useFactory: getGraphQLConfig,
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    ChatModule,
    ArtistModule,
    SpotifyModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getSpotifyConfig,
      inject: [ConfigService],
    }),
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'uploads'),
      serveRoot: '/static',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware).forRoutes('*');
//   }
// }
