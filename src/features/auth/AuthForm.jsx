import { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "./authSlice";
import { useNavigate } from "react-router-dom";

/** Authform allows user to login OR register
 *
 */
function AuthForm() {
  //const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const authAction = isLogin ? "Login" : "Register";
  const altCopy = isLogin
    ? "Need an account? Register here."
    : "Already have an account?  Login here.";

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const attemptAuth = async (event) => {
    event.preventDefault();

    const authMethod = isLogin ? login : register;
    const credentials = { username, password };

    try {
      await authMethod(credentials).unwrap();
      /*navigate("/");*/
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>{authAction}</h1>
      <form onSubmit={attemptAuth}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button>{authAction}</button>
      </form>
      <a href="#" onClick={() => setIsLogin(!isLogin)}>
        {altCopy}
      </a>
    </>
  );
}

export default AuthForm;
