import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../../Redux/slices/users/usersSlices";

//Form schema
const formSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email address is required"),
  password: Yup.string().required("Password is required"),
});

const Register = () => {
  //dispatch
  const dispatch = useDispatch();
  // Formik hook
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(registerUserAction(values));
      console.log(values);
    },
    validationSchema: formSchema,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input
          value={formik.values.firstName}
          onChange={formik.handleChange("firstName")}
          onBlur={formik.handleBlur("firstName")}
          placeholder="First Name"
        />
        <p style={{ color: "red" }}>
          {formik.touched.firstName && formik.errors.firstName}
        </p>
        <input
          value={formik.values.lastName}
          onChange={formik.handleChange("lastName")}
          onBlur={formik.handleBlur("lastName")}
          placeholder="Last Name"
        />
        <p style={{ color: "red" }}>
          {formik.touched.lastName && formik.errors.lastName}
        </p>
        <input
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          placeholder="Email"
        />
        <p style={{ color: "red" }}>
          {formik.touched.email && formik.errors.email}
        </p>
        <input
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          placeholder="Password"
          type="password"
        />
        <p style={{ color: "red" }}>
          {formik.touched.password && formik.errors.password}
        </p>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
