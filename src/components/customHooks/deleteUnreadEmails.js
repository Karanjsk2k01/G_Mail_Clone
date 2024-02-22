import { auth, db } from "../../Backend/firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";

const useUnReadDeleteEmails = () => {


  const unreadDeleteMail = async (id) => {

    const emailValue = id;
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;

      const userDocRef = doc(db, 'users', userId);

      const singleEmailRef = doc(userDocRef, 'unreadEmails', emailValue)

      const getEmail = await getDoc(singleEmailRef);

      if (getEmail.exists()) {
        await deleteDoc(singleEmailRef);
        console.log('deleted successfully!!')
      }

    }
    else {
      return
    }
  }

  return { unreadDeleteMail }

}

export default useUnReadDeleteEmails;