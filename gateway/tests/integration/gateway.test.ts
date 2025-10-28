import request from 'supertest';
import app from '../../src/server'; // Adjust the path as necessary
import { connectDB, disconnectDB } from '../../src/config/database'; // Adjust the path as necessary

describe('API Gateway Integration Tests', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it('should authenticate user and return JWT', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should block requests exceeding rate limit', async () => {
    const apiKey = 'test-api-key'; // Use a valid API key for testing
    const requests = Array.from({ length: 10 }).map(() =>
      request(app)
        .post('/api/some-endpoint')
        .set('Authorization', `Bearer ${apiKey}`)
        // force a low per-request test threshold so some requests get blocked
        .set('x-test-points', '3')
        .send({ data: 'test' })
    );

    const responses = await Promise.all(requests);
    const blockedResponses = responses.filter(res => res.status === 429);

    expect(blockedResponses.length).toBeGreaterThan(0);
  });

  it('should detect SQL injection attempts', async () => {
    const response = await request(app)
      .post('/api/some-endpoint')
      // ensure body is analyzed for threats
      .send({ query: "SELECT * FROM users WHERE id = 1; --" });

    expect(response.status).toBe(403); // Assuming 403 for blocked requests
    expect(response.body).toHaveProperty('reason', 'blocked');
  });

  it('should log requests and threats', async () => {
    const response = await request(app)
      .post('/api/some-endpoint')
      .send({ data: 'normal request' });

    expect(response.status).toBe(200);

    const logResponse = await request(app).get('/admin/logs?limit=1');
    expect(logResponse.status).toBe(200);
    expect(logResponse.body.logs.length).toBeGreaterThan(0);
  });
});