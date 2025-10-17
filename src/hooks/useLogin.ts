import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

interface LoginData {
  email: string;
  password: string;
}

export function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginData) => {
      // имитация сетевой задержки
      await new Promise((r) => setTimeout(r, 900));

      const { email, password } = data;

      if (!email.includes("a") || !password.includes("a")) {
        throw Object.assign(new Error("Invalid email or password"), {
          status: 400,
        });
      }

      // 🔹 случайная ошибка сервера
      if (Math.random() < 0.1) {
        throw Object.assign(new Error("Server error"), {
          status: 500,
        });
      }

      throw Object.assign(new Error("2FA required"), {
        status: 202,
        tempToken: "temp-xyz-123",
      });

      //   return {
      //     status: 200,
      //     message: "Login successful",
      //     token: "auth-abc-999",
      //   };
    },

    // для статуса 200:
    //  onSuccess: (data) => {
    //   message.success("Вход выполнен успешно!");
    //   console.log("Токен:", data.token);
    // },

    onError: (error) => {
      switch ((error as Error & { status: number }).status) {
        case 400:
          message.error("Неверный логин или пароль");
          break;
        case 401:
          message.error("Неверный код 2FA");
          break;
        case 403:
          message.error("Аккаунт заблокирован");
          break;
        case 429:
          message.warning("Слишком много попыток. Попробуй позже");
          break;
        case 500:
          message.error("Ошибка сервера. Повтори позже");
          break;
        default:
          message.error("Неизвестная ошибка");
      }
    },
  });
}
