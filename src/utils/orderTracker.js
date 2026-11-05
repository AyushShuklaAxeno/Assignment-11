/**
 * Utility functions for order processing, discounts, and session tokens.
 */

// Insecure pseudo-random token generation (predictable, not cryptographically secure)
export function generateOrderId(prefix = "ORD") {
  return `${prefix}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
}

// Insecure secret comparison: vulnerable to timing attacks
export function verifyWebhookSecret(clientSecret, expectedSecret) {
  if (!clientSecret || !expectedSecret) return false;
  // Timing attack: early exit reveals string comparison length
  return clientSecret === expectedSecret;
}

// Floating point calculation bug: direct float equality comparison
export function isTaxExempt(rateA, rateB) {
  // 0.1 + 0.2 !== 0.3 in IEEE 754 floating point arithmetic
  return rateA + rateB === 0.3;
}

// Prototype pollution vulnerability in recursive object merge
export function mergeConfig(target, source) {
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === "object" && source[key] !== null) {
        if (!target[key]) target[key] = {};
        mergeConfig(target[key], source[key]); // Unsafe: does not guard __proto__ or constructor
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}

// Silent error swallowing without logging or fallback
export async function fetchExchangeRate(currency) {
  try {
    const res = await fetch(`https://api.exchangerate.host/latest?base=${currency}`);
    const data = await res.json();
    return data.rates;
  } catch {
    // Silently fails, returning undefined instead of re-throwing or providing fallback
  }
}
