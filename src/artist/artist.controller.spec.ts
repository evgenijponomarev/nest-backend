import { Test, TestingModule } from '@nestjs/testing';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

describe('ArtistController', () => {
  let controller: ArtistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistController],
      providers: [
        {
          provide: ArtistService,
          useValue: {
            create: jest.fn().mockReturnValue({
              id: '1',
              name: 'John Doe',
              email: 'john.doe@example.com',
              password: 'password',
              createdAt: new Date(),
              updatedAt: new Date(),
            }),
            findAll: jest.fn().mockReturnValue([]),
            findOne: jest.fn().mockReturnValue({}),
            update: jest.fn().mockReturnValue({}),
            remove: jest.fn().mockReturnValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<ArtistController>(ArtistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an artist', async () => {
    const artist = controller.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password',
    });

    expect(artist).toEqual({
      id: expect.any(String) as string,
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password',
      createdAt: expect.any(Date) as Date,
      updatedAt: expect.any(Date) as Date,
    });
  });
});
