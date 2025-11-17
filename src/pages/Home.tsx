import type { FC } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { tokenMain } from "../token";

const Home: FC = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<{
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  } | null>(null);

  useEffect(() => {
    // 没有code也没有userInfo，跳转到登录页
    if (!userInfo && !code) {
      navigate("/login");
      return;
    }
    if (userInfo || !code) {
      return;
    }
    // 有code，获取accessToken和userInfo
    tokenMain(code).then(({ userInfo }) => {
      setUserInfo(userInfo);
    });
  }, [userInfo, navigate, code]);

  return (
    <>
      <h1>Home</h1>
      {userInfo && (
        <>
          <img src={userInfo.avatar_url} alt={userInfo.login} className="w-12 h-12 rounded-full" />
          <a href={userInfo.html_url} target="_blank" rel="noreferrer" className="text-blue-600">
            {userInfo.login}
          </a>
        </>
      )}
    </>
  );
};

export default Home;
