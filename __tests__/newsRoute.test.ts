import 'cross-fetch/polyfill';
import { NextRequest } from 'next/server';
import { GET } from '../app/api/news/route';

// Mock the PerplexityClient used inside the API route
const sampleNews = [
  { title: 'Tytuł 1', summary: 'Podsumowanie 1', source: 'https://example.com/1' },
  { title: 'Tytuł 2', summary: 'Podsumowanie 2', source: 'https://example.com/2' },
];

jest.mock('../app/lib/perplexity', () => {
  return {
    PerplexityClient: jest.fn().mockImplementation(() => ({
      fetchPolishNews: jest.fn().mockResolvedValue(sampleNews),
    })),
  };
});

describe('GET /api/news route handler', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv }; // Shallow copy
  });

  afterAll(() => {
    process.env = originalEnv; // Restore
  });

  it('should return an error when PERPLEXITY_API_KEY is not set', async () => {
    delete process.env.PERPLEXITY_API_KEY;

    const req = new NextRequest(new Request('http://localhost/api/news'));
    const res = await GET(req as any);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(false);
    expect(data.error).toMatch(/PERPLEXITY_API_KEY/);
  });

  it('should return news when PERPLEXITY_API_KEY is provided', async () => {
    process.env.PERPLEXITY_API_KEY = 'test-key';

    const req = new NextRequest(new Request('http://localhost/api/news'));
    const res = await GET(req as any);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(Array.isArray(data.news)).toBe(true);
    expect(data.news).toHaveLength(sampleNews.length);
  });
});
