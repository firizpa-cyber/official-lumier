
/**
 * Utility to proxy image URLs that are served over HTTP or from problematic domains
 * to avoid Mixed Content errors and SSL issues.
 */
export const getProxiedUrl = (url?: string): string | undefined => {
  if (!url) return undefined;

  // Check if the URL is from the problematic domain (ant-tv.ddns.net)
  // or if it's an HTTP URL when we might be running on HTTPS
  if (url.includes('ant-tv.ddns.net') || (url.startsWith('http://') && window.location.protocol === 'https:')) {
    // Use the local proxy
    return `/api/proxy?url=${encodeURIComponent(url)}`;
  }

  return url;
};
