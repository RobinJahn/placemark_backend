import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { adminCredentials, lisa, lisaCredentials, maggie, maggieCredentials, testUsers } from "../fixtures.js";
import { placemarkService } from "../placemarkService.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    await placemarkService.clearAuth();
    await placemarkService.createAdminUser();
    await placemarkService.authenticate(adminCredentials);
    await placemarkService.deleteAllUsers();

    await placemarkService.createAdminUser();
    await placemarkService.createUser(lisa);
  });

  teardown(async () => {
    await placemarkService.authenticate(adminCredentials);
    await placemarkService.deleteAllUsers();
  });

  test("create a user", async () => {
    const newUser = await placemarkService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
    assert.equal(newUser.isAdmin, false);
  });

  test("delete all users - with admin privileges", async () => {
    await placemarkService.authenticate(adminCredentials);

    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createUser(testUsers[i]);
    }
    console.log("created users");

    let returnedUsers = await placemarkService.getAllUsers();
    assert.equal(returnedUsers.length, testUsers.length + 2);
    console.log("got users");

    await placemarkService.deleteAllNonAdminUsers();
    returnedUsers = await placemarkService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
    console.log("deleted users");
  });

  test("delete all users - without admin privileges", async () => {
    await placemarkService.authenticate(lisaCredentials);

    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createUser(testUsers[i]);
    }
    console.log("created users - lisa");

    await placemarkService.clearAuth();
    await placemarkService.authenticate(adminCredentials);
    let returnedUsers = await placemarkService.getAllUsers();
    assert.equal(returnedUsers.length, testUsers.length + 2);
    console.log("got users - admin");

    await placemarkService.clearAuth();
    await placemarkService.authenticate(lisaCredentials);

    try {
      await placemarkService.deleteAllNonAdminUsers();
      assert.fail("Should not return a response");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
    console.log("not deleted users - lisa");

    await placemarkService.authenticate(adminCredentials);
    returnedUsers = await placemarkService.getAllUsers();
    assert.equal(returnedUsers.length, testUsers.length + 2);
    console.log("checked users - admin");
  });

  test("get all users - unauthorized", async () => {
    await placemarkService.authenticate(lisaCredentials);
    try {
      const returnedUsers = await placemarkService.getAllUsers();
      assert.fail("Should not return a response");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });

  test("get own user - without admin privileges", async () => {
    const user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    const returnedUser = await placemarkService.getUser(user._id);
    assertSubset(maggie, returnedUser);
  });

  test("get different user - without admin privileges", async () => {
    const user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(lisaCredentials);
    try {
      const returnedUser = await placemarkService.getUser(user._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });

  test("get different user - with admin privileges", async () => {
    await placemarkService.authenticate(adminCredentials);
    const user = await placemarkService.createUser(maggie);
    const returnedUser = await placemarkService.getUser(user._id);
    assertSubset(maggie, returnedUser);
  });

  test("get a user - bad id - with admin privileges", async () => {
    await placemarkService.authenticate(adminCredentials);
    try {
      const returnedUser = await placemarkService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("get a user - deleted user - with admin privileges", async () => {
    await placemarkService.authenticate(adminCredentials);

    const user = await placemarkService.createUser(maggie);
    await placemarkService.deleteUser(user._id);
    try {
      const returnedUser = await placemarkService.getUser(user._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("delete own user - without admin privileges", async () => {
    const user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    const returnedUser = await placemarkService.deleteUser(user._id);
    assertSubset(maggie, returnedUser);
  });

  test("delete different user - without admin privileges", async () => {
    await placemarkService.authenticate(lisaCredentials);
    const user = await placemarkService.createUser(maggie);
    try {
      await placemarkService.deleteUser(user._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });

  test("delete different user - with admin privileges", async () => {
    await placemarkService.authenticate(adminCredentials);
    const user = await placemarkService.createUser(maggie);
    const returnedUser = await placemarkService.deleteUser(user._id);
    assertSubset(maggie, returnedUser);
  });
});
