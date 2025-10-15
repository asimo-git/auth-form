import styles from "./OTPInput.module.css";
import { useState, useRef, useEffect } from "react";
import { Input } from "antd";

interface OTPInputProps {
  length?: number;
  onComplete?: (code: string) => void;
  disabled?: boolean;
}

export default function OTPInput({
  length = 6,
  onComplete,
  disabled = false,
}: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (value: string, index: number) => {
    const sanitizedValue = value.replace(/[^0-9]/g, "");

    if (sanitizedValue.length === 0) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    if (sanitizedValue.length > 1) {
      handlePaste(sanitizedValue, index);
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = sanitizedValue;
    setOtp(newOtp);

    if (sanitizedValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (index === length - 1 && newOtp.every((digit) => digit !== "")) {
      const code = newOtp.join("");
      onComplete?.(code);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();

      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }

    if (e.key === "Enter" && otp.every((digit) => digit !== "")) {
      const code = otp.join("");
      onComplete?.(code);
    }
  };

  const handlePaste = (pastedData: string, startIndex = 0) => {
    const digits = pastedData.replace(/[^0-9]/g, "").split("");
    const newOtp = [...otp];

    digits.forEach((digit, i) => {
      const targetIndex = startIndex + i;
      if (targetIndex < length) {
        newOtp[targetIndex] = digit;
      }
    });

    setOtp(newOtp);

    const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
    const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;

    inputRefs.current[focusIndex]?.focus();

    if (newOtp.every((digit) => digit !== "")) {
      const code = newOtp.join("");
      onComplete?.(code);
    }
  };

  const handleFocus = (index: number) => {
    inputRefs.current[index]?.select();
  };

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {otp.map((digit, index) => (
        <Input
          key={index}
          className={styles.input}
          ref={(el) => {
            inputRefs.current[index] = el?.input ?? null;
          }}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={() => handleFocus(index)}
          onPaste={(e) => {
            e.preventDefault();
            const pastedData = e.clipboardData.getData("text");
            handlePaste(pastedData, index);
          }}
          maxLength={1}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
