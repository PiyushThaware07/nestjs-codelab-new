import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const swaggerConfig = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle("My Codelab")
        .setDescription("This is codelab apis")
        .setVersion("1.0")
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/swagger', app, document);
}

export default swaggerConfig;