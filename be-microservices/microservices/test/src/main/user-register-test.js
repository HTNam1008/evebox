import http from 'k6/http';
import { check } from 'k6';

// Config
const BASE_URL = 'http://192.168.0.186:8001';
const ENDPOINT = '/api/user/register';

export const options = {
  vus: 100,           // Số lượng users đồng thời
  iterations: 10000,  // Tổng số request
};

// Hàm tạo dữ liệu test ngẫu nhiên
function generateTestData(vuId) {
  return {
    name: `User`,
    email: `user${vuId}+${Date.now()}@test.com`,
    password: "123456",
    re_password: "123456",
    phone: `0${Math.floor(100000000 + Math.random() * 900000000)}`,
    role_id: 3,
    province_id: null
  };
}

export default function () {
  const payload = JSON.stringify(generateTestData(__VU));
  
  const headers = {
    'Content-Type': 'application/json',
  };

  const response = http.post(
    `${BASE_URL}${ENDPOINT}`,
    payload,
    { headers }
  );

  // Kiểm tra status code và log message
  check(response, {
    'Status is 200/201': (r) => r.status === 200 || r.status === 201,
  });

  // Log message từ response (nếu có)
  if (response.body) {
    try {
      const body = JSON.parse(response.body);
      console.log(`[VU ${__VU}] Message: ${body.message || 'No message'}`);
    } catch (e) {
      console.error('Failed to parse response:', e);
    }
  }
}