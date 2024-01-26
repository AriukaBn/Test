import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase-config";
import Add from "../img/addAvatar.png";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const [err, setErr] = useState(false);
  const [displayName, idchange] = useState("");
  const [password, passwordchange] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const [file, setfile] = useState();

  const navigate = useNavigate();

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "Please enter the value in ";
    if (displayName === null || displayName === "") {
      isproceed = false;
      errormessage += " Username";
    }
    if (password === null || password === "") {
      isproceed = false;
      errormessage += " Password";
    }
    if (email === null || email === "") {
      isproceed = false;
      errormessage += " Email";
    }
    if (phone === null || phone === "") {
      isproceed = false;
      errormessage += " Phone";
    }

    if (!isproceed) {
      toast.warning(errormessage);
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        isproceed = false;
        toast.warning("Please enter the valid email");
      }
    }
    return isproceed;
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(file);
    try {
      const res = createUserWithEmailAndPassword(auth, email, password);
      let regobj = { displayName, password, email, phone };

      if (IsValidate()) {
        //console.log(regobj);
        res
          .then(async (userCredential) => {
            const user = userCredential.user;
            console.log(user);
            localStorage.setItem("token", user.accessToken);
            localStorage.setItem("user", JSON.stringify(user));
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);
            //const uploadTask = uploadBytesResumable(storageRef, file);

            await uploadBytesResumable(storageRef, file[0]).then(() => {
              getDownloadURL(storageRef).then(async (downloadURL) => {
                try {
                  //Update profile
                  await updateProfile(user, {
                    displayName,
                    phone,
                    photoURL: downloadURL,
                  });
                  //create user on firestore
                  await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    displayName,
                    email,
                    password,
                    phone,
                    photoURL: downloadURL,
                  });

                  //create empty user chats on firestore
                  await setDoc(doc(db, "userChats", user.uid), {});
                  navigate("/");
                } catch (err) {
                  console.log(err);
                  setErr(true);
                }
              });
            });
            toast.success("Registered successfully.");
            navigate("/");
          })
          .catch((err) => {
            toast.error("Failed :" + err.message);
          });
      }
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handlesubmit}>
          <div className="card">
            <div className="card-header">
              <h1>User Registeration</h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      User Name <span className="errmsg">*</span>
                    </label>
                    <input
                      value={displayName}
                      onChange={(e) => idchange(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Password <span className="errmsg">*</span>
                    </label>
                    <input
                      value={password}
                      onChange={(e) => passwordchange(e.target.value)}
                      type="password"
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Email <span className="errmsg">*</span>
                    </label>
                    <input
                      value={email}
                      onChange={(e) => emailchange(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Phone <span className="errmsg"></span>
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => phonechange(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <input
                  required
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  onChange={(e) => setfile(e.target.files)}
                />
                <label htmlFor="file">
                  <img src={Add} alt="" />
                  <span>Add an avatar</span>
                </label>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Signup
              </button>
              <Link to={"/login"} className="btn btn-danger">
                Close
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
