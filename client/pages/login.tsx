import { Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import InputField from "../components/InputField";
import { useLoginMutation } from "../src/generated/graphql";
import { errorMap } from "../src/utils/errorMap";

const Login = () => {
  const [{}, login] = useLoginMutation();
  const router = useRouter();
  return (
    <div>
      <h1>Login Page</h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(errorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            router.push("/");
          }
        }}
      >
        {({ handleChange }) => (
          <Form>
            <InputField
              onChange={handleChange}
              label="Username"
              name="username"
            />

            <InputField
              onChange={handleChange}
              label="Password"
              name="password"
            />

            <Button type="submit" variant="contained" color="default">
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Login;
