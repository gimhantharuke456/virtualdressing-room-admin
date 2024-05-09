// ItemService.js
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

class ItemService {
  constructor() {
    this.collectionRef = collection(db, "items");
  }

  // Add a new item
  async addItem(itemData) {
    try {
      const docRef = await addDoc(this.collectionRef, itemData);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // Fetch all items
  async getAllItems() {
    try {
      const querySnapshot = await getDocs(this.collectionRef);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.error("Error getting documents: ", e);
      return [];
    }
  }

  // Update an item
  async updateItem(itemId, updatedData) {
    const itemDoc = doc(db, "items", itemId);
    try {
      await updateDoc(itemDoc, updatedData);
      console.log("Document updated");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  // Delete an item
  async deleteItem(itemId) {
    const itemDoc = doc(db, "items", itemId);
    try {
      await deleteDoc(itemDoc);
      console.log("Document deleted");
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }
}

export default new ItemService();
