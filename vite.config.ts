import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.REACT_APP_API_KEY": JSON.stringify(env.REACT_APP_API_KEY),
      "process.env.REACT_APP_CLOUDINARY_CLOUD_NAME": JSON.stringify(env.REACT_APP_CLOUDINARY_CLOUD_NAME),
      "process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET": JSON.stringify(env.REACT_APP_CLOUDINARY_UPLOAD_PRESET),
      "process.env.REACT_APP_CLOUDINARY_API_URL": JSON.stringify(env.REACT_APP_CLOUDINARY_API_URL),
      "process.env.REACT_APP_USER_ID": JSON.stringify(env.REACT_APP_USER_ID),
    },
    plugins: [react()],
  };
});
