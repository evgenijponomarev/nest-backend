import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) {}

  async sendMessage(dto: SendMessageDto) {
    const { text } = dto;

    const message = await this.prismaService.messages.create({
      data: {
        text,
      },
    });

    return message;
  }
}
