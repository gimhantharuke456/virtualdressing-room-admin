// src/services/OrderService.js
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

class OrderService {
  constructor() {
    this.collectionRef = collection(db, "orders");
  }

  // Add a new order
  async addOrder(orderData) {
    try {
      const docRef = await addDoc(this.collectionRef, orderData);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id; // Return the new order ID
    } catch (error) {
      console.error("Error adding document: ", error);
      throw new Error("Unable to add order");
    }
  }

  // Get all orders
  async getAllOrders() {
    try {
      const querySnapshot = await getDocs(this.collectionRef);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error getting documents: ", error);
      throw new Error("Unable to fetch orders");
    }
  }

  // Update an order
  async updateOrder(orderId, updatedData) {
    try {
      const orderDocRef = doc(this.collectionRef, orderId);
      await updateDoc(orderDocRef, updatedData);
      console.log("Document updated");
    } catch (error) {
      console.error("Error updating document: ", error);
      throw new Error("Unable to update order");
    }
  }

  // Delete an order
  async deleteOrder(orderId) {
    try {
      const orderDocRef = doc(this.collectionRef, orderId);
      await deleteDoc(orderDocRef);
      console.log("Document deleted");
    } catch (error) {
      console.error("Error deleting document: ", error);
      throw new Error("Unable to delete order");
    }
  }
}

export default new OrderService();
