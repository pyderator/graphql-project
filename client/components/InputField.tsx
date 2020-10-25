import { TextField } from "@material-ui/core";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  const [field, { error }] = useField(props);
  console.log(error);
  return (
    <TextField
      fullWidth
      {...field}
      required
      error={!!error ? true : false}
      id={field.name}
      label={label}
      helperText={error ? error : "Must be greater than 5"}
    />
  );
};

export default InputField;
