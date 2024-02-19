import { useEffect, useState } from "react";
import { auth, db } from "../../Backend/firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";

const useGetEmails = () => {

  const [emails, setEmails] = useState([]);

  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const userId = user.uid;

      const userDocRef = doc(db, 'users', userId)

      const emailCollectionRef = collection(userDocRef, 'emails');

      const unsubscribe = onSnapshot(emailCollectionRef, (snap) => {
        const fetchedEmail = [];

        snap.forEach((doc) => {
          fetchedEmail.push({
            id: doc.id,
            ...doc.data()
          })
        })

        setEmails(fetchedEmail);
      })

      return (() => {
        unsubscribe();
      })
    }
  }, [])

  return emails || [];
}


export default useGetEmails;