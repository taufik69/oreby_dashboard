import React, { useState } from "react";
import { Button, Input, Space } from "antd";
import { Card } from "antd";

const OTP = () => {
  const [value, setValue] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
  });

  // make HandleOtp functionality for arrenging all input value

  const HandleChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <Card
        bordered={true}
        style={{
          width: 600,
          margin: "40vh auto",
          textAlign: "center",
        }}
      >
        <h1>OTP </h1>
        <Space>
          <Input value={value.otp1} onChange={HandleChange} name="otp1" />
          <Input value={value.otp2} onChange={HandleChange} name="otp2" />
          <Input value={value.otp3} onChange={HandleChange} name="otp3" />
          <Input value={value.otp4} onChange={HandleChange} name="otp4" />

          <Button
            type="primary"
            block
            onClick={() => {
              setValue(" ");
            }}
          >
            Reset
          </Button>
        </Space>
        <Button type="primary" block style={{ marginTop: "50px" }}>
          Submt
        </Button>
      </Card>
    </>
  );
};

export default OTP;
