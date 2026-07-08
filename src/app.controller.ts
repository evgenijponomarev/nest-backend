import { Controller, Get, Post, Body, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
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
}
