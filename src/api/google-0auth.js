const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const REDIRECT_URI = "accounts/google/login/callback/";
const scope = ["profile", "email"].join(" ");
const params = {
  response_type: "code",
  client_id:
    "676408612507-qgtn63janua692gmjtoo95i7k166rg8i.apps.googleusercontent.com",
  redirect_uri: `https://sampledomain.space/${REDIRECT_URI}`,
  scope,
};

export { GOOGLE_AUTH_URL, params, scope, REDIRECT_URI };
