import type { FC } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useState, useEffect } from 'react';

const Home: FC = () => {
  const [searchParams] = useSearchParams();
  const access_token = searchParams.get("access_token");
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<object>({});

  useEffect(() => {
    if (!access_token) {
      navigate("/login");
    } else {
      // 请求用户数据
      const abortController = new AbortController();
      let ignore = false;
      fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${access_token}`,
        },
        signal: abortController.signal,
      }).then(res => res.json()).then(data => {
        if (!ignore) {
          setUserInfo(data);
        }
      });
      return () => {
        // 清理函数中取消请求
        ignore = true;
        abortController.abort();
      }
    }
  }, [access_token, navigate]);

  console.log(userInfo);

  return (
    <div>
      <h1>欢迎来到 Bytebase</h1>
      {/* <p>您的 GitHub 用户名是：{userInfo.login}</p> */}
    </div>
  );
};

export default Home;
