import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Space, Alert } from "antd";
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
  const [inputerr, setinputerr] = useState(false);
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
    if (isNaN(value)) {
      return setinputerr(true);
    }

    if (value == "") {
      return setinputerr(true);
    }

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setotp(newOtp);
    // now the otp is apart form each other , now join the all given otp
    let combineOtp = newOtp.join("");
    console.log("combineOtp", combineOtp);
    // check input field and move cursor or focus  next input field
    if (value && index < otp.length - 1 && inputRef.current[index + 1]) {
      inputRef.current[index + 1].focus();
      setinputerr(false);
    }
  };
  /**
   * @function(e , index){}
  
   */
  const HandlekeyDown = (e, index) => {
    if (e.key == "ArrowRight" && index < otp.length - 1) {
      setinputerr(false);
      inputRef.current[index + 1].focus();
    }
    if (e.key == "Backspace" && !otp[index] && index > 0) {
      setinputerr(false);
      inputRef.current[index - 1].focus();
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
        {inputerr && (
          <Alert
            message="Opt In Only Number Not Any Character"
            type="error"
            showIcon
            style={{ marginBottom: "20px" }}
          />
        )}

        <Space>
          {otp.map((item, index) => (
            <Input
              key={index}
              name={`input`}
              maxLength={1}
              ref={(input) => (inputRef.current[index] = input)}
              onChange={(e) => HandleInputChange(e, index)}
              onKeyDown={(e) => HandlekeyDown(e, index)}
            />
          ))}
        </Space>
      </Card>
    </>
  );
};

export default OTP;
