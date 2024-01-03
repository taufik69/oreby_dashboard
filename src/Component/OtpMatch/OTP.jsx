import React, { useState } from "react";
import { Button, Input, Space } from "antd";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

// take url info in useparams

const OTP = () => {
  const params = useParams();
  const [loading, setloading] = useState(false);
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

  // check the given otp and match the otp in the database
  const HandleOtpSubmit = async () => {
    // setloading(true);
    try {
      const { otp1, otp2, otp3, otp4 } = value;
      if (otp1 && otp2 && otp3 && otp4 == "") {
        console.log("faka");
      }
      return;
      const givenOtp = otp1 + otp2 + otp3 + otp4;
      const otpMatch = await axios.post(
        "http://localhost:3000/api/v1/auth/otpmatch",
        {
          email: "taufik.cit.bd@gmail.com",
          randomOTp: givenOtp,
        }
      );
      setloading(false);
      if (otpMatch.data.data) {
        toast("🦄" + otpMatch.data.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      setloading(false);

      toast.error("🦄" + error.response.data.data.Error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
      {/* Same as */}
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
        <Space>
          <Input value={value.otp1} onChange={HandleChange} name="otp1" />
          <Input value={value.otp2} onChange={HandleChange} name="otp2" />
          <Input value={value.otp3} onChange={HandleChange} name="otp3" />
          <Input value={value.otp4} onChange={HandleChange} name="otp4" />

          <Button
            type="primary"
            block
            onClick={() => {
              setValue({
                otp1: "",
                otp2: "",
                otp3: "",
                otp4: "",
              });
            }}
          >
            Reset
          </Button>
        </Space>
        {loading ? (
          <Button type="primary" block loading style={{ marginTop: "50px" }}>
            loading...
          </Button>
        ) : (
          <Button
            type="primary"
            block
            style={{ marginTop: "50px" }}
            onClick={HandleOtpSubmit}
          >
            Submit
          </Button>
        )}
      </Card>
    </>
  );
};

export default OTP;
