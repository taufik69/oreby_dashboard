import React, { useEffect, useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Input, Select, Tag, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrdouctUpload from "./ProductUplad/PrdouctUpload";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";

const tagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
        color: "purple",
      }}
    >
      {label}
    </Tag>
  );
};

const AddProduct = () => {
  const options = [
    {
      value: "Store_Id",
      label: "StoreName",
    },
  ];

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [AllstoreData, setAllstoreData] = useState([]);
  const [productName, setproductName] = useState(null);
  const [productDescription, setproductDescription] = useState(null);
  const [StoreName, setStoreName] = useState(null);
  // this state work for button
  const [size, setSize] = useState("large");

  const onEditorStateChange = (newEditorState) => {
    // Update the editorState using setEditorState
    setEditorState(newEditorState);
  };

  /**
   * todo: take allstore data using useEffect and api
   * @Api : "http://localhost:3000/api/v1/marchant/allstore"
   */

  useEffect(() => {
    const allStore = async () => {
      let allstoreArr = [];
      const data = await axios.get(
        "http://localhost:3000/api/v1/marchant/allstore"
      );
      data.data.map((item) => {
        allstoreArr.push({
          value: item._id,
          label: item.storeName,
        });
      });
      setAllstoreData(allstoreArr);
    };
    allStore();

    return () => {
      const allStore = async () => {
        let allstoreArr = [];
        const data = await axios.get(
          "http://localhost:3000/api/v1/marchant/allstore"
        );
        data.data.map((item) => {
          allstoreArr.push({
            value: item._id,
            label: item.storeName,
          });
        });
        setAllstoreData(allstoreArr);
      };
      allStore();
    };
  }, []);

  /**
   * todo: HandleProductUpload function work for upload all details in backend
   *
   */
  const HandleProductUpload = async () => {
    try {
      const data = await axios.post(
        "http://localhost:3000/api/v1/product/createproduct",
        {
          name: productName,
          description: productDescription,
          store: StoreName,
        }
      );
      if (data.data) {
        toast.success(`${data.data.name} upload suessfully`, {
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
      if (error.response.data.error) {
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
      }
      console.log();
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
      <h5>product Name</h5>

      <Input
        placeholder="Basic usage"
        onChange={(e) => setproductName(e.target.value)}
      />

      <br />
      <h5> product Description</h5>
      <br />
      <div className="wyswing">
        <Editor
          onChange={(e) => setproductDescription(e.blocks[0].text)}
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />
      </div>
      <br />

      <h5>Select Store</h5>
      <Select
        onChange={(e) => {
          setStoreName(e);
        }}
        mode="multiple"
        tagRender={tagRender}
        style={{
          width: "100%",
          color: "red",
        }}
        options={AllstoreData || options}
      />
      <br />
      <br />
      <br />
      <br />
      <PrdouctUpload />

      <br />
      <br />
      <br />
      <br />
      <Button
        style={{ width: "100%" }}
        type="primary"
        shape="round"
        icon={<UploadOutlined />}
        size={size}
        onClick={HandleProductUpload}
      >
        Download
      </Button>
    </>
  );
};

export default AddProduct;
