import { useState, FormEvent } from "react";
import styles from "./login.module.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Perform login logic here
    console.log("Email:", email);
    console.log("Password:", password);

    // Reset form fields
    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.loginHeader}>MANAGE COURSES</h1>
        <h2 className={styles.loginSubHeader}>SIGN IN</h2>
        <h2 className={styles.loginText}>Enter your credentials to access your account</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
