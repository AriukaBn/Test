import React, { useEffect, useState } from "react";
import { MailOutlined, KeyOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

const Login = () => {
  const [email, emailupdate] = useState("");
  const [password, passwordupdate] = useState("");

  const usenavigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const loginFunction = (e) => {
    e.preventDefault();
    if (validate()) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          usenavigate("/");
          localStorage.setItem("token", user.accessToken);
          localStorage.setItem("user", JSON.stringify(user));
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
  };
  const validate = () => {
    let result = true;
    if (email === "" || email === null) {
      result = false;
      toast("Please enter your email");
    }
    if (password === "" || password === null) {
      result = false;
      toast("Please enter your password");
    }
    return result;
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
      <section>
        <div className="from-box">
          <div className="from-value">
            <form>
              <h2>Login</h2>
              <div className="inputbox">
                <MailOutlined />
                <input
                  type="text"
                  onChange={(e) => emailupdate(e.target.value)}
                  placeholder="Email"
                />
                <label htmlFor="username">Email</label>
              </div>
              <div className="inputbox">
                <KeyOutlined />
                <input
                  type="password"
                  onChange={(e) => passwordupdate(e.target.value)}
                  placeholder="Password"
                />
                <label htmlFor="password">Password</label>
              </div>
              <div class="Forget">
                <p>
                  Forgot<Link to="/Reset"> password or username</Link>
                </p>
              </div>
              <button type="submit" className="Login" onClick={loginFunction}>
                Login
              </button>
              <div className="register">
                <p>
                  Don't have account <Link to={"/Signup"}>New User</Link>{" "}
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Login;
