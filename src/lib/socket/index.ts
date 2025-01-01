import type { Server } from "socket.io";
import type { DefaultEventsMap } from "socket.io/dist/typed-events";
import { uploadFileChatUsingSocket } from "./socket-file";
import logger from "@libs/logger";

export function socketHandler(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
) {
  logger.info("Socket handler is running");
  io.on("connection", (socket) => {
    logger.info("New client connected");
    // * Used to handle files
    uploadFileChatUsingSocket(socket);
  });
}
