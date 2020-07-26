import "module-alias/register";

import server from "./app";
// import logger from "@common/logger";
// import logger from "@common/logger";

const port = process.env.PORT || 3000;
// server.listen(port, () => logger.info(`Started on ${port}`));
server.listen(port, () => console.log(`Started on ${port}`));
