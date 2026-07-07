import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { MovieService } from 'src/movie/movie.service';

export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    private readonly movieService: MovieService,
  ) {}

  async create(dto: CreateReviewDto): Promise<ReviewEntity> {
    const movie = await this.movieService.findById(dto.movieId);

    const review = this.reviewRepository.create({
      text: dto.text,
      rating: dto.rating,
      movie,
    });

    return await this.reviewRepository.save(review);
  }
}
