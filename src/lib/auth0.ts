export const auth0Config = {
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    secret: process.env.AUTH0_SECRET,
    baseUrl: process.env.AUTH0_BASE_URL || process.env.APP_BASE_URL,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};
