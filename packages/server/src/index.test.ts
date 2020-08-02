import { sharedFunc } from "@monorepo/shared";
import { handleValidationErrorsMiddlware } from "@/common/validation";
import logger from "common/logger";

describe("Server infrastructure tests", () => {
  it("Accces to the @monorepo/shared", () => {
    expect(typeof sharedFunc).toBe("function");
  });
  it("Resolve path from the './src/*' ", () => {
    expect(logger).not.toBe(undefined);
  });
  it("Resolve path from the root alias @", () => {
    expect(handleValidationErrorsMiddlware).not.toBe(undefined);
  });
});
