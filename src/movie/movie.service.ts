import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { Movie } from '../generated/prisma/client';
import { MovieDto } from './dto/movie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.movie.findMany({
      where: { isAvailable: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
      skip: 0,
      select: {
        id: true,
        title: true,
        releaseYear: true,
        actors: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findById(id: string): Promise<Movie> {
    const movie = await this.prismaService.movie.findUnique({
      where: { id, isAvailable: true },
      include: {
        actors: true,
        poster: true,
        reviews: true,
      },
    });

    if (!movie || !movie.isAvailable)
      throw new NotFoundException('Фильм не найден');

    return movie;
  }

  async create(dto: MovieDto) {
    const actors = await this.prismaService.actor.findMany({
      where: {
        id: { in: dto.actorIds },
      },
    });

    if (actors.length !== dto.actorIds.length) {
      throw new NotFoundException('Некоторые актеры не найдены');
    }

    return await this.prismaService.movie.create({
      data: {
        title: dto.title,
        releaseYear: dto.releaseYear,
        poster: dto.imageUrl ? { create: { url: dto.imageUrl } } : undefined,
        actors: { connect: actors.map((actor) => ({ id: actor.id })) },
      },
      select: {
        id: true,
        title: true,
        releaseYear: true,
        actors: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async update(id: string, dto: MovieDto): Promise<boolean> {
    const movie = await this.findById(id);

    const actors = await this.prismaService.actor.findMany({
      where: {
        id: { in: dto.actorIds },
      },
    });

    if (actors.length !== dto.actorIds.length) {
      throw new NotFoundException('Некоторые актеры не найдены');
    }

    await this.prismaService.movie.update({
      where: { id: movie.id },
      data: {
        title: dto.title,
        releaseYear: dto.releaseYear,
        poster: dto.imageUrl ? { create: { url: dto.imageUrl } } : undefined,
        actors: { connect: actors.map((actor) => ({ id: actor.id })) },
      },
    });

    return true;
  }

  async delete(id: string): Promise<boolean> {
    const movie = await this.findById(id);

    await this.prismaService.movie.delete({
      where: { id: movie.id },
    });

    return true;
  }
}
