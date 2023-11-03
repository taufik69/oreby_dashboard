import React, { useEffect, useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Input, Select, Tag } from "antd";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useLayoutEffect } from "react";
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
  const [allVariant, setallVariant] = useState([]);
  // Now fetch data from database to allvariant
  useLayoutEffect(() => {
    const allVariantData = async () => {
      const getAllVariant = await axios.get(
        "http://localhost:3000/api/v1/product/allvariant"
      );
      setallVariant(getAllVariant.data);
    };
    allVariantData();
  }, []);

  console.log("from state", allVariant);
  const options = [
    {
      value: "gold",
      label: "one",
    },
    {
      value: "lime",
      label: "one",
    },
    {
      value: "green",
      label: "one",
    },
    {
      value: "cyan",
      label: "one",
    },
  ];

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (newEditorState) => {
    // Update the editorState using setEditorState
    setEditorState(newEditorState);
  };

  // this is option object

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

      <h5>Select product Variant</h5>
      <Select
        mode="multiple"
        tagRender={tagRender}
        style={{
          width: "100%",
        }}
        options={options}
      />
    </>
  );
};

export default AddProduct;
