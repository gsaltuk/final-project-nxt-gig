import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebase } from "./firebase-config";

const db = getFirestore(firebase);

const useLoggedInUser = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(firebase);

    const colRef = collection(db, "users");
    const q = query(colRef, where("uid", "==", auth.currentUser.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        const userData = { id: doc.id, ...doc.data() };
        setLoggedInUser(userData);
      });
    });

    return () => unsubscribe();
  }, []);

  return loggedInUser;
};

export default useLoggedInUser;
