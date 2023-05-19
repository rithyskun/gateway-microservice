import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export function SwaggerDocs(app: INestApplication) {
  const SwaggerConfig = new DocumentBuilder()
    .setTitle('SAMPLE-API')
    .setDescription('The sample api documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const SwaggerOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(
    app,
    SwaggerConfig,
    SwaggerOptions,
  );

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
