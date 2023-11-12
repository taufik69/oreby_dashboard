import React, { useEffect, useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Input, Select, Tag } from "antd";
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

  return (
    <>
      <h5>product Name</h5>

      <Input placeholder="Basic usage" />

      <br />
      <h5> product Description</h5>
      <br />
      <div className="wyswing">
        <Editor
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
        mode="multiple"
        tagRender={tagRender}
        style={{
          width: "100%",
        }}
        options={AllstoreData || options}
      />
    </>
  );
};

export default AddProduct;
