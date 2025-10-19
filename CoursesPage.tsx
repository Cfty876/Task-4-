import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Course, Quiz } from "@shared/schema";

export const CoursesPage = (): JSX.Element => {
  const [, setLocation] = useLocation();

  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const getCourseImage = (index: number) => {
    const colors = [
      "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)",
      "linear-gradient(135deg, #507DEB 0%, #7BA3FF 100%)",
      "linear-gradient(135deg, #27AE60 0%, #5FD68A 100%)",
      "linear-gradient(135deg, #E74C3C 0%, #F39C12 100%)",
      "linear-gradient(135deg, #9B59B6 0%, #C39BD3 100%)",
      "linear-gradient(135deg, #34495E 0%, #5D6D7E 100%)",
    ];
    return colors[index % colors.length];
  };

  const handleCourseClick = async (courseId: string) => {
    try {
      const response = await fetch(`/api/quizzes/${courseId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const quizzes: Quiz[] = await response.json();
      
      if (quizzes && quizzes.length > 0) {
        setLocation(`/quiz/${quizzes[0].id}`);
      } else {
        alert("Тесты для этого курса пока не доступны");
      }
    } catch (error) {
      console.error("Failed to fetch quizzes:", error);
      alert("Ошибка загрузки тестов");
    }
  };

  return (
    <div className="bg-white w-full min-h-screen flex flex-col px-4 pt-[61px] pb-[280px]">
      <h1 className="text-[32px] font-black text-[#191919] mb-3 leading-[38px] tracking-[0.01em]">
        Курсы
      </h1>

      <p className="text-[20px] text-[#A8AAAC] mb-8 leading-[24px] max-w-[326px]">
        Для прохождения тестов выберите предмет, который вы сейчас проходите
      </p>

      <button
        onClick={() => setLocation("/map")}
        className="w-full h-[47px] bg-[#BA2135] hover:bg-[#A01D2E] rounded-[100px] font-bold text-white text-[16px] transition-colors mb-8 backdrop-blur-[40px]"
        data-testid="button-map"
      >
        Карта
      </button>

      <div className="flex flex-col gap-4">
        {isLoading ? (
          <>
            <Skeleton className="w-full h-[229px] rounded-xl" />
            <Skeleton className="w-full h-[229px] rounded-xl" />
          </>
        ) : (
          courses?.map((course, index) => (
            <Card
              key={course.id}
              onClick={() => handleCourseClick(course.id)}
              className="w-full rounded-xl overflow-hidden border-0 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              data-testid={`card-course-${course.id}`}
            >
              <div
                className="w-full h-[160px] flex items-center justify-center text-white text-[20px] font-bold p-6"
                style={{ background: getCourseImage(index) }}
              >
                <div className="text-center leading-tight">
                  {course.title.toUpperCase()}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-[16px] font-semibold text-[#191919] mb-1">
                  {course.title}
                </h3>
                <p className="text-[14px] text-[#979797]">
                  {course.difficulty} курс
                </p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
