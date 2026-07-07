import { InjectRepository } from '@nestjs/typeorm';
import { In, type Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import { MovieEntity } from './entities/movie.entity';
import { MovieDto } from './dto/movie.dto';
import { ActorEntity } from 'src/actor/entities/actor.entity';
import { MoviePosterEntity } from './entities/poster.entity';

export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
    @InjectRepository(MoviePosterEntity)
    private readonly moviePosterRepository: Repository<MoviePosterEntity>,
  ) {}

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find({
      order: {
        createdAt: 'DESC',
      },
      where: { isAvailable: true },
      take: 10,
      select: {
        id: true,
        title: true,
        releaseYear: true,
      },
    });
  }

  async findById(id: string): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({
      where: { id, isAvailable: true },
      relations: { actors: true },
    });

    if (!movie) throw new NotFoundException('Фильм не найден');

    return movie;
  }

  async create(dto: MovieDto): Promise<MovieEntity> {
    const actors = await this.actorRepository.find({
      where: {
        id: In(dto.actorIds),
      },
    });

    if (actors.length !== dto.actorIds.length) {
      throw new NotFoundException('Некоторые актеры не найдены');
    }

    const poster = dto.imageUrl
      ? this.moviePosterRepository.create({ url: dto.imageUrl })
      : null;

    if (poster) {
      await this.moviePosterRepository.save(poster);
    }

    const movie = this.movieRepository.create({
      title: dto.title,
      releaseYear: dto.releaseYear,
      actors,
      poster,
    });

    return await this.movieRepository.save(movie);
  }

  async update(id: string, dto: MovieDto): Promise<boolean> {
    const movie = await this.findById(id);

    Object.assign(movie, dto);

    await this.movieRepository.save(movie);

    return true;
  }

  async partialUpdate(id: string, dto: Partial<MovieDto>): Promise<boolean> {
    const movie = await this.findById(id);

    Object.assign(movie, dto);

    await this.movieRepository.save(movie);

    return true;
  }

  async delete(id: string): Promise<boolean> {
    const movie = await this.findById(id);

    await this.movieRepository.remove(movie);

    return true;
  }
}
