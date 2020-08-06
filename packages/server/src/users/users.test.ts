import "../config";
import supertest, { Response, SuperTest, Test } from "supertest";
import uniqueId from "lodash/uniqueId";

import server from "@/loaders/server";
import logger from "@/common/logger";
import { IUser } from "./users.interfaces";
import User from "./users.entity";
import { sanitizePhone } from "./users.validation";

let agent: SuperTest<Test>;
const uid = uniqueId();
const testPayload = {
  id: undefined,
  phone: `+38(067)319-00-${uid}`,
  email: `test-${uid}@icloud.com`,
};

describe("User routes", () => {
  const usersEndpoint = "/api/users/";
  beforeAll((done) => {
    logger.debug(`env: ${process.env}`);
    agent = supertest.agent(server);
    done();
  });

  describe(`POST:${usersEndpoint}`, () => {
    it("should validate phone an return an error", async (done) => {
      agent
        .post(usersEndpoint)
        .type("form")
        .send({
          ...testPayload,
          phone: "+38(067) broken phone 319-00-32",
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
        .send({ ...testPayload, phone: undefined })
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
          ...testPayload,
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
        .send(testPayload)
        .expect(201)
        .expect("Content-Type", /json/)
        .end((err: Error, res: Response) => {
          if (err) logger.error(err);
          expect(res.body.error).toBeUndefined();
          expect(res.body.id).not.toBeUndefined();
          testPayload.id = res.body.id;
          done();
        });
    });
  });

  describe(`GET:${usersEndpoint}`, () => {
    it("should return a JSON with all users and status 200", async (done) => {
      agent
        .get(usersEndpoint)
        .expect(200)
        .expect("Content-Type", /json/)
        .end((err: Error, res: Response) => {
          if (err) logger.error(err);
          expect(res.body.error).toBeUndefined();
          res.body.users.map((u: IUser) => {
            const newUser = new User(u);
            expect(newUser).toBeInstanceOf(User);
          });
          done();
        });
    });
  });

  describe(`GET:${usersEndpoint}:id`, () => {
    it("should return a JSON with a NULL users and status 200", async (done) => {
      agent
        .get(`${usersEndpoint}/999999`)
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
        .get(`${usersEndpoint}/${testPayload.id || 1}`)
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

  describe(`PUT:${usersEndpoint}`, () => {
    it("should validate the phone an return an error", async (done) => {
      agent
        .put(usersEndpoint)
        .type("form")
        .send({ ...testPayload, phone: "+38(067) broken phone 319-00-32" })
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
        .put(usersEndpoint)
        .type("form")
        .send({ ...testPayload, id: undefined })
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
        .put(usersEndpoint)
        .type("form")
        .send({ ...testPayload, email: "email@alert('not an email');" })
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
      const newPhone = testPayload.phone.replace(uid, uid + 1);
      agent
        .put(usersEndpoint)
        .type("form")
        .send({ ...testPayload, phone: newPhone })
        .expect(200)
        .expect("Content-Type", /json/)
        .end((err: Error, res: Response) => {
          if (err) logger.error(err);
          expect(res.body.error).toBeUndefined();
          expect(res.body.user).not.toBeUndefined();
          expect(res.body.user).toEqual({
            ...testPayload,
            phone: sanitizePhone(newPhone),
          });
          done();
        });
    });
  });

  describe(`DELETE:${usersEndpoint}:id`, () => {
    it("should return a status 200", async (done) => {
      agent
        .delete(`${usersEndpoint}/${testPayload.id || 1}`)
        .expect(200)
        .expect("Content-Type", /json/)
        .end((err: Error) => {
          if (err) logger.error(err);
          done();
        });
    });
  });
});
