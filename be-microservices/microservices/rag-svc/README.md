# NestJS AI Service Architecture Plan

## 1. Mục Tiêu Dự án
Tái cấu trúc hệ thống AI hiện tại sang NestJS, sử dụng nhiều thư viện AI (OpenAI, Gemini, Claude, Cohere, Groq, Perplexity, Mistral, ...), đồng bộ Postgres và có 2 chức năng chính:
- GET /retriever: Tìm kiếm bằng LLM search
- GET /navigate: Xác định định tuyến từ query

## 2. Kiến trúc và Điểm Cần Giải Quyết

### 2.1. Chuyển từ Python FastAPI sang NestJS
- Đổi framework backend sang NestJS
- Xây dựng module-based theo NestJS pattern: Controllers, Services, Modules
- Swagger/OpenAPI tự động từ decorator (@ApiTags, @ApiResponse, ...)

### 2.2. Tích hợp nhiều thư viện AI
- Cấu hình để đọc .env với nhiều key:
```
OPENAI_API_KEY=...
GEMINI_API_KEY=...
COHERE_API_KEY=...
ANTHROPIC_API_KEY=...
PERPLEXITY_API_KEY=...
MISTRAL_API_KEY=...
...
```
- Khởi tạo danh sách providers tuần tự:
```ts
const aiProviders = [
  new OpenAIProvider(...),
  new GeminiProvider(...),
  new CohereProvider(...),
  ...
];
```
- Logic fallback theo thứ tự:
```ts
for (const provider of aiProviders) {
  try {
    const result = await provider.ask(prompt);
    if (result) return result;
  } catch (err) {
    // log and continue
  }
}
```

### 2.3. Hai API chính
#### /retriever
- Nhận query, search bằng vector similarity trong PGVector
- Tùy chọn collection
- Trả về dữ liệu tương đồng (ví dụ: danh sách phim)

#### /navigate
- Truyền prompt, gọi LLM để xác định page enum và params
- Sử dụng providers để sinh ra đáp án theo format:
```json
{
  "route": "SEARCH_PAGE",
  "params": {"keyword": "Tuan Dat"}
}
```

### 2.4. Postgres + PGVector thay MongoDB
- Dùng PostgreSQL (có extension PGVector)
- Table lưu embedding dữ liệu:
```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY,
  content TEXT,
  metadata JSONB,
  embedding VECTOR(1536)
);
```
- Khi sync: nhận dữ liệu từ DB nguồn, embedding bằng LLM, insert/update vào table

### 2.5. Sync theo lịch (tuần)
- Thiết lập 2 database:
  - `origin_db`: Dữ liệu nguồn
  - `rag_db`: Dùng cho truy vấn LLM
- Cron job bằng NestJS Schedule hoặc crontab:
```ts
@Cron('0 0 * * 0') // every Sunday
async handleCron() {
  await this.syncService.syncFromOrigin();
}
```
- Tự động đểnh kỳ dữ liệu, chạy embedding và update knowledge base

## 3. Các Bước Triển Khai
1. Khởi tạo project NestJS, chia modules: `retriever`, `navigate`, `llm`, `db-sync`, `shared`
2. Viết wrapper cho các LLM providers (OpenAI, Gemini, ...)
3. Tích hợp PGVector và logic similarity search
4. Thiết lập cron sync DB theo lịch
5. Deploy production, gồm env (.env), Swagger, logging, monitoring

## 4. Phần Mở Rộng (tùy chọn sau)
- Hệ thống dashboard xem log truy vấn và performance
- Giao diện UI truy vấn trực quan
- Tích hợp caching Redis để giảm chi phí token
- Rate limit per user/token

---
Hệ thống này khi xong sẽ rất linh hoạt và mở rộng tốt cho nhiều dạng query. Có muốn mình generate code base cho phần nào trước không?

