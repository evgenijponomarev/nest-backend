import {
  Body,
  Controller,
  Get,
  Headers,
  Ip,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { type Request, type Response } from 'express';

@Controller({
  path: 'movies',
  host: ['api.localhost', 'localhost'],
})
export class MovieController {
  @Get()
  findAll(@Query() query: any) {
    return JSON.stringify(query);
  }

  @Get(':id/something/:somethingId')
  findById(@Param('id') id: string, @Param('somethingId') somethingId: string) {
    return { id, somethingId };
  }

  @Post()
  create(@Body() body: { title: string; genre: string }) {
    return body;
  }

  @Get('headers')
  getHeaders(@Headers() headers: any) {
    return JSON.stringify(headers);
  }

  @Get('user-agent')
  getUserAgent(@Headers('user-agent') userAgent: string) {
    return { userAgent };
  }

  @Get('request')
  getRequestDetails(@Req() req: Request) {
    return {
      method: req.method,
      url: req.url,
      headers: req.headers,
      query: req.query,
    };
  }

  @Get('response')
  getResponseDetails(@Res() res: Response, @Ip() ip: string) {
    res.status(200).json({ message: 'Hello!', ip });
  }
}
