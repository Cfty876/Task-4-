import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import type { Question, Quiz } from "@shared/schema";

export const QuizPage = (): JSX.Element => {
  const { quizId } = useParams();
  const [, setLocation] = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const { data: quiz } = useQuery<Quiz>({
    queryKey: [`/api/quiz/${quizId}`],
    enabled: !!quizId,
  });

  const { data: questions, isLoading } = useQuery<Question[]>({
    queryKey: [`/api/questions/${quizId}`],
    enabled: !!quizId,
  });

  if (isLoading) {
    return (
      <div className="bg-white w-full min-h-screen flex flex-col px-4 pt-[60px]">
        <Skeleton className="w-32 h-8 mb-6" />
        <Skeleton className="w-full h-4 mb-8" />
        <Skeleton className="w-full h-40 mb-6" />
        <Skeleton className="w-full h-[58px]" />
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-[16px] text-[#979797]">Вопросы не найдены</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleSubmit = () => {
    if (!selectedAnswer) {
      setError("Пожалуйста, выберите ответ");
      return;
    }

    if (selectedAnswer.trim() === currentQuestion.correctAnswer.trim()) {
      setError("");
      const newCorrectAnswers = correctAnswers + 1;
      setCorrectAnswers(newCorrectAnswers);

      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer("");
      } else {
        const code = generateCompletionCode();
        setLocation(`/success?score=${newCorrectAnswers}&total=${totalQuestions}&code=${code}`);
      }
    } else {
      setError("Ответ неверный, попробуйте еще раз");
    }
  };

  const generateCompletionCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  return (
    <div className="bg-white w-full min-h-screen flex flex-col px-4 pt-[60px] pb-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => setLocation("/courses")}
          className="text-[#333333] hover:text-[#BA2135] transition-colors mr-4"
          data-testid="button-back"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[18px] font-medium text-[#333333]">
          {quiz?.title || "Загрузка..."}
        </h1>
      </div>

      <div className="mb-8">
        <div className="flex gap-1">
          {Array.from({ length: totalQuestions }).map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full transition-all ${
                index < currentQuestionIndex
                  ? "bg-[#BA2135]"
                  : index === currentQuestionIndex
                  ? "bg-[#BA2135]"
                  : "bg-[#E0E0E0]"
              }`}
              data-testid={`progress-segment-${index}`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <p className="text-[16px] text-[#333333] mb-6 leading-relaxed">
          {currentQuestion.questionText}
        </p>

        {error && (
          <p className="text-[14px] text-[#BA2135] text-center mb-4 font-normal" data-testid="text-error">
            {error}
          </p>
        )}

        {currentQuestion.options && currentQuestion.options.length > 0 ? (
          <div className="flex flex-col gap-3 mb-8">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedAnswer(option);
                  setError("");
                }}
                className={`w-full min-h-[58px] px-4 py-3 rounded-xl text-[14px] text-left transition-all ${
                  selectedAnswer === option
                    ? "bg-[#BA2135] text-white font-medium"
                    : "bg-[#F0F0F0] text-[#333333] hover:bg-[#E0E0E0]"
                }`}
                data-testid={`button-option-${index}`}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <div className="mb-8">
            <label className="text-[14px] text-[#979797] mb-2 block">
              Ваш подробный ответ
            </label>
            <Input
              type="text"
              value={selectedAnswer}
              onChange={(e) => {
                setSelectedAnswer(e.target.value);
                setError("");
              }}
              placeholder="Введите ответ..."
              className="w-full h-[58px] px-4 rounded-2xl border-2 border-[#E0E0E0] focus:border-[#BA2135] text-[16px] placeholder:text-[#BDBDBD]"
              data-testid="input-answer"
            />
          </div>
        )}

        <div className="mt-auto">
          <Button
            onClick={handleSubmit}
            className="w-full h-[58px] bg-[#BA2135] hover:bg-[#A01D2E] rounded-[100px] font-bold text-white text-[16px]"
            data-testid="button-submit"
          >
            Ответить
          </Button>
        </div>
      </div>
    </div>
  );
};
