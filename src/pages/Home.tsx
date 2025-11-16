import type { FC } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import githubConfig from "../config/github";

const Home: FC = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [userInfo, setUserInfo] = useState<object | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!code) {
      if (!userInfo) {
        navigate("/login");
      }
      return;
    }
    let ignore = false;
    // 如果有code参数，发起请求获取access_token
    const requestToken = () => {
      fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: githubConfig.client_id,
          client_secret: githubConfig.client_secret,
          code,
          redirect_uri: "https://jzlspck.github.io/bytebase/",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (ignore) {
            return;
          }
          if (!data.access_token) {
            return;
          }
          // 发起请求获取用户信息
          fetch("https://api.github.com/user", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.access_token}`,
            },
          })
            .then((res) => res.json())
            .then((userData) => {
              if (ignore) {
                return;
              }
              setUserInfo(userData);
            });
        });
    };
    requestToken();
    return () => {
      ignore = true;
    };
  }, [code]);

  console.log(userInfo);

  return (
    <div>
      <h1>欢迎来到 Bytebase</h1>
      {/* <p>您的 GitHub 用户名是：{userInfo.login}</p> */}
    </div>
  );
};

export default Home;
