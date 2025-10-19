import React, { useState } from "react";
import { useLocation } from "wouter";
import { MobileHeader } from "@/components/MobileHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const inputFields = [
  { placeholder: "Имя", type: "text" as const },
  { placeholder: "Фамилия", type: "text" as const },
  { placeholder: "Номер телефона", type: "tel" as const },
  { placeholder: "Пароль", type: "password" as const },
];

export const Screen = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
  });

  const handleInputChange = (index: number, value: string) => {
    const keys = ["firstName", "lastName", "phone", "password"] as const;
    setFormData(prev => ({
      ...prev,
      [keys[index]]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.password) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Успешно",
      description: "Регистрация завершена",
    });

    setTimeout(() => setLocation("/groups"), 1000);
  };

  return (
    <div className="bg-[#ffffff] w-full min-w-[375px] min-h-[812px] flex flex-col">
      <MobileHeader />

      <main className="flex flex-col items-start px-4 pt-[60px]">
        <h1 className="z-[1] w-[199px] h-9 [font-family:'Lab_Grotesque-Bold',Helvetica] font-bold text-blackstar text-3xl tracking-[-0.30px] leading-[normal] whitespace-nowrap mb-4">
          Регистрация
        </h1>

        <form onSubmit={handleSubmit} className="w-full max-w-[343px]">
          <div className="inline-flex z-[2] w-full flex-col items-start gap-2">
            {inputFields.map((field, index) => (
              <div key={index} className="w-full">
                <Input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={Object.values(formData)[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="w-full h-[58px] bg-gray-2 border-0 rounded-xl px-4 [font-family:'Lab_Grotesque-Medium',Helvetica] font-medium text-blackstar text-sm placeholder:text-gray-5"
                />
              </div>
            ))}
          </div>

          <Button
            type="submit"
            className="z-[4] w-full h-[60px] mt-4 bg-[#ba2135] hover:bg-[#a01d2e] rounded-[100px] [font-family:'Arial-Bold',Helvetica] font-bold text-[#ffffff] text-base tracking-[-0.32px] leading-[22px] shadow-BG-blur-80"
          >
            Зарегистрироваться
          </Button>

          <div className="flex items-center justify-center z-[3] w-full h-12 mt-4 [font-family:'Lab_Grotesque-Medium',Helvetica] font-normal text-base text-center tracking-[0] leading-6">
            <span className="font-medium text-[#979797]">Уже есть аккаунт?</span>
            <span className="font-medium text-[#191919]"> </span>
            <button
              type="button"
              onClick={() => setLocation("/groups")}
              className="font-medium text-[#333333] hover:text-[#ba2135] transition-colors"
            >
              Вход
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
