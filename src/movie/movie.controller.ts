import {
  Controller,
  Get,
  Body,
  Delete,
  Post,
  Param,
  Put,
  Patch,
} from '@nestjs/common';

import { MovieDto } from './dto/movie.dto';
import { MovieService } from './movie.service';

@Controller({
  path: 'movies',
  host: ['api.localhost', 'localhost'],
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.movieService.findById(id);
  }

  @Post()
  create(@Body() dto: MovieDto) {
    return this.movieService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: MovieDto) {
    return this.movieService.update(id, dto);
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() dto: Partial<MovieDto>) {
    return this.movieService.partialUpdate(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.movieService.delete(id);
  }
}
