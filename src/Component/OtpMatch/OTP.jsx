import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Space } from "antd";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// take url info in useparams

const OTP = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setloading] = useState(false);
  const [inputnumber, setinputnumber] = useState(null);

  const inputRef = useRef([]);
  console.log(inputRef.current);

  /**
   * todo : HandleClick function apply in input filed
   */

  // const HandleClick = () => {
  //   console.log("hello from click");
  // };

  /**
   * todo : HandlekeyDown function apply in input filed
   */

  // const HandlekeyDown = () => {
  //   console.log("hello from key down");
  // };

  // check the given otp and match the otp in the database

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
          {[1, 2, 3, 4].map((item, index) => (
            <Input
              name="otp4"
              ref={(input) => (inputRef.current[index] = input)}
            />
          ))}
        </Space>
      </Card>
    </>
  );
};

export default OTP;
