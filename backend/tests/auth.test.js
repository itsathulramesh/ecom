const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('../routes/auth');
const User = require('../models/User');
require('dotenv').config({ path: './.env.test' });

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth API', () => {
  beforeAll(async () => {
    const mongoUri = process.env.MONGO_URI_TEST || 'mongodb://root:example@localhost:27017/ecom-test?authSource=admin';
    await mongoose.connect(mongoUri);
  }, 10000); // 10 second timeout

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  }, 10000); // 10 second timeout

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toEqual('test@example.com');
  });

  it('should login an existing user', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toEqual('test@example.com');
  });

  it('should not login with incorrect password', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });
});
