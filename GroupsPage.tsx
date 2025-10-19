import React from "react";
import { useLocation } from "wouter";
import { MobileHeader } from "@/components/MobileHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks";

export const GroupsPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const groups = useAppSelector((state) => state.groups.groups);
  const students = useAppSelector((state) => state.students.students);

  const getStudentCount = (groupId: string) => {
    const group = groups.find(g => g.id === groupId);
    return group?.studentIds.length || 0;
  };

  const getGroupStudents = (groupId: string) => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return [];
    
    return students.filter(student => 
      group.studentIds.includes(student.id)
    );
  };

  return (
    <div className="bg-[#ffffff] w-full min-w-[375px] min-h-[812px] flex flex-col">
      <MobileHeader />

      <main className="flex flex-col items-start px-4 pt-[60px]">
        <div className="flex justify-between items-center w-full mb-6">
          <h1 className="[font-family:'Lab_Grotesque-Bold',Helvetica] font-bold text-blackstar text-3xl tracking-[-0.30px] leading-[normal]">
            Группы
          </h1>
          <div className="flex gap-2">
            <Button
              onClick={() => setLocation("/students")}
              variant="outline"
              className="rounded-[100px] [font-family:'Arial-Bold',Helvetica] font-bold text-sm px-4"
            >
              Ученики
            </Button>
            <Button
              onClick={() => setLocation("/groups/create")}
              className="bg-[#ba2135] hover:bg-[#a01d2e] rounded-[100px] [font-family:'Arial-Bold',Helvetica] font-bold text-[#ffffff] text-sm px-6"
            >
              + Создать
            </Button>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          {groups.length === 0 ? (
            <div className="text-center py-12 text-gray-5">
              <p className="[font-family:'Lab_Grotesque-Medium',Helvetica] font-medium text-base">
                Нет созданных групп
              </p>
              <p className="text-sm mt-2">Создайте первую группу</p>
            </div>
          ) : (
            groups.map((group) => {
              const groupStudents = getGroupStudents(group.id);
              return (
                <Card
                  key={group.id}
                  className="p-4 bg-gray-2 border-0 rounded-xl cursor-pointer hover:bg-gray-4 transition-colors"
                >
                  <h3 className="[font-family:'Lab_Grotesque-Bold',Helvetica] font-bold text-blackstar text-lg">
                    {group.name}
                  </h3>
                  {group.description && (
                    <p className="[font-family:'Lab_Grotesque-Medium',Helvetica] font-medium text-gray-5 text-sm mt-1">
                      {group.description}
                    </p>
                  )}
                  <p className="text-gray-5 text-xs mt-2">
                    Учеников: {getStudentCount(group.id)}
                  </p>
                  {groupStudents.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-4">
                      <p className="text-xs text-gray-5 mb-1">Список:</p>
                      {groupStudents.map((student, idx) => (
                        <p key={student.id} className="text-xs text-blackstar">
                          {idx + 1}. {student.firstName} {student.lastName}
                        </p>
                      ))}
                    </div>
                  )}
                </Card>
              );
            })
          )}
        </div>

        <Button
          onClick={() => setLocation("/")}
          variant="outline"
          className="w-full max-w-[343px] mt-6 rounded-xl border-gray-4"
        >
          Назад к регистрации
        </Button>
      </main>
    </div>
  );
};
