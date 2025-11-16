import { redirect, createHashRouter } from "react-router";
import Home from "@/pages/Home";
import Login from "@/pages/Login";

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
    // 所有其他路径都重定向到首页
    path: '*',
    loader: () => redirect('/')
  }
]);

export default router;
