import { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ref, set, getDatabase } from "firebase/database";
import "./Signup.css";

const Signup = () => {
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState(0);
  const [uid, setUid] = useState("");
  const [error, setError] = useState(null);
  const [displayError, setDisplayError] = useState("");
  const navigate = useNavigate();

  //Initializing firebase auth
  const auth = getAuth();

  const submitHandler = async (event) => {
    event.preventDefault();

    //using createUserWithEmailAndPassword function for authentication

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signupEmail,
        signupPassword
      );
      //user signed in
      const user = userCredential.user;
      console.log(user);
      setUid(user.uid);
    } catch (error) {
      console.error(error.code);
      setError(error.code);
    }

    const db = getDatabase();
    const uidRef = ref(db, `IMDbData/${auth.currentUser.uid}/${uid}`);
    await set(uidRef, uid);
  };
  useEffect(() => {
    if (error === "auth/email-already-in-use") {
      setDisplayError("user already exists");
    } else if (error === "auth/invalid-email") {
      setDisplayError("Invalid Email");
    } else if (error === "auth/weak-password") {
      setDisplayError("Weak Password");
    } else if (error === "auth/missing-email") {
      setDisplayError("Enter email");
    }
  }, [error, auth.currentUser, uid]);
  useEffect(() => {
    if (uid) {
      navigate("/");
    }
  }, [uid]);

  const emailHandler = (event) => {
    setSignupEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setSignupPassword(event.target.value);
  };

  return (
    <>
      {error !== null ? (
        <p className="signup_error">{displayError}</p>
      ) : undefined}

      <form onSubmit={submitHandler} className="signup_form">
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your Email id"
            onChange={emailHandler}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="At least 6 characters long"
            onChange={passwordHandler}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      <div className="not_user">
        <p>Already a user? </p>
        <Link to="/login">Login</Link>
      </div>
    </>
  );
};

export default Signup;
