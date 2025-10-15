import styles from "./Modal.module.css";
import { useState } from "react";
import SingInForm from "../SingInForm/SingInForm";
import CodeForm from "../CodeForm/CodeForm";

export default function Modal() {
  const [form, setForm] = useState<"login" | "code">("login");

  const handleLoginSuccess = () => {
    setForm("code");
  };

  const handleBack = () => {
    setForm("login");
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.logo}>
          <img src="./logo.png"></img>
        </div>

        {form === "login" ? (
          <SingInForm onSuccess={handleLoginSuccess} />
        ) : (
          <CodeForm onBack={handleBack} />
        )}
      </div>
    </>
  );
}
