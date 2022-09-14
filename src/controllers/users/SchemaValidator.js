import yup from "yup";

export const schemaStore = yup.object().shape({
  name: yup.string().required("Error: O campo nome é obrigario"),
  email: yup
    .string()
    .required("Error: O campo email é obrigario")
    .email("O campo email precisa ser uma email"),
  password_hash: yup
    .string()
    .required("Error: O campo senha é obrigario")
    .min(5, "A senha deve ter no minino 5 digitos"),
});

export const schemaAuth = yup.object().shape({
  email: yup
    .string()
    .required("Error: O campo email é obrigario")
    .email("O campo email precisa ser uma email"),
  password: yup.string().required("Error: O campo senha é obrigario"),
});
