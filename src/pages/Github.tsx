import type { FC } from "react";
import githubConfig from "@/config/github";
import { useRef, useEffect } from "react";

const Github: FC<{ code: string }> = ({ code }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const isSubmit = useRef(false);

  useEffect(() => {
    if (!formRef.current) {
      return;
    }
    if (!isSubmit.current) {
      formRef.current.submit();
      isSubmit.current = true;
    }
  }, []);

  return (
    <>
      {/* 立即发起请求，获取access_token */}
      <form
        ref={formRef}
        action="https://github.com/login/oauth/access_token"
        method="POST"
      >
        <input
          type="text"
          className="hidden"
          name="client_id"
          readOnly
          value={githubConfig.client_id}
        />
        <input
          type="text"
          className="hidden"
          name="redirect_uri"
          readOnly
          value="http://localhost:5173"
        />
        <input
          type="text"
          className="hidden"
          name="client_secret"
          readOnly
          value={githubConfig.client_secret}
        />
        <input type="text" className="hidden" name="code" readOnly value={code} />
      </form>
      {/* 简单 loading */}
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    </>
  );
};

export default Github;
