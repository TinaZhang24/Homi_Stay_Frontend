import { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "./authSlice";
import { useNavigate } from "react-router-dom";
import "./auth.css";

/** Authform allows user to login OR register */
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
      <div className="auth">
        <div className="authForm">
          <form onSubmit={attemptAuth}>
            <label>
              Name:
              <input
                type="text"
                value={name}
                className="inputbox"
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={email}
                className="inputbox"
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                className="inputbox"
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <button className="btn">{authAction}</button>
          </form>
          <a href="#" onClick={() => setIsLogin(!isLogin)}>
            {altCopy}
          </a>
        </div>
      </div>
    </>
  );
}

export default AuthForm;
