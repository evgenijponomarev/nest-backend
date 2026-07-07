import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieEntity } from './entities/movie.entity';
import { ActorEntity } from 'src/actor/entities/actor.entity';
import { MoviePosterEntity } from './entities/poster.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity, ActorEntity, MoviePosterEntity]),
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
