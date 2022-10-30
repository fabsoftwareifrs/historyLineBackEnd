const axios = require("axios");
describe("CreateUserController", () => {
  it("should return status 400 error with incorrect room data: ", async () => {
    const result = await axios
      .post("http://localhost:3001/api/room", {
        name: "my room",
        privater: true,
        data: [
          {
            data: "1º Guerra mundial ",
            year: 1914,
          },
          {
            data: "2º Guerra Mundial",
            year: 1940,
          },
        ],
      })
      .catch((error) => error.response);
    expect(result.status).toBe(400);
  });
  it("should return status 200 with correct room private data: ", async () => {
    try {
      const result = await axios.post("http://localhost:3001/api/room", {
        name: "my room",
        privater: true,
        password: "123",
        data: [
          {
            data: "1º Guerra mundial ",
            year: 1914,
          },
          {
            data: "2º Guerra Mundial",
            year: 1940,
          },
        ],
      });
    } catch (error) {
      return error;
    }
    console.log(result);
    expect(result.statusCode).toBe(400);
  });
  it("should return status 200 with correct room not private data: ", async () => {
    try {
      const result = await axios.post("http://localhost:3001/api/room", {
        name: "my room",
        privater: false,
        password: "123",
        data: [
          {
            data: "1º Guerra mundial ",
            year: 1914,
          },
          {
            data: "2º Guerra Mundial",
            year: 1940,
          },
        ],
      });
    } catch (error) {
      return error;
    }
    console.log(result);
    expect(result.statusCode).toBe(400);
  });
  it("should return status 200 with correct room not private and without input password  data: ", async () => {
    try {
      const result = await axios.post("http://localhost:3001/api/room", {
        name: "my room",
        privater: false,
        data: [
          {
            data: "1º Guerra mundial ",
            year: 1914,
          },
          {
            data: "2º Guerra Mundial",
            year: 1940,
          },
        ],
      });
    } catch (error) {
      return error;
    }
    console.log(result);
    expect(result.statusCode).toBe(400);
  });
});
