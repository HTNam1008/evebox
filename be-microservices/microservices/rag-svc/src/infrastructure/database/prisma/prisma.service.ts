import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  private connected = false;

  async connectIfNeeded() {
    if (!this.connected) {
      await this.$connect();
      this.connected = true;
    }
  }

  async onModuleDestroy() {
    if (this.connected) {
      await this.$disconnect();
      this.connected = false;
    }
  }
}
