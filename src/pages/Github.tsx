import type { FC } from "react";
import { useSearchParams, useNavigate } from "react-router";
import githubConfig from "@/config/github";

const GithubLogin: FC = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();
  // 没有code参数，跳转到登录页
  if (!code) {
    navigate("/login");
    return null;
  }

  return (
    <>
      {/* 立即发起请求，获取access_token */}
      <form
        className="hidden"
        ref={(el) => el?.submit()}
        action="https://github.com/login/oauth/access_token"
        method="POST"
      >
        <input
          type="text"
          className="hidden"
          name="client_id"
          value={githubConfig.client_id}
        />
        <input
          type="text"
          className="hidden"
          name="redirect_uri"
          value="https://jzlspck.github.io/bytebase/dist/"
        />
        <input
          type="text"
          className="hidden"
          name="client_secret"
          value={githubConfig.client_secret}
        />
        <input type="text" className="hidden" name="code" value={code} />
      </form>
      {/* 简单 loading */}
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    </>
  );
};

export default GithubLogin;
