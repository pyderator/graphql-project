import "reflect-metadata";
import { createConnection } from "typeorm";

const main = async () => {
  await createConnection();
};

main();
