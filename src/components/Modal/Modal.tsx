import styles from "./Modal.module.css";
import { Button } from "antd";
import { Input, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
const { Title } = Typography;

export default function Modal() {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.logo}>
          <img src="./logo.png"></img>
        </div>
        <div className={styles.message}>
          <Title level={3}>Sign in to your account to continue</Title>
        </div>
        <form className={styles.form}>
          <Input
            size="large"
            placeholder="Email"
            prefix={<UserOutlined style={{ color: "rgba(0, 0, 0, 0.45)" }} />}
            className={styles.input}
          ></Input>
          <Input.Password
            size="large"
            placeholder="Password"
            prefix={<LockOutlined style={{ color: "rgba(0, 0, 0, 0.45)" }} />}
            className={styles.input}
          ></Input.Password>
          <Button
            size="large"
            type="primary"
            className={styles.button}
            disabled
          >
            Log in
          </Button>
        </form>
      </div>
    </>
  );
}
