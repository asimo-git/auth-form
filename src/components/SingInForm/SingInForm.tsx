import styles from "./SingInForm.module.css";
import { Button } from "antd";
import { Input, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLogin } from "../../hooks/useLogin";
const { Title, Text } = Typography;

export default function SingInForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();

  const handleSubmit = () => {
    loginMutation.mutate({ email, password });
  };

  useEffect(() => {
    if (
      loginMutation.isError &&
      loginMutation.error.message === "2FA required"
    ) {
      onSuccess();
    }
  }, [loginMutation.isError, loginMutation.error, onSuccess]);

  return (
    <>
      <div className={styles.message}>
        <Title level={3}>Sign in to your account to continue</Title>
      </div>
      <form className={styles.form}>
        <Input
          size="large"
          placeholder="Email"
          prefix={<UserOutlined style={{ color: "rgba(0, 0, 0, 0.45)" }} />}
          className={styles.input}
          onChange={(e) => {
            setEmail(e.target.value);
            if (loginMutation.isError) loginMutation.reset();
          }}
        ></Input>
        <Input.Password
          size="large"
          placeholder="Password"
          prefix={<LockOutlined style={{ color: "rgba(0, 0, 0, 0.45)" }} />}
          className={styles.input}
          onChange={(e) => {
            setPassword(e.target.value);
            if (loginMutation.isError) loginMutation.reset();
          }}
        ></Input.Password>
        {loginMutation.isError && (
          <Text type="danger" className={styles.errorMessage}>
            {loginMutation.error.message}
          </Text>
        )}
        <Button
          size="large"
          type="primary"
          className={styles.button}
          onClick={handleSubmit}
          loading={loginMutation.isPending}
          disabled={!email || !password}
        >
          Log in
        </Button>
      </form>
    </>
  );
}
