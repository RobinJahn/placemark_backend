import { assert } from "chai";
import { adminCredentials, lisa, lisaCredentials, maggie, Stockholm } from "../fixtures.js";
import { placemarkService } from "../placemarkService.js";

suite("Statistic API tests", () => {
  suiteSetup(async () => {
    await placemarkService.clearAuth();
    await placemarkService.createAdminUser();
    await placemarkService.authenticate(adminCredentials);
    await placemarkService.deleteAllUsers();

    await placemarkService.createAdminUser();
    await placemarkService.createUser(lisa);
  });

  suiteTeardown(async () => {
    await placemarkService.authenticate(adminCredentials);
    await placemarkService.deleteAllUsers();
  });

  test("get user statistic", async () => {
    await placemarkService.authenticate(adminCredentials);

    const statistic1 = await placemarkService.getStatistic("user");

    const newUser = await placemarkService.createUser(maggie);

    const statistic2 = await placemarkService.getStatistic("user");

    assert.equal(statistic1.length + 1, statistic2.length);
  });

  test("get placemark statistic", async () => {
    await placemarkService.authenticate(adminCredentials);

    const statistic1 = await placemarkService.getStatistic("placemark");

    const newPlacemark = await placemarkService.createPlacemark(Stockholm);

    const statistic2 = await placemarkService.getStatistic("placemark");

    assert.equal(statistic1.length + 1, statistic2.length);
  });

  test("get login statistic", async () => {
    await placemarkService.authenticate(adminCredentials);

    const statistic1 = await placemarkService.getStatistic("login");

    await placemarkService.authenticate(lisaCredentials);

    await placemarkService.authenticate(adminCredentials);

    const statistic2 = await placemarkService.getStatistic("login");

    assert.equal(statistic1.length + 2, statistic2.length);
  });

  test("get user statistic - without admin privileges", async () => {
    await placemarkService.authenticate(lisaCredentials);

    try {
      await placemarkService.getStatistic("user");
      assert.fail("Should have thrown");
    } catch (e) {
      assert.equal(e.message, "Permission denied");
    }
  });
});
