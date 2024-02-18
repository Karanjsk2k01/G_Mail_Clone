function extractNameFromEmail(email) {


  const name = email.split('@')[0];
  return name;
}


export default extractNameFromEmail;