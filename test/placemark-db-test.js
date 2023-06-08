import { assert } from "chai";
import { assertSubset } from "./test-utils.js";
import { maggie, maggieCredentials, testUsers, testCandidates, Stockholm, testPlacemarks } from "./fixtures.js";
import { db } from "../src/models/db.js";

suite("Placemark mongo db test", () => {
  suiteSetup(async () => {
    await db.init("mongo");
  });

  setup(async () => {
    await db.placemarkStore.deleteAllPlacemarks();
  });

  teardown(async () => {});

  test("get all placemarks", async () => {
    const returnedPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 0);

    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.placemarkStore.addPlacemark(testPlacemarks[i]);
    }
    const returnedPlacemarks2 = await db.placemarkStore.getAllPlacemarks();
    assert.equal(returnedPlacemarks2.length, testPlacemarks.length);
  });

  test("get placemark by id", async () => {
    await db.placemarkStore.addPlacemark(Stockholm);
    const returnedPlacemark = await db.placemarkStore.getPlacemarkById(Stockholm._id);
    assertSubset(Stockholm, returnedPlacemark);
  });

  test("create placemark", async () => {
    const returnedPlacemark = await db.placemarkStore.addPlacemark(Stockholm);
    assertSubset(Stockholm, returnedPlacemark);
    assert.isDefined(returnedPlacemark._id);
  });

  test("delete placemark", async () => {
    await db.placemarkStore.addPlacemark(Stockholm);
    await db.placemarkStore.deletePlacemarkById(Stockholm._id);
    const returnedPlacemark = await db.placemarkStore.getPlacemarkById(Stockholm._id);
    assert.isNull(returnedPlacemark);
  });

  test("delete all placemarks", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.placemarkStore.addPlacemark(testPlacemarks[i]);
    }
    await db.placemarkStore.deleteAllPlacemarks();
    const returnedPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 0);
  });
});
