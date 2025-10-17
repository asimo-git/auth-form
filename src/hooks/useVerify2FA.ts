import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

interface VerifyData {
  code: string;
}

export function useVerify2FA() {
  return useMutation({
    mutationFn: async (data: VerifyData) => {
      await new Promise((r) => setTimeout(r, 800));

      if (data.code === "111111") {
        return { status: 200, message: "2FA success", token: "auth-abc-999" };
      }

      throw Object.assign(new Error("Invalid 2FA code"), {
        status: 401,
      });
    },

    onSuccess: () => {
      message.success("Код подтверждён, вход выполнен!");
    },

    onError: (error) => {
      switch ((error as Error & { status: number }).status) {
        case 401:
          message.error("Неверный 2FA код");
          break;
        case 403:
          message.error("Аккаунт заблокирован");
          break;
        default:
          message.error("Ошибка при проверке 2FA");
      }
    },
  });
}
