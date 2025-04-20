import { Module } from "@nestjs/common";
import { VectorStoreCohereService } from "src/infrastructure/vector/vector_store.cohere";
import { RetrieverController } from "./retriever/retriever.controller";
import { RetrieverService } from "./retriever/retriever.service";
import { RAGController } from "./rag/rag.controller";
import { RAGService } from "./rag/rag.service";
import { NavigationService } from "./navigation/navigation.service";
import { NavigationController } from "./navigation/navigation.controller";
import { VectorStoreGeminiService } from "src/infrastructure/vector/vector_store.gemini";
import { VectorStoreService } from "src/infrastructure/vector/vector_store.service";
import { EmbeddingWrapperService } from "src/infrastructure/vector/embedding_wrapper.service";
import { ContentController } from "./content/content.controller";
import { ContentService } from "./content/content.service";
import { ContentRepository } from "./content/content.repository";

@Module({
  imports: [],
  controllers: [RetrieverController, RAGController, NavigationController, ContentController],
  providers: [
    EmbeddingWrapperService,
    VectorStoreCohereService,
    VectorStoreGeminiService,
    VectorStoreService,
    RetrieverService,
    RAGService,
    NavigationService,
    ContentService,
    ContentRepository,
  ],
})
export class RagModule {}