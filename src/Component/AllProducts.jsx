import React, { useEffect, useState } from "react";
import { Space, Table, Button } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllProducts = () => {
  const [Product, setProduct] = useState([]);
  const [realtimeProduct, setrealtimeProduct] = useState(false);

  // HandleDelete button functionality
  const HandleDelete = async (id) => {
    //this varibale work for just realtime
    setrealtimeProduct(!realtimeProduct);
    const routeUrl = "http://localhost:3000/api/v1/product/deleteItem";
    const getresonponse = await axios.post(routeUrl, {
      id,
    });

    if (getresonponse.data.message) {
      toast.success(`${getresonponse.data.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const columns = [
    {
      title: "Serial",
      dataIndex: "Serial",
      key: "Serial",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Products Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Products Image",
      dataIndex: "product_image",
      key: "product_image",
      render: (_, record) => (
        <Space size="middle">
          <img src={record.product_image} alt="no Image" width={50} />
        </Space>
      ),
    },
    {
      title: "Store Name",
      dataIndex: "store",
      key: "store",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">Edit</Button>
          <Button
            type="primary"
            danger
            onClick={() => HandleDelete(record.key)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const allProductsData = async () => {
      const Data = await axios.get(
        "http://localhost:3000/api/v1/product/allproducts"
      );
      let productArr = [];
      Data.data.Data.map((item, index) => {
        productArr.push({
          key: item._id,
          Serial: index,
          name: item.name,
          product_image:
            "https://www.applegadgetsbd.com/_next/image?url=https%3A%2F%2Fadminapi.applegadgetsbd.com%2Fstorage%2Fmedia%2Fthumb%2F2323-92738.jpg&w=256&q=100",
          store: item.store.storeName,
        });
      });
      setProduct(productArr);
    };

    allProductsData();
  }, [realtimeProduct]);

  //   console.log(Product[0].store.storeName);
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
      <Table columns={columns} dataSource={Product} />
    </>
  );
};

export default AllProducts;
