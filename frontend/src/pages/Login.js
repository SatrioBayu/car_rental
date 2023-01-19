import styles from "../assets/css/Login.module.css";
import { useState } from "react";
import FormLogin from "../components/FormLogin";
import { Link } from "react-router-dom";

const Login = ({ tipe }) => {
  const [loginError, setLoginError] = useState(false);

  return (
    <div className={`${styles["wrapper"]} ${styles["bg"]}`}>
      <div className={`${styles["isi"]} px-3 py-5`}>
        <h3 className={`fw-bold`}>PT. Tambang Freeport</h3>
        <p className={`${styles["secondary"]}`}>Login {tipe}</p>
        {loginError && (
          <div class="alert alert-danger" role="alert">
            {loginError}
          </div>
        )}
        <FormLogin tipe={tipe} handleLoginError={setLoginError} />
        {tipe == "Admin" && (
          <div className="mt-3">
            <Link to="/loginPenyetuju" className={`link-primary ${styles["underline"]}`}>
              Login Sebagai Penyetuju
            </Link>
          </div>
        )}
        {tipe == "Penyetuju" && (
          <div className="mt-3">
            <Link to="/loginAdmin" className={`link-primary ${styles["underline"]}`}>
              Login Sebagai Admin
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
