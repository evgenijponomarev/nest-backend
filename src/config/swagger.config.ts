import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Nest backend API Docs')
    .setDescription('API documentation for the Nest backend course')
    .setVersion('1.0.0')
    .setContact('Evgenij Ponomarev', '', 'evgenij.ponomarev@icloud.com')
    .addBearerAuth()
    .addBasicAuth()
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setTermsOfService('https://opensource.org/licenses/MIT')
    .build();
}
