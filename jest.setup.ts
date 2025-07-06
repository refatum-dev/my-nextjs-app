// Jest setup file to configure global test behavior

// Extend Jest's `expect` with DOM assertions
import '@testing-library/jest-dom';

// Ensure fetch is available in the Node test environment (Node 18 has global fetch)
// For older Node versions you can uncomment the polyfill below.
import 'cross-fetch/polyfill';

// Patch Response.json static helper for environments where polyfill lacks it
if (!('json' in Response)) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore – augmenting built-in type
  Response.json = (data: unknown, init?: ResponseInit) => {
    const headers = new Headers(init?.headers);
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
    return new Response(JSON.stringify(data), { ...init, headers });
  };
}
