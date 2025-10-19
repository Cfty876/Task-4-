import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export const RegisterPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const registerMutation = useMutation({
    mutationFn: async (data: {
      firstName: string;
      lastName: string;
      phone: string;
      password: string;
    }) => {
      const res = await apiRequest("POST", "/api/auth/register", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Успешно",
        description: "Регистрация завершена",
      });
      setTimeout(() => setLocation("/courses"), 1000);
    },
    onError: (error: any) => {
      toast({
        title: "Ошибка",
        description: error.message || "Ошибка регистрации",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !phone || !password) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }

    registerMutation.mutate({ firstName, lastName, phone, password });
  };

  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[343px] flex flex-col">
        <h1 className="text-[30px] font-bold text-[#333333] mb-8 leading-[36px] tracking-[-0.01em]">
          Регистрация
        </h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col">
          <div className="flex flex-col gap-2 mb-6">
            <Input
              type="text"
              placeholder="Имя"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full h-[58px] bg-[#f0f0f0] border-0 rounded-xl px-4 text-[#333333] text-[14px] placeholder:text-[#979797]"
              data-testid="input-firstName"
            />
            <Input
              type="text"
              placeholder="Фамилия"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full h-[58px] bg-[#f0f0f0] border-0 rounded-xl px-4 text-[#333333] text-[14px] placeholder:text-[#979797]"
              data-testid="input-lastName"
            />
            <Input
              type="tel"
              placeholder="Номер телефона"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-[58px] bg-[#f0f0f0] border-0 rounded-xl px-4 text-[#333333] text-[14px] placeholder:text-[#979797]"
              data-testid="input-phone"
            />
            <Input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[58px] bg-[#f0f0f0] border-0 rounded-xl px-4 text-[#333333] text-[14px] placeholder:text-[#979797]"
              data-testid="input-password"
            />
          </div>

          <Button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full h-[60px] bg-[#ba2135] hover:bg-[#a01d2e] rounded-[100px] font-bold text-white text-[16px] mb-4"
            data-testid="button-register"
          >
            {registerMutation.isPending ? "Регистрация..." : "Зарегистрироваться"}
          </Button>

          <div className="text-center">
            <span className="text-[16px] text-[#979797] font-medium">Уже есть аккаунт? </span>
            <button
              type="button"
              onClick={() => setLocation("/login")}
              className="text-[16px] text-[#333333] font-medium hover:text-[#ba2135] transition-colors"
              data-testid="link-login"
            >
              Вход
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
