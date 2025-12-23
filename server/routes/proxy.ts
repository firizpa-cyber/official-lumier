import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/', async (req, res) => {
  const url = req.query.url as string;

  if (!url) {
    return res.status(400).send('Missing URL parameter');
  }

  // Validate URL
  try {
    new URL(url);
  } catch (e) {
    return res.status(400).send('Invalid URL');
  }

  try {
    const response = await axios.get(url, {
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive'
      },
      timeout: 30000,
      maxRedirects: 5
    });

    // Set headers
    const contentType = response.headers['content-type'];
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }

    const cacheControl = response.headers['cache-control'];
    if (cacheControl) {
      res.setHeader('Cache-Control', cacheControl);
    } else {
      // Default cache logic
      const extension = url.split('.').pop()?.toLowerCase();
      if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension || '')) {
        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.setHeader('Expires', new Date(Date.now() + 3600000).toUTCString());
      } else {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Expires', '0');
      }
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    response.data.pipe(res);

  } catch (error: any) {
    console.error('Proxy Error:', error.message);
    if (error.response) {
      res.status(error.response.status).send(`Failed to fetch URL: ${url}`);
    } else {
      res.status(500).send(`Failed to fetch URL: ${url}`);
    }
  }
});

export default router;
