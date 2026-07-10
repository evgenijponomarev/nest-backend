import { Test, TestingModule } from '@nestjs/testing';
import { ArtistService } from './artist.service';

describe('ArtistService', () => {
  let service: ArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtistService],
    }).compile();

    service = module.get<ArtistService>(ArtistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an artist', async () => {
    const artist = service.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password',
    });

    expect(artist).toEqual({});
  });
});
