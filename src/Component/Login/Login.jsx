import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Spin, Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const onFinish = (values) => {};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const Login = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: "",
  });

  const HandleLogin = (e) => {
    setloading(true);
    setloginInfo({
      ...loginInfo,
      [e.target.id]: e.target.value,
    });
    setloading(false);
  };

  //
  const SubmitLogin = async () => {
    try {
      setloading(true);
      const login = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        {
          email: loginInfo.email,
          password: loginInfo.password,
        }
      );
      setloading(false);
      const { sucess, role } = login.data.data;

      if (role == "member") {
        toast.error(`Only admin and member can login `, {
          position: "top-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.success(`${sucess}`, {
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

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(`${error.response.data.error}`, {
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 100px)",
      }}
    >
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
        title="Login"
        style={{
          width: 500,
          margin: "auto",
        }}
      >
        <Form
          layout="vertical"
          name="basic"
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input id="email" onChange={HandleLogin} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password onChange={HandleLogin} id="password" />
          </Form.Item>

          <Form.Item
            label="Registration Not Done Yet"
            name="Registration"
            valuePropName="Registration"
            wrapperCol={{
              offset: 0,
              span: 16,
            }}
            onClick={() => navigate("/registration")}
          ></Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <Button
              type="primary"
              style={{ backgroundColor: "orange" }}
              block
              htmlType="submit"
              onClick={SubmitLogin}
            >
              {loading ? (
                <Spin size="small">
                  <div className="content" />
                </Spin>
              ) : (
                "Login"
              )}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
