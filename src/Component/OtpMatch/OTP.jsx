import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Space, Alert } from "antd";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// take url info in useparams

const OTP = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [inputerr, setinputerr] = useState(false);
  const [otp, setotp] = useState(new Array(4).fill(""));
  const [finalOtp, setFinalOtp] = useState("");
  const [urlEmail, seturlEmail] = useState("");
  const inputRef = useRef([]);

  // get params in useparams
  const { email } = useParams();
  useEffect(() => {
    seturlEmail(email);
  }, [email]);

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

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setotp(newOtp);
    // now the otp is apart form each other , now join the all given otp
    let combineOtp = newOtp.join("");
    setFinalOtp(combineOtp);
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
    if (e.key === "ArrowRight" && index < otp.length - 1) {
      if (!value) {
        return;
      }
      setinputerr(false);
      inputRef.current[index + 1].focus();
    }
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      setinputerr(false);
      inputRef.current[index - 1].focus();
    }
  };

  const HandleInput = (e, index) => {
    try {
      inputRef.current[index].setSelectionRange(0, 2);
    } catch (error) {
      console.log("HandleInput error ", error);
    }
  };

  /**
   * todo HandleOtp function
   * @param ()
   * @api :http://localhost:5000/api/v1/auth/otpmatch
   */

  const HandleOtp = async () => {
    try {
      setloading(true);
      const returnOtpData = await axios.post(
        "http://localhost:5000/api/v1/auth/otpmatch",
        {
          email: urlEmail,
          randomOTp: finalOtp,
        }
      );
      const { Message } = returnOtpData.data.data;
      toast.success(`${Message}`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      setloading(false);
    } catch (error) {
      const { Error } = error.response.data.data;
      toast.error(`${Error}`, {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setloading(false);
    }
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
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
              onClick={(e) => HandleInput(e, index)}
            />
          ))}
        </Space>
        {loading ? (
          <Button
            type="primary"
            size="big"
            block
            loading
            style={{
              marginTop: "20px",
            }}
          >
            Loading
          </Button>
        ) : (
          <Button
            type="primary"
            size="big"
            block
            onClick={HandleOtp}
            style={{
              marginTop: "20px",
            }}
          >
            Otp
          </Button>
        )}
      </Card>
    </>
  );
};

export default OTP;
