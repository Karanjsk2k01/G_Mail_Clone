import { addDoc, collection, doc } from "firebase/firestore";
import { auth, db } from "../../Backend/firebase";
import getCurrentTimestamp from "../../Utils/getCurrentTimeStamp";

const useSentEmails = () => {
  const sendEmail = async (data) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const userDocRef = doc(db, 'users', userId);
        const emailCollectionRef = collection(userDocRef, 'emails');

        const docRef = await addDoc(emailCollectionRef, {
          to: data.to,
          subject: data.subject,
          message: data.message,
          timestamp: getCurrentTimestamp()
        });

        console.log("Document written with ID: ", docRef.id);
        return { success: true };
      } else {
        console.error("No user signed in");
        return { error: "No user signed in" };
      }
    } catch (error) {
      console.error("Error adding document: ", error);
      return { error: error.message };
    }
  };

  return { sendEmail };
}

export default useSentEmails;
