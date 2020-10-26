import React from "react";
import { Formik, Form } from "formik";
import { makeStyles, Button } from "@material-ui/core";
import InputField from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { errorMap } from "../utils/errorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import client from "../utils/UrqlClient";
const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "500px",
    margin: "auto",
  },
  button: {
    marginTop: "10px",
  },
}));

interface registerProps {}
const Register: React.FC<registerProps> = ({}) => {
  const classes = useStyles();
  const [{}, register] = useRegisterMutation();
  const router = useRouter();
  return (
    <div className={classes.root}>
      <h1>Register page</h1>
      <Formik
        initialValues={{ username: "", password: "", name: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          if (response.data?.register.errors) {
            setErrors(errorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push("/");
          }
        }}
      >
        {({ handleChange }) => (
          <Form>
            <InputField
              onChange={handleChange}
              name="username"
              label="Username"
            ></InputField>
            <InputField
              onChange={handleChange}
              name="name"
              label="Name"
            ></InputField>
            <InputField
              onChange={handleChange}
              name="password"
              label="Password"
            ></InputField>
            <Button
              //Isloading
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default withUrqlClient(client)(Register);
