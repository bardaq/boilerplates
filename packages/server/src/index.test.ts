import { sharedFunc } from "@monorepo/shared";
import { entity } from "entities";
import logger from "common/logger";

describe("Server infrastructure tests", () => {
  it("Accces to the @monorepo/shared", () => {
    expect(typeof sharedFunc).toBe("function");
  });
  it("Resolve path from the './src/*' ", () => {
    expect(entity).not.toBe(undefined);
    expect(logger).not.toBe(undefined);
  });
});
