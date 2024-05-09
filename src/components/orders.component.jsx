import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Popconfirm, Select } from "antd";
import orderService from "../services/order.service";
const { Option } = Select;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const handleStatusChange = async (orderId, newStatus) => {
    await orderService.updateOrder(orderId, { status: newStatus });
    fetchOrders(); // Refresh the orders list
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const fetchedOrders = await orderService.getAllOrders();
    setOrders(fetchedOrders);
  };

  const showUpdateModal = (order) => {
    setCurrentOrder(order);
    setIsModalVisible(true);
  };

  const handleUpdate = async (values) => {
    await orderService.updateOrder(currentOrder.id, values);
    setIsModalVisible(false);
    fetchOrders(); // Refresh the orders list
  };

  const handleDelete = async (orderId) => {
    await orderService.deleteOrder(orderId);
    fetchOrders(); // Refresh the orders list
  };

  const columns = [
    { title: "User ID", dataIndex: "userId", key: "userId" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Postal Code", dataIndex: "postalCode", key: "postalCode" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Select
          defaultValue={text}
          style={{ width: 120 }}
          onChange={(newStatus) => handleStatusChange(record.id, newStatus)}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Shipped">Shipped</Option>
          <Option value="Completed">Completed</Option>
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="dashed" onClick={() => showUpdateModal(record)}>
            Update
          </Button>
          <Popconfirm
            title="Are you sure delete this order?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger style={{ marginLeft: 8 }}>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={orders} columns={columns} rowKey="id" />
      <Modal
        title="Update Order"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={currentOrder}
          onFinish={handleUpdate}
          layout="vertical"
        >
          <Form.Item name="phoneNumber" label="Phone Number">
            <Input />
          </Form.Item>
          <Form.Item name="postalCode" label="Postal Code">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Orders;
