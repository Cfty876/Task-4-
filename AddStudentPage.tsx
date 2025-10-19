import React, { useState } from "react";
import { useLocation } from "wouter";
import { MobileHeader } from "@/components/MobileHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addStudent } from "@/store/slices/studentsSlice";
import { addStudentToGroup } from "@/store/slices/groupsSlice";
import { useToast } from "@/hooks/use-toast";

export const AddStudentPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const groups = useAppSelector((state) => state.groups.groups);
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim() || !lastName.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите имя и фамилию",
        variant: "destructive",
      });
      return;
    }

    const studentId = `student-${Date.now()}`;
    
    dispatch(addStudent({
      id: studentId,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      email: email.trim(),
    }));

    if (selectedGroupId) {
      dispatch(addStudentToGroup({
        groupId: selectedGroupId,
        studentId: studentId,
      }));
    }

    toast({
      title: "Успешно",
      description: selectedGroupId 
        ? "Ученик добавлен в группу" 
        : "Ученик добавлен",
    });

    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setSelectedGroupId("");
  };

  return (
    <div className="bg-[#ffffff] w-full min-w-[375px] min-h-[812px] flex flex-col">
      <MobileHeader />

      <main className="flex flex-col items-start px-4 pt-[60px]">
        <h1 className="[font-family:'Lab_Grotesque-Bold',Helvetica] font-bold text-blackstar text-3xl tracking-[-0.30px] leading-[normal] mb-6">
          Добавление ученика
        </h1>

        <form onSubmit={handleSubmit} className="w-full max-w-[343px] flex flex-col gap-4">
          <div>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Имя *"
              className="w-full h-[58px] bg-gray-2 border-0 rounded-xl px-4 [font-family:'Lab_Grotesque-Medium',Helvetica] font-medium text-blackstar text-sm placeholder:text-gray-5"
            />
          </div>

          <div>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Фамилия *"
              className="w-full h-[58px] bg-gray-2 border-0 rounded-xl px-4 [font-family:'Lab_Grotesque-Medium',Helvetica] font-medium text-blackstar text-sm placeholder:text-gray-5"
            />
          </div>

          <div>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Номер телефона"
              type="tel"
              className="w-full h-[58px] bg-gray-2 border-0 rounded-xl px-4 [font-family:'Lab_Grotesque-Medium',Helvetica] font-medium text-blackstar text-sm placeholder:text-gray-5"
            />
          </div>

          <div>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="w-full h-[58px] bg-gray-2 border-0 rounded-xl px-4 [font-family:'Lab_Grotesque-Medium',Helvetica] font-medium text-blackstar text-sm placeholder:text-gray-5"
            />
          </div>

          <div>
            <label className="[font-family:'Lab_Grotesque-Medium',Helvetica] font-medium text-sm text-blackstar mb-2 block">
              Группа (опционально)
            </label>
            <Select value={selectedGroupId} onValueChange={setSelectedGroupId}>
              <SelectTrigger className="w-full h-[58px] bg-gray-2 border-0 rounded-xl px-4 [font-family:'Lab_Grotesque-Medium',Helvetica] font-medium text-blackstar text-sm">
                <SelectValue placeholder="Выберите группу" />
              </SelectTrigger>
              <SelectContent>
                {groups.length === 0 ? (
                  <SelectItem value="none" disabled>Нет доступных групп</SelectItem>
                ) : (
                  groups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full h-[60px] mt-4 bg-[#ba2135] hover:bg-[#a01d2e] rounded-[100px] [font-family:'Arial-Bold',Helvetica] font-bold text-[#ffffff] text-base tracking-[-0.32px] leading-[22px] shadow-BG-blur-80"
          >
            Добавить ученика
          </Button>

          <Button
            type="button"
            onClick={() => setLocation("/groups")}
            variant="outline"
            className="w-full h-[60px] rounded-xl border-gray-4"
          >
            К списку групп
          </Button>
        </form>
      </main>
    </div>
  );
};
