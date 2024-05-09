import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  List,
  Card,
  message,
  Popconfirm,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import itemService from "../services/item.service";

// Items component
const Items = () => {
  // Mock item data and item service simulation
  let itemId = 0;
  let [itemsData, setItemData] = useState([]);

  const addItemService = async (item) => {
    const newItem = { ...item, id: ++itemId };
    itemsData.push(newItem);
    await itemService.addItem(item);
    return newItem;
  };

  const getAllItemsService = async () => {
    return itemService.getAllItems();
  };

  const updateItemService = async (id, item) => {
    const index = itemsData.findIndex((i) => i.id === id);
    if (index > -1) {
      itemsData[index] = { ...itemsData[index], ...item };
    }
    await itemService.updateItem(id, item);
  };

  const deleteItemService = (id) => {
    itemsData = itemsData.filter((i) => i.id !== id);
  };

  const [items, setItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const allItems = await getAllItemsService();
    setItems(allItems);
  };

  const showModal = (item = null) => {
    setCurrentItem(item);
    form.setFieldsValue(
      item ? item : { name: "", title: "", description: "", image: "" }
    );
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (currentItem) {
          updateItemService(currentItem.id, values);
          message.success("Item updated successfully!");
        } else {
          addItemService(values);
          message.success("Item added successfully!");
        }
        setIsModalVisible(false);
        loadItems();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    deleteItemService(id);
    message.success("Item deleted successfully!");
    loadItems();
  };

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal()}
      >
        Add Item
      </Button>
      <div style={{ height: 16 }} />
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={items}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={item.title}
              actions={[
                <EditOutlined key="edit" onClick={() => showModal(item)} />,
                <Popconfirm
                  title="Are you sure delete this item?"
                  onConfirm={() => handleDelete(item.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined key="delete" />
                </Popconfirm>,
              ]}
            >
              <p>
                <strong>Name:</strong> {item.name}
              </p>
              <p>
                <strong>Description:</strong> {item.description}
              </p>
              <p>
                <strong>Image URL:</strong>{" "}
                <a href={item.image} target="_blank" rel="noopener noreferrer">
                  View Image
                </a>
              </p>
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title={currentItem ? "Edit Item" : "Add Item"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: "Please input the image URL!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Items;
