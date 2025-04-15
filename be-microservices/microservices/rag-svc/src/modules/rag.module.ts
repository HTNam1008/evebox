import { Module } from "@nestjs/common";
import { VectorStoreCohereService } from "src/infrastructure/vector/vector_store.cohere";
import { RetrieverController } from "./retriever/retriever.controller";
import { RetrieverService } from "./retriever/retriever.service";
import { RAGController } from "./rag/rag.controller";
import { RAGService } from "./rag/rag.service";
import { NavigationService } from "./navigation/navigation.service";
import { NavigationController } from "./navigation/navigation.controller";

@Module({
  imports: [],
  controllers: [RetrieverController, RAGController, NavigationController],
  providers: [
    VectorStoreCohereService,
    RetrieverService,
    RAGService,
    NavigationService,
  ],
})
export class RagModule {}