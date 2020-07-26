import { sharedFunc } from "@monorepo/shared";
import { entity } from "@entities";

describe("Server tests", () => {
  it("Should invoke a func from the shared package", () => {
    expect(typeof sharedFunc).toBe("function");
  });
  it("Should display an obj imported by alias", () => {
    expect(entity).not.toBe(undefined);
  });
});
