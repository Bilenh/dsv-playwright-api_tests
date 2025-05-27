import { test, expect } from '@playwright/test';
import { ReqResApiPage } from '../pages/api.page';

test.describe('ReqRes API Tests - Playwright 1.52.0', () => {
  let apiPage: ReqResApiPage;

  test.beforeEach(async ({ request }) => {
    apiPage = new ReqResApiPage(request);
  });

  test('GET /api/users should return valid JSON response', async ({}, testInfo) => {
    testInfo.annotations.push({ type: 'severity', description: 'normal' });
    testInfo.annotations.push({ type: 'feature', description: 'GET Users' });

    await test.step('Execute GET request to /api', async () => {
      const response = await apiPage.getApiRoot();
      const responseData = await apiPage.validateGetResponse(response);
      console.log('API Response Data:', JSON.stringify(responseData, null, 2));
    });
  });

  test('POST /api/users should create user with valid JSON response', async ({}, testInfo) => {
    testInfo.annotations.push({ type: 'severity', description: 'critical' });
    testInfo.annotations.push({ type: 'feature', description: 'POST Create User' });

    const userData = {
      name: 'Bilen Haile',
      job: 'Software QA'
    };

    await test.step('Execute POST request to create user', async () => {
      const response = await apiPage.createUser(userData);
      const responseData = await apiPage.validatePostResponse(response, userData);
    });
  });

  test('Multiple user creation should work consistently', async ({}, testInfo) => {
    testInfo.annotations.push({ type: 'severity', description: 'minor' });
    testInfo.annotations.push({ type: 'feature', description: 'Bulk Create Users' });

    const users = [
      { name: 'Mateusz', job: 'Talent Acquisition' },
      { name: 'Indre', job: 'Product Manager' },
      { name: 'Sarah', job: 'IT Manager' }
    ];

    for (const userData of users) {
      await test.step(`Create user: ${userData.name}`, async () => {
        const response = await apiPage.createUser(userData);
        await apiPage.validatePostResponse(response, userData);
      });
    }
  });

  test('API should have proper CORS headers', async ({ request }, testInfo) => {
    testInfo.annotations.push({ type: 'severity', description: 'normal' });
    testInfo.annotations.push({ type: 'feature', description: 'CORS Header Validation' });

    const response = await request.get('https://reqres.in/api/users');
    const corsHeader = response.headers()['access-control-allow-origin'];
    expect(corsHeader).toBeDefined();

    const serverHeader = response.headers()['server'];
    expect(serverHeader).toBeDefined();
  });

  test('API response time should be reasonable', async ({ request }, testInfo) => {
    testInfo.annotations.push({ type: 'severity', description: 'trivial' });
    testInfo.annotations.push({ type: 'feature', description: 'Performance Check' });

    const startTime = Date.now();
    const response = await request.get('https://reqres.in/api/users');
    const endTime = Date.now();

    expect(response.status()).toBe(200);
    const responseTime = endTime - startTime;
    expect(responseTime).toBeLessThan(5000);
    console.log(`API Response Time: ${responseTime}ms`);
  });
});