const { storeUser } = require("../../../src/app/usecase/user/");

test("JSON", async () => {
  const dataUser = {
    email: "test@gmail.com",
    password: "test",
    name: "test",
  };
  const createuser = await storeUser(dataUser);

  expect(createuser).toBe('{"foo":"hello","bar":"world"}');
});
