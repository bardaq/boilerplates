import "../config";
import supertest, { Response, SuperTest, Test } from "supertest";

import server from "@/app";
import logger from "@/common/logger";
import { IUser } from "./users.interfaces";
import User from "./users.entity";
import mock from "./user.mock";
import { sanitizePhone } from "./users.validation";

let agent: SuperTest<Test>;

describe("User routes", () => {
  const usersEndpoint = "/api/users/";
  beforeAll((done) => {
    agent = supertest.agent(server);
    done();
  });

  describe(`GET:${usersEndpoint}`, () => {
    it("should return a JSON with all users and status 200", async (done) => {
      agent
        .get(usersEndpoint)
        .expect(200)
        .expect("Content-Type", /json/)
        .end((err: Error, res: Response) => {
          if (err) logger.error(err);
          const returnedUser = res.body.users.map((u: IUser) => new User(u));
          expect(res.body.error).toBeUndefined();
          expect(returnedUser).toEqual(mock);
          done();
        });
    });
  });

  describe(`POST:${usersEndpoint}`, () => {
    it("should validate phone an return an error", async (done) => {
      agent
        .post(usersEndpoint)
        .type("form")
        .send({
          phone: "+38(067) broken phone 319-00-32",
          email: "test2@icloud.com",
        })
        .expect(400)
        .expect("Content-Type", /json/)
        .end((err: Error, res: Response) => {
          if (err) logger.error(err);
          expect(Array.isArray(res.body.error)).toBe(true);
          expect(res.body.error[0].msg).toBe("invalid phone");
          expect(res.body.error[0].param).toBe("phone");
          expect(res.body.error[0].location).toBe("body");
          done();
        });
    });

    it("should return an error that phone is required", async (done) => {
      agent
        .post(usersEndpoint)
        .type("form")
        .send({ email: "test2@icloud.com" })
        .expect(400)
        .expect("Content-Type", /json/)
        .end((err: Error, res: Response) => {
          if (err) logger.error(err);
          expect(Array.isArray(res.body.error)).toBe(true);
          expect(res.body.error[0].msg).toBe("Invalid value");
          expect(res.body.error[0].param).toBe("phone");
          expect(res.body.error[0].location).toBe("body");
          done();
        });
    });

    it("should validate email an return an error", async (done) => {
      agent
        .post(usersEndpoint)
        .type("form")
        .send({
          phone: "+38(067)319-00-32",
          email: "email@alert('not an email');",
        })
        .expect(400)
        .expect("Content-Type", /json/)
        .end((err: Error, res: Response) => {
          if (err) logger.error(err);
          expect(Array.isArray(res.body.error)).toBe(true);
          expect(res.body.error[0].msg).toBe("Invalid value");
          expect(res.body.error[0].param).toBe("email");
          expect(res.body.error[0].location).toBe("body");
          done();
        });
    });

    it("should return a JSON with id and status 201", async (done) => {
      agent
        .post(usersEndpoint)
        .type("form")
        .send({
          phone: "+38(067) 319-00-32",
          email: "test2@icloud.com",
        })
        .expect(201)
        .expect("Content-Type", /json/)
        .end((err: Error, res: Response) => {
          if (err) logger.error(err);
          expect(res.body.error).toBeUndefined();
          expect(res.body.id).toHaveLength(16);
          done();
        });
    });
  });

  describe(`GET:${usersEndpoint}:id`, () => {
    it("should return an error message status 400", async (done) => {
      agent
        .get(`${usersEndpoint}/1`)
        .expect(400)
        .expect("Content-Type", /json/)
        .end((err: Error, res: Response) => {
          if (err) logger.error(err);
          expect(Array.isArray(res.body.error)).toBe(true);
          expect(res.body.error[0].msg).toBe("Invalid value");
          expect(res.body.error[0].param).toBe("id");
          expect(res.body.error[0].location).toBe("params");
          done();
        });
    });
    it("should return a JSON with a NULL users and status 200", async (done) => {
      agent
        .get(`${usersEndpoint}/123456`)
        .expect(200)
        .expect("Content-Type", /json/)
        .end((err: Error, res: Response) => {
          if (err) logger.error(err);
          expect(res.body.error).toBeUndefined();
          expect(res.body.user).not.toBeUndefined();
          expect(res.body.user).toBeNull();
          done();
        });
    });
    it("should return a JSON with a users and status 200", async (done) => {
      agent
        .get(`${usersEndpoint}/0000000000001`)
        .expect(200)
        .expect("Content-Type", /json/)
        .end((err: Error, res: Response) => {
          if (err) logger.error(err);
          expect(res.body.error).toBeUndefined();
          const returnedUser = new User(res.body.user);
          expect(returnedUser instanceof User).toBe(true);
          done();
        });
    });
  });

  describe(`PATCH:${usersEndpoint}`, () => {
    it("should validate the ID an return an error", async (done) => {
      agent
        .patch(usersEndpoint)
        .type("form")
        .send({
          id: "1",
          phone: "+38(067)319-00-39",
          email: "test2@icloud.com",
        })
        .expect(400)
        .expect("Content-Type", /json/)
        .end((err: Error, res: Response) => {
          if (err) logger.error(err);
          expect(Array.isArray(res.body.error)).toBe(true);
          expect(res.body.error[0].msg).toBe("Invalid value");
          expect(res.body.error[0].param).toBe("id");
          expect(res.body.error[0].location).toBe("body");
          done();
        });
    });

    it("should validate the phone an return an error", async (done) => {
      agent
        .patch(usersEndpoint)
        .type("form")
        .send({
          id: "0000000000001",
          phone: "+38(067) broken phone 319-00-32",
          email: "test2@icloud.com",
        })
        .expect(400)
        .expect("Content-Type", /json/)
        .end((err: Error, res: Response) => {
          if (err) logger.error(err);
          expect(Array.isArray(res.body.error)).toBe(true);
          expect(res.body.error[0].msg).toBe("invalid phone");
          expect(res.body.error[0].param).toBe("phone");
          expect(res.body.error[0].location).toBe("body");
          done();
        });
    });

    it("should return an error that ID is required", async (done) => {
      agent
        .patch(usersEndpoint)
        .type("form")
        .send({ email: "test2@icloud.com" })
        .expect(400)
        .expect("Content-Type", /json/)
        .end((err: Error, res: Response) => {
          if (err) logger.error(err);
          expect(Array.isArray(res.body.error)).toBe(true);
          expect(res.body.error[0].msg).toBe("Invalid value");
          expect(res.body.error[0].param).toBe("id");
          expect(res.body.error[0].location).toBe("body");
          done();
        });
    });

    it("should validate email an return an error", async (done) => {
      agent
        .patch(usersEndpoint)
        .type("form")
        .send({
          id: "0000000000001",
          phone: "+38(067)319-00-32",
          email: "email@alert('not an email');",
        })
        .expect(400)
        .expect("Content-Type", /json/)
        .end((err: Error, res: Response) => {
          if (err) logger.error(err);
          expect(Array.isArray(res.body.error)).toBe(true);
          expect(res.body.error[0].msg).toBe("Invalid value");
          expect(res.body.error[0].param).toBe("email");
          expect(res.body.error[0].location).toBe("body");
          done();
        });
    });

    it("should return a JSON with id and status 200", async (done) => {
      const payload = {
        id: "0000000000001",
        phone: "+38(067) 319-00-39",
        email: "testPatch@icloud.com",
      };
      agent
        .patch(usersEndpoint)
        .type("form")
        .send(payload)
        .expect(200)
        .expect("Content-Type", /json/)
        .end((err: Error, res: Response) => {
          if (err) logger.error(err);
          expect(res.body.error).toBeUndefined();
          expect(res.body.user).not.toBeUndefined();
          expect(res.body.user).toEqual({
            ...payload,
            phone: sanitizePhone(payload.phone),
          });
          done();
        });
    });
  });

  describe(`DELETE:${usersEndpoint}:id`, () => {
    it("should return an error message status 400", async (done) => {
      agent
        .get(`${usersEndpoint}/1`)
        .expect(400)
        .expect("Content-Type", /json/)
        .end((err: Error, res: Response) => {
          if (err) logger.error(err);
          expect(Array.isArray(res.body.error)).toBe(true);
          expect(res.body.error[0].msg).toBe("Invalid value");
          expect(res.body.error[0].param).toBe("id");
          expect(res.body.error[0].location).toBe("params");
          done();
        });
    });
    it("should return a JSON with a users and status 200", async (done) => {
      agent
        .get(`${usersEndpoint}/0000000000001`)
        .expect(200)
        .expect("Content-Type", /json/)
        .end((err: Error) => {
          if (err) logger.error(err);
          done();
        });
    });
  });
});
