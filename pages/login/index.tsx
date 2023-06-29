import { useState, FormEvent } from "react";
import styles from "./login.module.scss";
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push('/home');
    localStorage.setItem('isAuth' , 'true')
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.loginHeader}>MANAGE COURSES</h1>
        <h2 className={styles.loginSubHeader}>SIGN IN</h2>
        <p className={styles.loginText}>Enter your credentials to access your account</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="Enter your email"
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className={styles.button} disabled={password.length < 1 || email.length < 1}>
            SIGN IN
          </button>
          <p className={styles.forgotPassword}>
            Forgot your password? <a>Reset Password</a>
          </p>
        </form>
      </div>
    </div>
  );
}
