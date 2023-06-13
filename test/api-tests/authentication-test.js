import { assert } from "chai";
import { placemarkService } from "../placemarkService.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie, maggieCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    await placemarkService.clearAuth();
    console.log("auth cleared");
    const res = await placemarkService.createUser(maggie);
    console.log(res);
    console.log("user created");
    await placemarkService.authenticate(maggieCredentials);
    console.log("user authenticated");
    await placemarkService.deleteAllUsers();
    console.log("users deleted");
  });

  test("authenticate", async () => {
    const returnedUser = await placemarkService.createUser(maggie);
    const response = await placemarkService.authenticate(maggieCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await placemarkService.createUser(maggie);
    const response = await placemarkService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    await placemarkService.clearAuth();
    try {
      await placemarkService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});
