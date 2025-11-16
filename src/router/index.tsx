import { redirect, createHashRouter } from "react-router";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Github from "@/pages/Github";

const router = createHashRouter([
  {
    path: '/',
    Component: Home
  },
  {
    path: '/login',
    Component: Login
  },
  {
    path: '/github',
    Component: Github
  },
  {
    // 所有其他路径都重定向到首页
    path: '*',
    loader: () => redirect('/')
  }
]);

export default router;
