import { Module } from "@nestjs/common";
import { VectorStoreCohereService } from "src/infrastructure/vector/vector_store.cohere";
import { RetrieverController } from "./retriever/retriever.controller";
import { RetrieverService } from "./retriever/retriever.service";

@Module({
  imports: [],
  controllers: [RetrieverController],
  providers: [
    VectorStoreCohereService,
    RetrieverService,
  ],
})
export class RagModule {}