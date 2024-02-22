import { useNavigate } from "react-router-dom";
import { auth, db } from "../../Backend/firebase";
import { useSelector } from "react-redux";
import { deleteDoc, doc, getDoc } from "firebase/firestore";

const useDeleteEmails = () => {

  const navigate = useNavigate();
  const emailValue = useSelector(state => state.compose.selectMail)

  const deleteMail = async () => {
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;

      const userDocRef = doc(db, 'users', userId);

      const singleEmailRef = doc(userDocRef, 'emails', emailValue.id)

      const getEmail = await getDoc(singleEmailRef)

      if (getEmail.exists()) {

        navigate('/')

        await deleteDoc(singleEmailRef);

      }

    }
    else {
      return
    }
  }

  return { deleteMail }

}

export default useDeleteEmails;