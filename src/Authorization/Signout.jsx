import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Signout.css";

const auth = getAuth();

const Signout = () => {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    if (auth.currentUser) {
      try {
        await signOut(auth);
        console.log("User is signed out");
        navigate("/");
      } catch (error) {
        console.error(error.code, error.message);
      }
    } else {
      console.log("No user is signed in");
    }
  };

  const browsingHandler = () => {
    navigate("/");
  };
  return (
    <>
      <div className="signout">
        <p> Are you sure?</p>
        <div>
          <button onClick={logoutHandler}>logout</button>
          <button onClick={browsingHandler}>continue browsing</button>
        </div>
      </div>
    </>
  );
};

export default Signout;
