import { assert } from "chai";
import { placemarkService } from "../placemarkService.js";

suite("Api availability Test", async () => {
  test("test availability:", async () => {
    const answer = await placemarkService.callApi();
    assert.equal(answer.message, "Api callback");
  });
});
