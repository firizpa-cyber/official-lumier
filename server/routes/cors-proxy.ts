import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/', async (req, res) => {
  const url = req.query.url as string;

  if (!url) {
    return res.status(400).send('No URL provided');
  }

  // Basic security check could go here

  try {
    const response = await axios.get(url, {
      responseType: 'text', // We need text to rewrite M3U8
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      maxRedirects: 5
    });

    const contentType = response.headers['content-type'] || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

    let body = response.data;

    // Rewrite M3U8 content
    if (contentType.includes('mpegurl') || contentType.includes('x-mpegURL') || url.endsWith('.m3u8')) {
      const baseUrl = url.substring(0, url.lastIndexOf('/') + 1);
      
      // Construct proxy prefix
      // Assuming the server is running on localhost:3001 or proxied via Vite
      // Ideally, we use the request headers to determine the host
      const protocol = req.headers['x-forwarded-proto'] || req.protocol;
      const host = req.headers.host;
      const proxyPrefix = `${protocol}://${host}/api/cors-proxy?url=`;

      // 1. Rewrite URI="..." attributes
      body = body.replace(/URI="([^"]+)"/g, (_match: string, uri: string) => {
        let absoluteUrl = uri;
        if (!uri.startsWith('http')) {
            absoluteUrl = new URL(uri, baseUrl).toString();
        }
        return `URI="${proxyPrefix}${encodeURIComponent(absoluteUrl)}"`;
      });

      // 2. Rewrite segment lines (lines that are not comments and not empty)
      const lines = body.split('\n');
      const newLines = lines.map((line: string) => {
        const l = line.trim();
        if (!l) return line;
        if (l.startsWith('#')) return line;

        let absoluteUrl = l;
        if (!l.startsWith('http')) {
            absoluteUrl = new URL(l, baseUrl).toString();
        }
        return `${proxyPrefix}${encodeURIComponent(absoluteUrl)}`;
      });
      body = newLines.join('\n');
    }

    res.send(body);

  } catch (error: any) {
    console.error('CORS Proxy Error:', error.message);
    res.status(500).send('Proxy failed');
  }
});

export default router;
