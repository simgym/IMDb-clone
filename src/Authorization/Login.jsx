import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState(0);
  const [error, setError] = useState(null);
  const [displayError, setDisplayError] = useState("");

  //Initializing firebase auth
  const auth = getAuth();

  const submitHandler = async (event) => {
    event.preventDefault();

    //using createUserWithEmailAndPassword function for authentication

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      //user signed in
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      console.error(error.code);
      setError(error.code);
    }
  };
  useEffect(() => {
    if (error === "auth/invalid-login-credentials") {
      setDisplayError("Invalid login credentials");
    } else if (error === "auth/invalid-email") {
      setDisplayError("Invalid Email");
    }
  }, [error]);

  const emailHandler = (event) => {
    setLoginEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setLoginPassword(event.target.value);
  };

  return (
    <>
      {error !== null ? (
        <p className="login_error">{displayError}</p>
      ) : undefined}
      <form onSubmit={submitHandler} className="login_form">
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
      <div className="create_account">
        <p>Create an account</p>
        <Link to="/signup">Signup</Link>
      </div>
    </>
  );
};

export default Login;
