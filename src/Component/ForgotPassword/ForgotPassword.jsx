import React, { useState } from "react";
import { Card, Input, Button, Alert } from "antd";
import axios from "axios";
const ForgotPassword = () => {
  const [email, setemail] = useState("");
  const [sucessAlert, setsucessAlert] = useState(false);
  const [errorAlert, seterrorAlert] = useState(false);
  const [loader, setloader] = useState(false);

  /**
   * API:http://localhost:3000/api/v1/auth/forgotPassword
   * todo:HandleResetPassword api
   * @parambody {email : given email}
   */

  const HandleResetPassword = async () => {
    try {
      setloader(true);
      const api = `http://localhost:3000/api/v1/auth/forgotPassword`;
      const sucessData = await axios.post(api, {
        email,
      });

      setsucessAlert(sucessData.data.data);
      setloader(false);
      setemail("");
      window.location.href("https://mail.google.com/");
    } catch (error) {
      setloader(false);
      seterrorAlert(error.response.data.error);
    }
  };

  /**
   * todo : HandleEmail in onchange
   */

  const HandleEmail = (e) => {
    if (e.key === "Backspace") {
      seterrorAlert(false);
      setsucessAlert(false);
    } else if (e.key == "Enter" && e.target.value >= 10) {
      HandleResetPassword();
      setemail("");
    } else {
      setemail(e.target.value);
    }
  };

  return (
    <div>
      <Card
        title="Forgot Password"
        bordered={false}
        style={{
          width: "400px",
          margin: "30vh auto",
        }}
      >
        {sucessAlert && (
          <Alert
            message={sucessAlert}
            type="success"
            showIcon
            style={{ marginBottom: "20px" }}
          />
        )}

        {errorAlert && (
          <Alert
            message={errorAlert}
            type="error"
            showIcon
            style={{ marginBottom: "20px" }}
          />
        )}
        <label htmlFor="email">Please give your Email</label>
        <Input
          required
          placeholder="email"
          id="email"
          name="email"
          value={email}
          style={{ marginTop: "6px" }}
          onKeyDown={HandleEmail}
          onChange={(e) => setemail(e.target.value)}
        />

        {loader ? (
          <Button type="primary " block style={{ marginTop: "15px" }} loading>
            send
          </Button>
        ) : (
          <Button
            type="primary "
            block
            style={{ marginTop: "15px" }}
            onClick={HandleResetPassword}
          >
            send
          </Button>
        )}
      </Card>
    </div>
  );
};

export default ForgotPassword;
