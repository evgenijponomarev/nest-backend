import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './common/guards/auth.guard';
import { StringToLowercasePipe } from './common/pipes/string-to-lowercase.pipe';
import { UserAgent } from './common/decorators/user-agent.decorator';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

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

  @UseFilters(AllExceptionsFilter)
  @UseGuards(AuthGuard)
  @Get('@me')
  getProfile(@UserAgent() userAgent: string) {
    return {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      userAgent,
    };
  }
}
