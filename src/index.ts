import { serve } from "@hono/node-server";
import { config } from "./config.js";
import logger from "./utils/logger.js";
import app from "./app.js";

// 启动服务器
const serveHotApi = (port: number = config.PORT) => {
  try {
    const apiServer = serve({
      fetch: app.fetch,
      port,
    });
    logger.info(`🔥 DailyHot API successfully runs on port ${port}`);
    logger.info(`🔗 Local: 👉 http://localhost:${port}`);
    return apiServer;
  } catch (error) {
    logger.error(error);
  }
};

// 根据环境导出不同内容
const exportedValue = process.env.VERCEL ? app.fetch : serveHotApi;

// 只使用一个默认导出
export default exportedValue;

// 如果是开发环境，启动服务器
if (
  !process.env.VERCEL &&
  (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "docker")
) {
  serveHotApi(config.PORT);
}
