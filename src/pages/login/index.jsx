import React, { useState } from "react";
import Background from "../../images/background.jpg";
import styles from "../../styles/login.module.css";
import Link from "next/link";
// import Image from "next/image";
import { useRouter } from "next/router";
import Button from "@/components/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const userData = await response.json();
      localStorage.setItem("userData", JSON.stringify(userData));
      router.push("/dashboard")
      // Login successful, navigate to dashboard or perform other actions
      console.log("Login successful");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h1>Login</h1>
        {error && <div className={styles.error}>{error}</div>}
        <form className={styles.form} onSubmit={handleLogin}>
          <label>Email</label>
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit"  variant="main" > Sign In
          </Button>
          <div className={styles.forget}>
            <Link href="/forgotpassword">Forgot your password?</Link>
          </div>
          <div className={styles.signup}>
            <Link href="/signup">
              Don't have an account? <span>SignUp</span>
            </Link>
          </div>
        </form>
      </div>
      {/* <div className={styles.imgWrapper}>
        <Image src={'/assets/background.jpg'} className={styles.img} alt="login image" sizes="60vw" style={{width:"60vw",height:"100vh",
        objectFit: "cover"
        }} priority/>
      </div> */}
    </div>
  );
};

export default Login;
