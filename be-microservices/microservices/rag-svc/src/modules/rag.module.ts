import { Module } from "@nestjs/common";
import { VectorStoreCohereService } from "src/infrastructure/vector/vector_store.cohere";
import { RetrieverController } from "./retriever/retriever.controller";
import { RetrieverService } from "./retriever/retriever.service";
import { RAGController } from "./rag/rag.controller";
import { RAGService } from "./rag/rag.service";

@Module({
  imports: [],
  controllers: [RetrieverController, RAGController],
  providers: [
    VectorStoreCohereService,
    RetrieverService,
    RAGService,
  ],
})
export class RagModule {}