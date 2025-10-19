import React, { useState } from "react";
import { useLocation } from "wouter";
import { MobileHeader } from "@/components/MobileHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch } from "@/store/hooks";
import { addGroup } from "@/store/slices/groupsSlice";
import { useToast } from "@/hooks/use-toast";

export const CreateGroupPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите название группы",
        variant: "destructive",
      });
      return;
    }

    dispatch(addGroup({
      name: name.trim(),
      description: description.trim(),
      studentIds: [],
    }));

    toast({
      title: "Успешно",
      description: "Группа создана",
    });

    setLocation("/groups");
  };

  return (
    <div className="bg-[#ffffff] w-full min-w-[375px] min-h-[812px] flex flex-col">
      <MobileHeader />

      <main className="flex flex-col items-start px-4 pt-[60px]">
        <h1 className="[font-family:'Lab_Grotesque-Bold',Helvetica] font-bold text-blackstar text-3xl tracking-[-0.30px] leading-[normal] mb-6">
          Создание группы
        </h1>

        <form onSubmit={handleSubmit} className="w-full max-w-[343px] flex flex-col gap-4">
          <div>
            <label className="[font-family:'Lab_Grotesque-Medium',Helvetica] font-medium text-sm text-blackstar mb-2 block">
              Название группы *
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите название"
              className="w-full h-[58px] bg-gray-2 border-0 rounded-xl px-4 [font-family:'Lab_Grotesque-Medium',Helvetica] font-medium text-blackstar text-sm placeholder:text-gray-5"
            />
          </div>

          <div>
            <label className="[font-family:'Lab_Grotesque-Medium',Helvetica] font-medium text-sm text-blackstar mb-2 block">
              Описание
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Введите описание группы"
              className="w-full min-h-[100px] bg-gray-2 border-0 rounded-xl px-4 py-3 [font-family:'Lab_Grotesque-Medium',Helvetica] font-medium text-blackstar text-sm placeholder:text-gray-5 resize-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-[60px] mt-4 bg-[#ba2135] hover:bg-[#a01d2e] rounded-[100px] [font-family:'Arial-Bold',Helvetica] font-bold text-[#ffffff] text-base tracking-[-0.32px] leading-[22px] shadow-BG-blur-80"
          >
            Создать группу
          </Button>

          <Button
            type="button"
            onClick={() => setLocation("/groups")}
            variant="outline"
            className="w-full h-[60px] rounded-xl border-gray-4"
          >
            Отмена
          </Button>
        </form>
      </main>
    </div>
  );
};
