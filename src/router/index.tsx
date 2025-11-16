import { redirect, createBrowserRouter } from "react-router";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Github from "@/pages/Github";

const router = createBrowserRouter([
  {
    path: "/bytebase",
    children: [
      {
        path: "",
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "github",
        Component: Github,
      },
    ],
  },
  {
    // 所有其他路径都重定向到首页
    path: "*",
    loader: () => redirect("/bytebase/"),
  },
]);

export default router;
