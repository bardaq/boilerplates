import "../config";
import request, { Response } from "supertest";

import server from "@/app";
import logger from "@/common/logger";
import { IUser } from "./users.interfaces";
import User from "./users.entity";
import mock from "./user.mock";

describe("User routes", () => {
  const getAllPath = "users/";

  describe(`GET:${getAllPath}`, () => {
    it("should return a JSON with all users and status 200", (done) => {
      request(server)
        .get(getAllPath)
        .expect(200)
        .expect("Content-Type", /json/)
        .end((err: Error, res: Response) => {
          logger.error(err);
          logger.info(res);
          const returnedUser = res.body.users.map((u: IUser) => new User(u));
          expect(res.body.error).toBeUndefined();
          expect(returnedUser).toEqual(mock);
          done();
        });
    });
  });
});
