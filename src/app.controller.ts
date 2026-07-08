import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './common/guards/auth.guard';
import { StringToLowercasePipe } from './common/pipes/string-to-lowercase.pipe';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { message: string } {
    return this.appService.getHello();
  }

  @UsePipes(StringToLowercasePipe)
  @Post()
  create(@Body('title') title: string) {
    return { title: `Movie ${title}` };
  }

  @UseGuards(AuthGuard)
  @Get('@me')
  getProfile() {
    return {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    };
  }
}
