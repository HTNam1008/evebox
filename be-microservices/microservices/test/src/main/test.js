import http from 'k6/http';
import { check, sleep } from 'k6';

// Config
const BASE_URL = 'http://localhost:8001'; // Đổi port nếu cần
const ENDPOINT = '/api/user/register'; // Thay đổi endpoint

export const options = {
  stages: [
    { duration: '0s', target: 10000 }, // Tăng đột ngột lên 10k user
    { duration: '30s', target: 10000 }, // Duy trì 30s
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // Tỷ lệ lỗi < 1%
    http_req_duration: ['p(95)<500'], // 95% request < 500ms
  },
};

export default function () {
  const response = http.get(`${BASE_URL}${ENDPOINT}`);
  
  check(response, {
    'Status is 200': (r) => r.status === 200,
    'Response body exists': (r) => r.body.length > 0,
  });

  sleep(1); // Giả lập thời gian nghỉ giữa các request
}