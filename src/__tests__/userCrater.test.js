const axios = require("axios");
describe("CreateUserController", () => {
  it("should return status 400 error with incorrect user data: ", async () => {
    const result = await axios
      .post("http://localhost:3001/api/user", {
        name: "eduardo",
        email: "eduardo1@hotmail.com",
      })
      .catch((error) => error.response);
    expect(result.status).toBe(400);
  });
  it("should return status 200 with correct user data: ", async () => {
    const result = await axios
      .post("http://localhost:3001/api/user", {
        name: "eduardo",
        email: "eduardo1@hotmail.com",
        password: "teste",
      })
      .then((res) => {
        return res;
      });
    expect(result.status).toBe(200);
  });
});
