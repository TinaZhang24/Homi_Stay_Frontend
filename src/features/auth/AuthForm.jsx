import { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "./authSlice";
import { useNavigate } from "react-router-dom";

/** Authform allows user to login OR register
 *
 */
function AuthForm() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const authAction = isLogin ? "Login" : "Register";
  const altCopy = isLogin
    ? "Need an account? Register here."
    : "Already have an account?  Login here.";
  console.log(altCopy);
  const [login, { error: loginError }] = useLoginMutation();
  const [register, { error: registerError }] = useRegisterMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const attemptAuth = async (event) => {
    event.preventDefault();

    const authMethod = isLogin ? login : register;
    const credentials = { name, email, password };

    try {
      await authMethod(credentials).unwrap();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>{authAction}</h1>
      <form onSubmit={attemptAuth}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        {/* <label>
          isAdmin:
          <input
            type="boolean"
            value={isAdmin}
            onChange={(event) => setIsadmin(event.target.value)}
          />
        </label> */}
        <button>{authAction}</button>
      </form>
      <a href="#" onClick={() => setIsLogin(!isLogin)}>
        {altCopy}
      </a>
      {/* {isLogin && loginError && <p role="alert">{loginError.data}</p>}
      {!isLogin && registerError && <p role="alert">{registerError.data}</p>} */}
    </>
  );
}

export default AuthForm;
