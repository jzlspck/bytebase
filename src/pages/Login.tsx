import type { FC, ReactNode } from 'react';
import '@/assets/font/iconfont.css';

const pageConfig = {
  bgImage: '',
  logoImage: '',
  logoImageDark: '',
}

const Login: FC = () => {
  return (
    <div className='w-screen h-screen flex justify-end bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url("${pageConfig.bgImage}")` }}>
      {/* 页面主要内容 */}
      <div className="w-full sm:w-1/2 h-full flex justify-center items-center">
        {/* 大屏设备宽度固定，移动端宽度自适应占满 */}
        <div className="w-full px-[40px] sm:w-[400px] sm:p-0 flex justify-center items-center">
          <div className="w-full sm:w-[320px]">
            {/* 头部 */}
            <header className='text-center'>
              <h1 className='text-[0px] w-4/5 h-16 bg-cover bg-center bg-no-repeat'>Bytebase</h1>
              <h2 className='text-lg mt-4 mb-2'>欢迎</h2>
              <p className='text-sm'>登录 Bytebase 以继续使用 Bytebase Hub。</p>
            </header>
            {/* 其他登录方式 */}
            <div className="mt-4">
              <OtherLogin />
            </div>
            {/* 分割线 */}
            <div className="w-full h-[1px] bg-border flex justify-center items-center my-4">
              <span className='text-xs bg-white w-1/12'>或</span>
            </div>
            {/* 邮件登录 */}
            <div>
              <EmailLogin />
            </div>
            {/* 跳转注册 */}
            <div className="text-sm mt-2">
              <span>没有账户？</span>
              <a href="javascript:;" className='text-primary ml-2'>注册</a>
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
}
// 其他登录方式按钮样式容器
const OtherLoginButton: FC<{
  title: string;
  icon: string;
}> = ({ title, icon }) => {
  return (
    <CommonButton className='px-2 flex gap-x-2'>
      <i className={`w-4 h-4 iconfont ${icon}`}></i>
      <span className='text-base'>{title}</span>
    </CommonButton>
  );
}
const GoogleButton = () => {
  return (
    <OtherLoginButton icon='google' title='继续使用 Google' />
  );
}
const GithubButton = () => {
  return (
    <OtherLoginButton icon='github' title='继续使用 Github' />
  );
}
const MicrosoftButton = () => {
  return (
    <OtherLoginButton icon='microsoft' title='继续使用 Microsoft Account' />
  );
}

// 邮件登录
const EmailLogin = () => {

  return (
    <>
      {/* 输入框 */}
      <label className='relative'>
        <input className='peer border border-border px-4 flex items-center text-base outline outline-0 outline-primary focus:outline-2' type="text" required />
        <span className='absolute left-4 top-1/2 -translate-y-1/2 transition-all text-base text-border bg-white px-1 peer-focus:text-primary peer-focus:left-2 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sm peer-valid:left-2 peer-valid:top-0 peer-valid:-translate-y-1/2 peer-valid:text-sm'>电子邮箱地址*</span>
      </label>
      {/* 错误信息 */}
      <p></p>
      {/* 提交按钮 */}
      <CommonButton className='bg-primary mt-4 text-white text-base transition-shadow hover:shadow-inner' isMask={false}>继续</CommonButton>
    </>
  );
}

/**
 * 公共按钮组件
 * @params {string} className 按钮类名
 * @params {boolean} isMask 是否显示遮罩层
 */
const CommonButton: FC<{
  children: ReactNode;
  className?: string;
  isMask?: boolean;
}> = ({ children, className, isMask = true }) => {
  return (
    <button className={`w-full h-[52px] border border-border rounded outline outline-primary outline-0 outline-offset-2 focus:outline-2 relative group flex justify-center items-center ${className}`}>
      {isMask && <span className='absolute inset-0 bg-[rgba(0,0,0,0.1)] opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100'></span>}
      {children}
    </button>
  );
}
