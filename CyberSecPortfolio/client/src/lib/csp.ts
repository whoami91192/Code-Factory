// CSP (Content Security Policy) utility functions

/**
 * Generate a cryptographically secure nonce
 */
export function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Get CSP nonce from meta tag or session storage
 */
export function getCSPNonce(): string {
  // Try to get from session storage first
  const storedNonce = sessionStorage.getItem('csp-nonce');
  if (storedNonce) {
    return storedNonce;
  }
  
  // Try to get existing nonce from meta tag
  const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  if (cspMeta) {
    const content = cspMeta.getAttribute('content') || '';
    const nonceMatch = content.match(/'nonce-([^']+)'/);
    if (nonceMatch) {
      return nonceMatch[1];
    }
  }
  
  // Generate new nonce if not found
  return generateNonce();
}

/**
 * Update CSP meta tag with new nonce
 */
export function updateCSPNonce(nonce: string): void {
  const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  if (cspMeta) {
    const content = cspMeta.getAttribute('content') || '';
    const updatedContent = content.replace(/'nonce-[^']*'/g, `'nonce-${nonce}'`);
    cspMeta.setAttribute('content', updatedContent);
  }
}

/**
 * Add nonce to script or style element
 */
export function addNonceToElement(element: HTMLScriptElement | HTMLStyleElement): void {
  const nonce = getCSPNonce();
  element.setAttribute('nonce', nonce);
}

/**
 * Create a script element with proper nonce
 */
export function createScriptWithNonce(src?: string, content?: string): HTMLScriptElement {
  const script = document.createElement('script');
  if (src) script.src = src;
  if (content) script.textContent = content;
  addNonceToElement(script);
  return script;
}

/**
 * Create a style element with proper nonce
 */
export function createStyleWithNonce(content: string): HTMLStyleElement {
  const style = document.createElement('style');
  style.textContent = content;
  addNonceToElement(style);
  return style;
} 