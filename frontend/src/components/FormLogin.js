import styles from "../assets/css/Login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEye, faEyeLowVision } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const FormLogin = ({ handleLoginError, tipe }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username) {
      setInvalidUsername("Username wajib diisi");
      return;
    } else if (!password) {
      setInvalidPassword("Password wajib diisi");
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { username, password };
    try {
      const user = await axios.post(`http://localhost:8000/login${tipe}`, data);
      const token = user.data.token;
      localStorage.setItem("token", token);
      navigate("/");
      setLoading(false);
    } catch (error) {
      handleLoginError(error.response.data.errors);
      // console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          <FontAwesomeIcon icon={faUser} />
        </span>
        <input
          required
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
            setInvalidUsername(false);
            handleLoginError(false);
          }}
          className={`form-control`}
          placeholder="Username"
          aria-label="Identifier"
          aria-describedby="basic-addon1"
        />
      </div>
      {invalidUsername && <p className={`${styles["invalid-text"]}`}>{invalidUsername}</p>}
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          <FontAwesomeIcon icon={faLock} />
        </span>
        <input
          required
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
            setInvalidPassword(false);
            handleLoginError(false);
          }}
          className={`form-control`}
          placeholder="Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
        />
      </div>
      {invalidPassword && <p className={`${styles["invalid-text"]}`}>{invalidPassword}</p>}
      {loading ? (
        <button disabled className={`btn ${styles["btn-login"]} px-4`}>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Login ...
        </button>
      ) : (
        <button onClick={handleLogin} className={`btn ${styles["btn-login"]} px-4`}>
          Login
        </button>
      )}
    </form>
  );
};

export default FormLogin;
