import { APIRequestContext, APIResponse, expect } from '@playwright/test';

interface UserData {
  name: string;
  job: string;
}

interface ApiResponse {
  page?: number;
  per_page?: number;
  total?: number;
  total_pages?: number;
  data?: any[];
  support?: {
    url: string;
    text: string;
  };
}

interface CreateUserResponse extends UserData {
  id: string;
  createdAt: string;
}

export class ReqResApiPage {
  constructor(private request: APIRequestContext) {}

  async getApiRoot(): Promise<APIResponse> {
    return await this.request.get('https://reqres.in/api/users', {

      headers: {
        'Accept': 'application/json',
        'x-api-key': 'reqres-free-v1'
      }
    });
    
  }

  async createUser(userData: UserData): Promise<APIResponse> {
    return await this.request.post('https://reqres.in/api/users', {
      data: userData,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': 'reqres-free-v1'
      }
    });
  }

  async validateGetResponse(response: APIResponse): Promise<ApiResponse> {
    // Status validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    
    // Headers validation
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
    
    // JSON structure validation
    const json: ApiResponse = await response.json();
    
    expect(json).toHaveProperty('page');
    expect(json).toHaveProperty('per_page');
    expect(json).toHaveProperty('total');
    expect(json).toHaveProperty('total_pages');
    expect(json).toHaveProperty('data');
    expect(json).toHaveProperty('support');
    
    // Data types validation
    expect(typeof json.page).toBe('number');
    expect(typeof json.per_page).toBe('number');
    expect(typeof json.total).toBe('number');
    expect(typeof json.total_pages).toBe('number');
    expect(Array.isArray(json.data)).toBeTruthy();
    
    // Support object validation
    expect(json.support).toHaveProperty('url');
    expect(json.support).toHaveProperty('text');
    expect(typeof json.support?.url).toBe('string');
    expect(typeof json.support?.text).toBe('string');
    
    return json;
  }

  async validatePostResponse(response: APIResponse, originalData: UserData): Promise<CreateUserResponse> {
    // Status validation
    expect(response.status()).toBe(201);
    expect(response.ok()).toBeTruthy();
    
    // Headers validation
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
    
    // JSON structure validation
    const json: CreateUserResponse = await response.json();
    console.log('JSON Response:', JSON.stringify(json, null, 2));
    expect(json).toHaveProperty('name',originalData.name);
    expect(json).toHaveProperty('job', originalData.job);
    expect(json).toHaveProperty('id');
    expect(json).toHaveProperty('createdAt');
    
    // Data types validation
    expect(typeof json.id).toBe('string');
    expect(typeof json.createdAt).toBe('string');
    
    // ID format validation
    expect(json.id).toMatch(/^\d+$/);
    
    // Date format validation
    expect(() => new Date(json.createdAt)).not.toThrow();
    expect(new Date(json.createdAt).toISOString()).toBe(json.createdAt);
    
    return json;
  }
}