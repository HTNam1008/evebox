// src/app.module.ts

import { Injectable, Module, NestMiddleware } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { EveboxModule } from './infrastructure/eveBoxService/evebox.module';
import { RagModule } from './modules/rag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ConfigModule,
    CqrsModule,
    EveboxModule,
    RagModule,
  ],
  providers: [
  ]
})

export class AppModule {}
