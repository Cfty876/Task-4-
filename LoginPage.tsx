import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export const LoginPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: async (data: { phone: string; password: string }) => {
      const res = await apiRequest("POST", "/api/auth/login", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Успешно",
        description: "Вход выполнен",
      });
      setLocation("/courses");
    },
    onError: (error: any) => {
      toast({
        title: "Ошибка",
        description: error.message || "Неверный телефон или пароль",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || !password) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }

    loginMutation.mutate({ phone, password });
  };

  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[343px] flex flex-col">
        <h1 className="text-[30px] font-bold text-[#333333] mb-8 leading-[36px] tracking-[-0.01em]">
          Вход
        </h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col">
          <div className="flex flex-col gap-2 mb-6">
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
            disabled={loginMutation.isPending}
            className="w-full h-[60px] bg-[#ba2135] hover:bg-[#a01d2e] rounded-[100px] font-bold text-white text-[16px] mb-4"
            data-testid="button-login"
          >
            {loginMutation.isPending ? "Вход..." : "Войти"}
          </Button>

          <div className="text-center">
            <span className="text-[16px] text-[#979797] font-medium">Еще нет аккаунта? </span>
            <button
              type="button"
              onClick={() => setLocation("/register")}
              className="text-[16px] text-[#333333] font-medium hover:text-[#ba2135] transition-colors"
              data-testid="link-register"
            >
              Регистрация
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
