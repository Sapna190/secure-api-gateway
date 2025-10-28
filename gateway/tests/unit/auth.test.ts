import request from 'supertest';
import { app } from '../../src/server';
import { createUser, deleteUser } from '../../src/services/auth.service';

describe('Auth Middleware', () => {
  let user;

  beforeAll(async () => {
    user = await createUser({ email: 'test@example.com', password: 'password123' });
  });

  afterAll(async () => {
    await deleteUser(user.id);
  });

  it('should authenticate a user with valid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should not authenticate a user with invalid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });

  it('should return 403 for requests without a token', async () => {
    const response = await request(app)
      .get('/api/protected-endpoint');

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message', 'No token provided');
  });

  it('should return 401 for requests with an invalid token', async () => {
    const response = await request(app)
      .get('/api/protected-endpoint')
      .set('Authorization', 'Bearer invalidtoken');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Failed to authenticate token');
  });

  it('should allow access to protected routes with a valid token', async () => {
    const loginResponse = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    const token = loginResponse.body.token;

    const response = await request(app)
      .get('/api/protected-endpoint')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Access granted');
  });
});