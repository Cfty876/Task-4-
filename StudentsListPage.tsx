import React from "react";
import { useLocation } from "wouter";
import { MobileHeader } from "@/components/MobileHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks";

export const StudentsListPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const students = useAppSelector((state) => state.students.students);
  const groups = useAppSelector((state) => state.groups.groups);

  const getStudentGroups = (studentId: string) => {
    return groups
      .filter(group => group.studentIds.includes(studentId))
      .map(group => group.name);
  };

  return (
    <div className="bg-[#ffffff] w-full min-w-[375px] min-h-[812px] flex flex-col">
      <MobileHeader />

      <main className="flex flex-col items-start px-4 pt-[60px]">
        <div className="flex justify-between items-center w-full mb-6">
          <h1 className="[font-family:'Lab_Grotesque-Bold',Helvetica] font-bold text-blackstar text-3xl tracking-[-0.30px] leading-[normal]">
            Все ученики
          </h1>
          <Button
            onClick={() => setLocation("/students/add")}
            className="bg-[#ba2135] hover:bg-[#a01d2e] rounded-[100px] [font-family:'Arial-Bold',Helvetica] font-bold text-[#ffffff] text-sm px-6"
          >
            + Добавить
          </Button>
        </div>

        <div className="w-full flex flex-col gap-3">
          {students.length === 0 ? (
            <div className="text-center py-12 text-gray-5">
              <p className="[font-family:'Lab_Grotesque-Medium',Helvetica] font-medium text-base">
                Нет учеников
              </p>
              <p className="text-sm mt-2">Добавьте первого ученика</p>
            </div>
          ) : (
            students.map((student) => {
              const studentGroups = getStudentGroups(student.id);
              return (
                <Card
                  key={student.id}
                  className="p-4 bg-gray-2 border-0 rounded-xl"
                >
                  <h3 className="[font-family:'Lab_Grotesque-Bold',Helvetica] font-bold text-blackstar text-lg">
                    {student.firstName} {student.lastName}
                  </h3>
                  {student.phone && (
                    <p className="[font-family:'Lab_Grotesque-Medium',Helvetica] font-medium text-gray-5 text-sm mt-1">
                      📞 {student.phone}
                    </p>
                  )}
                  {student.email && (
                    <p className="[font-family:'Lab_Grotesque-Medium',Helvetica] font-medium text-gray-5 text-sm">
                      ✉️ {student.email}
                    </p>
                  )}
                  {studentGroups.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-5">
                        Группы: {studentGroups.join(", ")}
                      </p>
                    </div>
                  )}
                </Card>
              );
            })
          )}
        </div>

        <Button
          onClick={() => setLocation("/groups")}
          variant="outline"
          className="w-full max-w-[343px] mt-6 rounded-xl border-gray-4"
        >
          К списку групп
        </Button>
      </main>
    </div>
  );
};
