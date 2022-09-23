import { useCallback, useReducer } from "react";
import {
  addDoc,
  deleteDoc,
  doc,
  collection,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { appFireStore, timestamp } from "../lib/firebaseConfig";

const initialState = {
  document: null,
  isLoading: false,
  error: null,
  isSuccess: false,
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case "isLoading":
      return { ...state, isLoading: true };
    case "addDoc":
      return { ...state, document: action.payload, isSuccess: true };
    case "deleteDoc":
      return { ...state, document: action.payload, isSuccess: true };
    case "updateDoc":
      return {
        error: null,
        isLoading: false,
        document: { ...action.payload },
        isSuccess: true,
      };
    case "error":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// 저장할 컬렉션을 인자로 전달한다.
export const useFireStore = (transaction) => {
  const [response, dispatch] = useReducer(storeReducer, initialState);

  // colRef : 컬렉션의 참조를 요구
  const colRef = collection(appFireStore, transaction);

  // 컬렉션에 문서를 추가한다.
  const addDocument = useCallback(async (doc) => {
    dispatch({ type: "isLoading" });
    try {
      const createdTime = timestamp.fromDate(new Date());
      const docRef = await addDoc(colRef, { ...doc, createdTime });
      console.log(docRef);
      dispatch({ type: "addDoc", payload: docRef });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  }, []);

  const setDocument = useCallback(async (title, info) => {
    dispatch({ type: "isLoading" });
    try {
      const createdTime = timestamp.fromDate(new Date());
      const docRef = await setDoc(doc(colRef, title), {
        ...info,
        createdTime,
      });

      dispatch({ type: "addDoc", payload: docRef });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  }, []);

  // 컬렉션에서 문서를 업데이트 한다.

  const updateDocument = useCallback(async (id, options) => {
    dispatch({ type: "isLoading" });
    try {
      const docRef = await updateDoc(doc(colRef, id), options);
      dispatch({ type: "updateDoc", payload: docRef });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  }, []);

  // 컬렉션에서 문서를 제거한다.
  const deleteDocument = useCallback(async (id) => {
    dispatch({ type: "isLoading" });
    try {
      const docRef = await deleteDoc(doc(colRef, id));
      dispatch({ type: "deleteDoc", payload: docRef });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  }, []);

  return { addDocument, setDocument, updateDocument, deleteDocument, response };
};
