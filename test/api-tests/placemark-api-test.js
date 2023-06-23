import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { maggie, maggieCredentials, Stockholm, testPlacemarks } from "../fixtures.js";
import { placemarkService } from "../placemarkService.js";

const placemarks = new Array(testPlacemarks.length);

suite("Placemark API tests", () => {
  setup(async () => {
    await placemarkService.clearAuth();
    await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    await placemarkService.deleteAllPlacemarks();

    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      placemarks[i] = await placemarkService.createPlacemark(testPlacemarks[i]);
    }

    await placemarkService.createPlacemark(Stockholm);
  });

  teardown(async () => {});

  test("create a placemark", async () => {
    const newPlacemark = await placemarkService.createPlacemark(Stockholm);
    assertSubset(Stockholm, newPlacemark);
    assert.isDefined(newPlacemark._id);
  });

  test("delete all placemarks", async () => {
    let returnedPlacemarks = await placemarkService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, testPlacemarks.length + 1);
    await placemarkService.deleteAllPlacemarks();
    await placemarkService.createPlacemark(Stockholm);
    returnedPlacemarks = await placemarkService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 1);
  });

  test("get a placemark", async () => {
    const returnedPlacemark = await placemarkService.getPlacemark(placemarks[0]._id);
    assert.deepEqual(placemarks[0], returnedPlacemark);
  });

  test("get a placemark - bad id", async () => {
    try {
      const returnedPlacemark = await placemarkService.getPlacemark("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Placemark with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a placemark - deleted placemark", async () => {
    await placemarkService.deleteAllPlacemarks();
    await placemarkService.createPlacemark(Stockholm);
    try {
      const returnedPlacemark = await placemarkService.getPlacemark(placemarks[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Placemark with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("update a placemark", async () => {
    const createdPlacemark = await placemarkService.createPlacemark(Stockholm);
    assertSubset(Stockholm, createdPlacemark);

    // create a new placemark and assign the attributes separately
    const newPlacemark = {};
    newPlacemark.name = "Updated Name";
    newPlacemark.description = "Updated Description";
    newPlacemark.lat = 99.99;
    newPlacemark.lng = 99.99;
    newPlacemark.image_list = ["image1", "image2"];

    const updatedPlacemark = await placemarkService.updatePlacemark(createdPlacemark._id, newPlacemark);
    assertSubset(createdPlacemark, updatedPlacemark);
  });
});
