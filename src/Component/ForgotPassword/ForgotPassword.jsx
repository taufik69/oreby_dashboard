import React from "react";
import { Card, Input, Button } from "antd";
const ForgotPassword = () => {
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
        <label htmlFor="email">Please give your Email</label>
        <Input
          placeholder="email"
          id="email"
          name="email"
          style={{ marginTop: "6px" }}
        />
        <Button type="primary " block style={{ marginTop: "15px" }}>
          send
        </Button>
      </Card>
      
    </div>
  );
};

export default ForgotPassword;
