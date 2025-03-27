// msalConfig.js
export const msalConfig = {
    auth: {
      clientId: "bd71e391-7c4e-4f66-bfc3-31c4a0146e5b", // Replace with your Azure AD application (client) ID
      authority: "https://localhost:3000/auth-url", // Authority endpoint
      redirectUri: "http://localhost:3000", // Replace with your application's redirect URI
    },
    cache: {
      cacheLocation: "localStorage", // Can also be "sessionStorage"
      storeAuthStateInCookie: false,
    },
  };
  
  export const loginRequest = {
    scopes: ["openid", "profile", "User.Read"], // Permissions your app is requesting
  };
  