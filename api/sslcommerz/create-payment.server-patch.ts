const SSLCZ_FALLBACK = {
  storeId: 'ssss6a1b5cd185e4c',
  storePassword: 'ssss6a1b5cd185e4c@ssl',
  isSandbox: true,
};

function boolFromUnknown(value: unknown, fallback: boolean) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (['true', '1', 'yes', 'sandbox'].includes(normalized)) return true;
    if (['false', '0', 'no', 'live'].includes(normalized)) return false;
  }
  return fallback;
}

export function resolveSslcommerzCredentials(body: any) {
  return {
    storeId:
      body?.storeId ||
      body?.sslCommerzStoreId ||
      process.env.SSLCZ_STORE_ID ||
      process.env.SSLCOMMERZ_STORE_ID ||
      SSLCZ_FALLBACK.storeId,
    storePassword:
      body?.storePassword ||
      body?.storePass ||
      body?.sslCommerzStorePassword ||
      process.env.SSLCZ_STORE_PASSWORD ||
      process.env.SSLCZ_STORE_PASS ||
      process.env.SSLCOMMERZ_STORE_PASSWORD ||
      SSLCZ_FALLBACK.storePassword,
    isSandbox: boolFromUnknown(
      body?.isSandbox ?? body?.sandbox ?? body?.sslCommerzSandboxMode ?? process.env.SSLCZ_SANDBOX,
      SSLCZ_FALLBACK.isSandbox,
    ),
  };
}

// Also make your handler return both names after session creation:
// res.json({ success: true, redirectUrl: GatewayPageURL, gatewayUrl: GatewayPageURL, sessionKey });
