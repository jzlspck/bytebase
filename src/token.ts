import githubConfig from "./config/github";

export const getAccessToken = async (code: string) => {
  const resp = await fetch(import.meta.env.DEV ? "/login/oauth/access_token" : "https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: githubConfig.client_id,
      client_secret: githubConfig.client_secret,
      code,
      redirect_uri: githubConfig.redirect_uri,
    }),
  });
  return await resp.json();
};

export const getUserInfo = async (accessToken: string) => {
  const resp = await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await resp.json();
};

export const tokenMain = async (code: string) => {
  const accessToken = await getAccessToken(code);
  const userInfo = await getUserInfo(accessToken.access_token);
  return {
    accessToken,
    userInfo,
  };
};
