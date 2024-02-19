const getUserEmails = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const emailCollectionRef = collection(userDocRef, 'emails');

    // Query emails collection for the specific user
    const querySnapshot = await getDocs(emailCollectionRef);

    // Extract email data from the query snapshot
    const emails = [];
    querySnapshot.forEach((doc) => {
      emails.push({ id: doc.id, ...doc.data() });
    });

    return emails;
  } catch (error) {
    console.error("Error fetching user emails: ", error);
    return [];
  }
};


export default getUserEmails;