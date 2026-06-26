// Netlify Function: OAuth proxy for GitHub Device Flow
// Proxies requests from the browser to GitHub to avoid CORS issues.

const GITHUB_BASE = 'https://github.com/login';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { endpoint, ...params } = JSON.parse(event.body);

    if (!endpoint) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing endpoint' }) };
    }

    const url = `${GITHUB_BASE}/${endpoint}`;
    const body = new URLSearchParams(params);

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body,
    });

    const data = await res.json();

    return {
      statusCode: res.status,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
