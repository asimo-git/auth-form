import styles from "./CodeForm.module.css";
import { Button } from "antd";
import { Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import OTPInput from "../OTPInput/OTPInput";
const { Title, Text } = Typography;

export default function CodeForm({ onBack }: { onBack: () => void }) {
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
        <OTPInput />
        <Button size="large" type="primary" className={styles.button}>
          Continue
        </Button>
      </form>
    </>
  );
}
