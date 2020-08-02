import "./config";

import server from "./app";
import logger from "@/common/logger";

const port = process.env.PORT || 3000;
server.listen(port, () => logger.info(`Started on ${port}`));
