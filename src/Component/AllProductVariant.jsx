import React, { useState, useLayoutEffect } from "react";
import axios from "axios";
import { Space, Table, Button } from "antd";

const AllProductVariant = () => {
  const columns = [
    {
      title: "Serial",
      dataIndex: "Serial",
      key: "Serial",
    },
    {
      title: "color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Image",
      dataIndex: "Image",
      key: "Image",
      render: (_, record) => (
        <Space size="middle">
          <img src={record.Image} alt="no Image" width={60} />
        </Space>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">Edit</Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const [allVariant, setallVariant] = useState([]);
  // Now fetch data from database to allvariant similar to useEffect . its prevent unnessary loading
  useLayoutEffect(() => {
    const allVariantData = async () => {
      let allVariantBlankArr = [];
      const getAllVariant = await axios.get(
        "http://localhost:3000/api/v1/product/allvariant"
      );
      getAllVariant.data.map((item, index) => {
        console.log(item.color);
        allVariantBlankArr.push({
          key: item._id,
          Serial: index,
          Image: item.image,
          color: item.color,
        });
      });
      setallVariant(allVariantBlankArr);
    };
    allVariantData();
  }, []);

  return (
    <>
      <Table columns={columns} dataSource={allVariant} />;
    </>
  );
};

export default AllProductVariant;
