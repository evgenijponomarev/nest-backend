import {
  Controller,
  HttpStatus,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/movie.dto';
import {
  ApiHeader,
  ApiOperation,
  // ApiParam,
  ApiQuery,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiBadRequestResponse,
  // ApiBody,
} from '@nestjs/swagger';

@ApiTags('Movie')
@Controller({
  path: 'movies',
  // host: ['api.localhost', 'localhost'],
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({
    summary: 'Get all movies',
    description: 'Get all movies from the database',
  })
  @ApiOkResponse({
    description: 'The movies have been successfully fetched',
    type: [MovieDto],
  })
  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @ApiOperation({
    summary: 'Get a movie by ID',
    description: 'Get a movie by ID from the database',
  })
  // @ApiParam({
  //   name: 'id',
  //   description: 'The ID of the movie to fetch',
  //   type: String,
  //   example: '123e4567-e89b-12d3-a456-426614174000',
  // })
  @ApiHeader({
    name: 'Authorization',
    description: 'The token to access the resource',
  })
  @ApiQuery({
    name: 'year',
    description: 'The year of the movie to fetch',
    type: String,
    example: '2026',
  })
  @ApiOkResponse({
    description: 'The movie has been successfully fetched',
    type: MovieDto,
  })
  @ApiNotFoundResponse({
    description: 'The movie with the given ID was not found',
  })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.movieService.findById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new movie',
    description: 'Create a new movie in the database',
  })
  // @ApiBody({
  //   // type: MovieDto,
  //   description: 'The movie to create',
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       title: {
  //         type: 'string',
  //         example: 'The Dark Knight',
  //       },
  //       year: {
  //         type: 'number',
  //         example: 2026,
  //       },
  //     },
  //   },
  // })
  @ApiOkResponse({
    description: 'The movie has been successfully created',
    type: MovieDto,
  })
  @ApiBadRequestResponse({
    description: 'The movie data is invalid',
  })
  create(@Body() dto: MovieDto) {
    return this.movieService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: MovieDto) {
    return this.movieService.update(id, dto);
  }

  // @Patch(':id')
  // partialUpdate(@Param('id') id: string, @Body() dto: Partial<MovieDto>) {
  //   return this.movieService.partialUpdate(id, dto);
  // }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.movieService.delete(id);
  }
}
