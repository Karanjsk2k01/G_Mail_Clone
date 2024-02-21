import { useEffect, useState } from "react";
import { auth, db } from "../../Backend/firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";

const useGetEmails = () => {
  const [emails, setEmails] = useState([]);
  const [unreadEmail, setUnreadEmails] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;

      const userDocRef = doc(db, 'users', userId);
      const emailCollectionRef = collection(userDocRef, 'emails');
      const unreademailCollectionRef = collection(userDocRef, 'unreadEmails');

      // Subscribe to email collection changes
      const unsubscribeEmails = onSnapshot(emailCollectionRef, (snap) => {
        const fetchedEmails = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEmails(fetchedEmails);
      });

      // Subscribe to unread email collection changes
      const unsubscribeUnreadEmails = onSnapshot(unreademailCollectionRef, (snap) => {
        const fetchedUnreadEmails = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUnreadEmails(fetchedUnreadEmails);
      });

      // Unsubscribe functions
      return () => {
        unsubscribeEmails();
        unsubscribeUnreadEmails();
      };
    }
  }, []);

  return [emails, unreadEmail]; // Return both emails and unread emails
};

export default useGetEmails;
