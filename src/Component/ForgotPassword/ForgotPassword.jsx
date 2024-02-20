import React, { useState } from "react";
import { Card, Input, Button, Alert } from "antd";
import { HiOutlineMail } from "react-icons/hi";
import axios from "axios";
const ForgotPassword = () => {
  const [email, setemail] = useState("");
  const [sucessAlert, setsucessAlert] = useState(true);
  const [errorAlert, seterrorAlert] = useState(false);
  const [loader, setloader] = useState(false);
  const [goMail, setgoMail] = useState(false);

  /**
   * @API:http://localhost:5000/api/v1/auth/forgotPassword
   * todo:HandleResetPassword api Hitter function
   * @parambody {email : given email}
   */

  const HandleResetPassword = async () => {
    try {
      setloader(true);
      const api = `http://localhost:5000/api/v1/auth/forgotPassword`;
      const sucessData = await axios.post(api, {
        email,
      });

      setsucessAlert(sucessData.data.data);
      setloader(false);
      setemail("");
      setgoMail(true);
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

  /**
   * function HandleGoEmail()
   * @param (){}
   *
   */

  const HandleGoEmail = () => {
    window.location.replace("https://mail.google.com/");
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
          <div>
            <Alert
              message={sucessAlert}
              type="success"
              showIcon
              style={{ marginBottom: "20px" }}
            />
            <Button
              block
              shape="round"
              size="large"
              style={{
                width: "100%",
                marginBottom: "20px",
                background: "purple",
                color: "white",
              }}
              icon={<HiOutlineMail style={{ verticalAlign: "middle" }} />}
              onClick={HandleGoEmail}
            >
              Go to Mail
            </Button>
          </div>
        )}

        {errorAlert && (
          <Alert
            message={errorAlert}
            type="error"
            showIcon
            style={{ marginBottom: "20px" }}
          />
        )}

        {}
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
