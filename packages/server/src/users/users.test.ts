import supertest, { Response, SuperTest, Test } from "supertest";

import server from "@root/app";
import logger from "@common/logger";
import { IUser } from "./users.interfaces";
import User from "./users.entity";
import mock from "./user.mock";

describe("User routes", () => {
  let agent: SuperTest<Test>;
  const getAllPath = "users/";

  beforeAll((done) => {
    agent = supertest.agent(server);
    done();
  });

  describe(`GET:${getAllPath}`, () => {
    it("should return a JSON with all users and status 200", (done) => {
      agent.get(getAllPath).end((err: Error, res: Response) => {
        if (err) logger.error(err);
        expect(res.status).toBe(200);
        const returnedUser = res.body.users.map((u: IUser) => new User(u));
        expect(res.body.error).toBeUndefined();
        expect(returnedUser).toEqual(mock);
        done();
      });
    });
  });
});
