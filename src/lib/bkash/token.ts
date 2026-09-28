let cachedToken: {
  token: string;
  expiresAt: number;
} | null = null;

let tokenRequest: Promise<string> | null = null;

export async function getBkashToken(): Promise<string> {
  // Reuse token if still valid
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  // Prevent multiple simultaneous token requests
  if (tokenRequest) {
    return tokenRequest;
  }

  tokenRequest = requestNewToken();

  try {
    return await tokenRequest;
  } finally {
    tokenRequest = null;
  }
}

async function requestNewToken(): Promise<string> {
  const response = await fetch(`${process.env.BKASH_BASE_URL}/token/grant`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      username: process.env.BKASH_USERNAME!,
      password: process.env.BKASH_PASSWORD!,
    },

    body: JSON.stringify({
      app_key: process.env.BKASH_APP_KEY,
      app_secret: process.env.BKASH_APP_SECRET,
    }),

    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok || !data?.id_token) {
    console.error("bKash token error:", data);

    throw new Error(data?.statusMessage || "Failed to authenticate with bKash");
  }

  // Keep a safety margin before actual expiration
  const expiresIn = Number(data.expires_in || 3600) * 1000;

  cachedToken = {
    token: data.id_token,
    expiresAt: Date.now() + expiresIn - 60_000,
  };

  return data.id_token;
}
