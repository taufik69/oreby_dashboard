import React, { useState } from "react";
import { Button, InputNumber, Space } from "antd";
import { Card } from "antd";

const OTP = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <Card
        bordered={false}
        style={{
          width: 600,
          margin: "40vh auto",
          textAlign: "center",
        }}
      >
        <h1>OTP </h1>
        <Space>
          <InputNumber
            min={1}
            max={1}
            value={value}
            onChange={setValue}
            id="otp1"
          />
          <InputNumber
            min={1}
            max={1}
            value={value}
            onChange={setValue}
            id="otp2"
          />
          <InputNumber
            min={1}
            max={1}
            value={value}
            onChange={setValue}
            id="otp3"
          />
          <InputNumber
            min={1}
            max={1}
            value={value}
            onChange={setValue}
            id="otp4"
          />

          <Button
            type="primary"
            block
            onClick={() => {
              setValue(99);
            }}
          >
            Reset
          </Button>
        </Space>
        <Button type="primary" block style={{ marginTop: "10px" }}>
          Loading
        </Button>
      </Card>
    </>
  );
};

export default OTP;
