import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    description: 'The access token',
    example: 'access_token',
  })
  accessToken: string;
}
