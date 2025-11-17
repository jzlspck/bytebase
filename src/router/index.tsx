import { redirect, createBrowserRouter } from "react-router";
import Home from "@/pages/Home";
import Login from "@/pages/Login";

const router = createBrowserRouter([
  {
    path: "/bytebase",
    Component: Home,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    // 所有其他路径都重定向到首页
    path: "*",
    loader: () => redirect("/bytebase"),
  },
]);

export default router;
