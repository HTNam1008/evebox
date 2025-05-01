"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Evebox API')
        .setDescription('The Evebox API description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',') || [];
    console.log('Allowed origins:', allowedOrigins);
    app.enableCors({
        origin: ["http://localhost:3000", "http://backend:3001"],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map