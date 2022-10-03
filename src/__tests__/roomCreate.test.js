const axios = require("axios");
describe("CreateUserController", () => {
  it("should return status 400 error with incorrect room data: ", async () => {
    //    ...
    expect(result.status).toBe(400);
  });
  it("should return status 200 with correct room data: ", async () => {
    // ...
    expect(result.status).toBe(200);
  });
});
