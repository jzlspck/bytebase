/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 主题色
        primary: "#4F46E5",
        // 边框色
        border: "#c9cace",
        // 文本颜色
        text: "#1e212a",
      },
    },
  },
  plugins: [],
};
