import { assert } from "chai";
import { assertSubset } from "./test-utils.js";
import { maggie, maggieCredentials, testUsers, testCandidates, Stockholm, testPlacemarks } from "./fixtures.js";
import { db } from "../src/models/db.js";

suite("User mongo db tests", () => {
  suiteSetup(async () => {
    await db.init("mongo");
  });

  setup(async () => {
    await db.userStore.deleteAllUsers();
  });

  teardown(async () => {});

  test("get all users", async () => {
    const returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 0);

    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.userStore.addUser(testUsers[i]);
    }
    const returnedUsers2 = await db.userStore.getAllUsers();
    assert.equal(returnedUsers2.length, testUsers.length);
  });

  test("get user by id", async () => {
    await db.userStore.addUser(maggie);
    const returnedUser = await db.userStore.getUserById(maggie._id);
    assertSubset(maggie, returnedUser);
  });

  test("create user", async () => {
    const returnedUser = await db.userStore.addUser(maggie);
    assertSubset(maggie, returnedUser);
    assert.isDefined(returnedUser._id);
  });

  test("get user by email", async () => {
    await db.userStore.addUser(maggie);
    const returnedUser = await db.userStore.getUserByEmail(maggie.email);
    assertSubset(maggie, returnedUser);
  });

  test("delete user", async () => {
    await db.userStore.addUser(maggie);
    await db.userStore.deleteUserById(maggie._id);
    const returnedUser = await db.userStore.getUserById(maggie._id);
    assert.isNull(returnedUser);
  });

  test("delete all users", async () => {
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.userStore.addUser(testUsers[i]);
    }
    await db.userStore.deleteAllUsers();
    const returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });
});
