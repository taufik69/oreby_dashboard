import React from "react";
import { Alert, Space } from "antd";
const onClose = (e) => {
  console.log(e, "I was closed.");
};

const Error = () => {
  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
    >
      <Alert
        message="Error Text"
        description="Error Description Error Description Error Description Error Description Error Description Error Description"
        type="error"
        closable
        onClose={onClose}
      />
    </Space>
  );
};

export default Error;
