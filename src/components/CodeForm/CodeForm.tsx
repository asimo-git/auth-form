import styles from "./CodeForm.module.css";
import { Button } from "antd";
import { Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import OTPInput from "../OTPInput/OTPInput";
import { useVerify2FA } from "../../hooks/useVerify2FA";
import { useState } from "react";
const { Title, Text } = Typography;

export default function CodeForm({ onBack }: { onBack: () => void }) {
  const [code, setCode] = useState("");

  const verifyMutation = useVerify2FA();

  const handleSubmit = () => {
    verifyMutation.mutate({ code });
  };

  return (
    <>
      <Button
        size="large"
        type="text"
        className={styles.backButton}
        onClick={onBack}
      >
        <ArrowLeftOutlined />
      </Button>
      <div className={styles.message}>
        <Title level={3}>Two-Factor Authentication</Title>
        <Text>Enter the 6-digit code from the Google Authenticator app</Text>
      </div>
      <form className={styles.form}>
        <OTPInput onComplete={(value) => setCode(value)} />
        {verifyMutation.isError && (
          <Text type="danger" className={styles.errorMessage}>
            {verifyMutation.error.message}
          </Text>
        )}
        <Button
          size="large"
          type="primary"
          className={styles.button}
          onClick={handleSubmit}
          loading={verifyMutation.isPending}
        >
          Continue
        </Button>
      </form>
    </>
  );
}
