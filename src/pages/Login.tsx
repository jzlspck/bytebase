import { useState, type ChangeEvent, type FC, type ReactNode } from "react";
import "@/assets/font/iconfont.js";
import { clsx } from "clsx";
import githubConfig from "@/config/github.ts";

const pageConfig = {
  bgImage:
    "sm:bg-[url('https://raw.githubusercontent.com/bytebase/bytebase.com/main/public/images/login-bg.webp')]",
  logoImage: "bg-[url('https://www.bytebase.com/images/logo.svg')]",
};

const Login: FC = () => {
  return (
    <div
      className={`w-screen h-screen flex justify-end bg-cover bg-center bg-no-repeat ${pageConfig.bgImage}`}
    >
      {/* 页面主要内容 */}
      <div className="w-full sm:w-1/2 h-full flex justify-center items-center">
        {/* 大屏设备宽度固定，移动端宽度自适应占满 */}
        <div className="w-full px-[40px] max-w-[400px] sm:w-[400px] sm:p-0 flex justify-center items-center">
          <div className="w-full sm:w-[320px]">
            {/* 头部 */}
            <header className="text-center">
              <h1
                className={`text-[0px] h-[52px] bg-contain bg-center bg-no-repeat ${pageConfig.logoImage}`}
              >
                Bytebase
              </h1>
              <h2 className="text-2xl mt-6 mb-4">欢迎</h2>
              <p className="text-sm">登录 Bytebase 以继续使用 Bytebase Hub。</p>
            </header>
            {/* 其他登录方式 */}
            <div className="mt-6">
              <OtherLogin />
            </div>
            {/* 分割线 */}
            <div className="w-full h-[1px] bg-border flex justify-center items-center my-8">
              <span className="text-xs bg-white w-1/12 flex justify-center items-center">
                或
              </span>
            </div>
            {/* 邮件登录 */}
            <div>
              <EmailLogin />
            </div>
            {/* 跳转注册 */}
            <div className="text-sm mt-4">
              <span>没有账户？</span>
              <a href="javascript:;" className="text-primary ml-2 font-medium">
                注册
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// 其他登录方式
const OtherLogin = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <GoogleButton />
      <GithubButton />
      <MicrosoftButton />
    </div>
  );
};
// 其他登录方式按钮样式容器
const OtherLoginButton: FC<{
  title: string;
  icon: string;
}> = ({ title, icon }) => {
  return (
    <CommonButton className="px-4 flex gap-x-4 justify-start">
      <svg
        className="icon"
        style={{ width: "20px", height: "20px" }}
        aria-hidden="true"
      >
        <use xlinkHref={`#icon-${icon}`}></use>
      </svg>
      <span className="text-base">{title}</span>
    </CommonButton>
  );
};
// 谷歌登录按钮
const GoogleButton = () => {
  return <OtherLoginButton icon="google" title="继续使用 Google" />;
};
// Github登录按钮
const GithubButton = () => {

  return (
    <form action="https://github.com/login/oauth/authorize" method="GET">
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
        value="https://jzlspck.github.io/bytebase/dist/github"
      />
      <OtherLoginButton icon="github" title="继续使用 Github" />
    </form>
  );
};
// Microsoft登录按钮
const MicrosoftButton = () => {
  return (
    <OtherLoginButton icon="microsoft" title="继续使用 Microsoft Account" />
  );
};

// 邮件登录
const EmailLogin = () => {
  const [email, setEmail] = useState("");
  const [isInit, setIsInit] = useState(true);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleSubmit = () => {
    // 初次提交前，不进行校验
    if (isInit) {
      setIsInit(false);
    }
  };

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let error = "";
  if (isInit) {
    // 初次提交前，不进行校验
    error = "";
  } else if (!email) {
    error = "请输入电子邮箱地址";
  } else if (!regex.test(email)) {
    error = "请输入有效的电子邮箱地址";
  }

  return (
    <>
      {/* 输入框 */}
      <label className="relative">
        <input
          className={clsx(
            "peer w-full h-[52px] border border-border px-4 flex items-center rounded text-base outline outline-0 outline-primary focus:outline-2 focus:border-none dark:bg-black",
            error && "border-red-500 focus:outline-red-500"
          )}
          type="text"
          required
          value={email}
          onChange={handleEmailChange}
        />
        <span
          className={clsx(
            "absolute left-4 top-1/2 -translate-y-1/2 transition-all text-base text-[#65676e] bg-white px-2 peer-focus:text-primary peer-focus:left-2 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sm peer-valid:left-2 peer-valid:top-0 peer-valid:-translate-y-1/2 peer-valid:text-sm dark:bg-black",
            error &&
              "text-red-500 peer-focus:text-red-500 peer-valid:text-red-500"
          )}
        >
          电子邮箱地址*
        </span>
      </label>
      {/* 错误信息 */}
      {error && (
        <p className="text-red-500 text-xs mt-2 flex items-center gap-x-2">
          <svg
            className="icon"
            style={{ width: "14px", height: "14px" }}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-Shapex"></use>
          </svg>
          {error}
        </p>
      )}
      {/* 提交按钮 */}
      <CommonButton
        className="bg-primary border-none mt-6 text-white text-base justify-center transition-shadow hover:shadow-inner"
        isMask={false}
        onClick={handleSubmit}
      >
        继续
      </CommonButton>
    </>
  );
};

/**
 * 公共按钮组件
 * @params {string} className 按钮类名
 * @params {boolean} isMask 是否显示遮罩层
 */
const CommonButton: FC<{
  children: ReactNode;
  className?: string;
  isMask?: boolean;
  [key: string]: unknown;
}> = ({ children, className, isMask = true, ...rest }) => {
  return (
    <button
      className={`w-full h-[52px] border border-border rounded outline outline-primary outline-0 outline-offset-2 focus:outline-2 relative group flex items-center ${className}`}
      {...rest}
    >
      {isMask && (
        <span className="absolute inset-0 bg-[rgba(0,0,0,0.1)] opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100"></span>
      )}
      {children}
    </button>
  );
};
