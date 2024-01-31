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
  const [otp, setotp] = useState(new Array(4).fill(""));
  const inputRef = useRef([]);

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);

  /**
   * todo : HandleInputChange machanisim
   */

  const HandleInputChange = (e, index) => {
    let value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setotp(newOtp);
    // now the otp is apart form each other , now join the all given otp
    let combineOtp = newOtp.join("");

    // check input field and move cursor or focus  next input field
    if (value && index < otp.length - 1 && inputRef.current[index + 1]) {
      inputRef.current[index + 1].focus();
    }
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
          {otp.map((item, index) => (
            <Input
              key={index}
              name={`input`}
              maxLength={1}
              ref={(input) => (inputRef.current[index] = input)}
              onChange={(e) => HandleInputChange(e, index)}
            />
          ))}
        </Space>
      </Card>
    </>
  );
};

export default OTP;
