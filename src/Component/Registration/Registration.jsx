import React, { useEffect, useState } from "react";
import { Button, Form, Input, Card, Upload, Spin } from "antd";
import { LockOutlined, PlusOutlined } from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const Registration = () => {
  const [userInfo, setUserInfo] = useState({
    FullName: "",
    Email: "",
    password: "",
    facebok_url: "",
    linkedin_url: "",
  });
  const [loading, setloading] = useState(false);
  /**
   * todo: Check all field data is available or not
   * @function changeHandler
   */

  const changeHandler = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.id]: e.target.value,
    });
  };

  /**
   * todo : HandleRegistration function throw data into database
   * @ApiEndPoint : 'http://localhost:3000/api/v1/auth/registration'
   * @body: fullName , email, password
   */
  const HandleRegistration = async () => {
    try {
      setloading(true);
      const data = await axios.post(
        "http://localhost:3000/api/v1/auth/registration",
        {
          fullName: userInfo.FullName,
          email: userInfo.Email,
          password: userInfo.password,
          facebookId: userInfo.facebok_url,
          linkedinId: userInfo.linkedin_url,
        }
      );

      const { sucess } = data.data.data;
      /**
       * todo : clear the all input state value.
       */
      setUserInfo({
        ...userInfo,
        FullName: "",
        Email: "",
        password: "",
        facebok_url: "",
        linkedin_url: "",
      });

      /**
       * todo : sucessfull message for user
       */
      if (sucess) {
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
      setloading(false);
    } catch (err) {
      const { error } = err.response.data;
      toast.error(`${error}`, {
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

  const [form] = Form.useForm();
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
        title="Registration"
        style={{
          width: 1000,
          textAlign: "center",
          margin: "auto",
        }}
      >
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          style={{
            margin: "0px 160px",
          }}
        >
          <Form.Item
            name="FullName"
            label="FullName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              id="FullName"
              onChange={changeHandler}
              value={userInfo.FullName}
            />
          </Form.Item>
          <Form.Item
            name="Email"
            label="Email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input id="Email" onChange={changeHandler} value={userInfo.Email} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              id="password"
              placeholder="Password"
              onChange={changeHandler}
              value={userInfo.password}
            />
          </Form.Item>
          <Form.Item
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item
            name="Facebook Url"
            label="Facebook url"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input
              placeholder="optional"
              id="facebok_url"
              onChange={changeHandler}
              value={userInfo.facebok_url}
            />
          </Form.Item>

          <Form.Item
            name="linkedin Url"
            label="linkedin Url"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input
              placeholder="optional"
              id="linkedin_url"
              onChange={changeHandler}
              value={userInfo.linkedin_url}
            />
          </Form.Item>

          <Form.Item>
            <Button
              style={{ backgroundColor: "orange" }}
              block
              onClick={HandleRegistration}
            >
              {loading ? <Spin /> : "Registration"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};
export default Registration;

//
