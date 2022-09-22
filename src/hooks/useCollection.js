import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { appFireStore } from "../lib/firebaseConfig";

export const useCollection = (transaction, myQuery) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    let q;
    if (myQuery) {
      q = query(
        collection(appFireStore, transaction),
        where(...myQuery),
        orderBy("createdTime", "desc"),
      );
    }

    // 계속 통신하게 되어 이를 cleanup 함수로 처리해준다.
    const unsubscribe = onSnapshot(
      myQuery ? q : collection(appFireStore, transaction),
      (snapshot) => {
        let result = [];
        snapshot.docs.forEach((doc) => {
          // 각각 document의 문서를 가져오려면 data 메서드를 사용해야한다.
          // 각각의 document를 object로 저장.
          result.push({ ...doc.data(), id: doc.id });
        });

        setDocuments(result);
        setError(null);
      },
      // onSnapshot에서는 자체적으로 try catch 문을 작성 가능.
      (error) => {
        setError(error.message);
      },
    );

    return unsubscribe;
    //항상 실행 x, collection에 변화가 생길때만 실행
  }, [collection, transaction]);

  return { documents, error };
};
