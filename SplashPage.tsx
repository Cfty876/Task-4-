import { useEffect } from "react";
import { useLocation } from "wouter";

export const SplashPage = (): JSX.Element => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center justify-center animate-fade-in">
        <div className="relative mb-12">
          <svg width="210" height="210" viewBox="0 0 210 210" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="204" height="204" rx="51" fill="#BA2135"/>
            <rect x="3" y="3" width="204" height="204" rx="51" stroke="white" strokeWidth="4.78125"/>
            <path d="M66.75 82.6063C77.3124 82.6063 85.875 91.1688 85.875 101.731C85.875 102.406 86.795 102.701 87.232 102.186C90.74 98.0573 95.97 95.4373 101.812 95.4373H108.188C114.03 95.4373 119.26 98.0573 122.768 102.186C123.205 102.701 124.125 102.406 124.125 101.731C124.125 91.1688 132.688 82.6063 143.25 82.6063H152.812C163.375 82.6063 171.938 91.1688 171.938 101.731V146.127C171.938 146.254 171.835 146.356 171.708 146.356C171.597 146.356 171.502 146.436 171.482 146.546C169.148 159.135 158.109 168.669 144.844 168.669H65.1562C51.8908 168.669 40.8522 159.135 38.5178 146.546C38.4976 146.436 38.4025 146.356 38.2915 146.356C38.165 146.356 38.0625 146.254 38.0625 146.127V101.731C38.0625 91.1688 46.6251 82.6063 57.1875 82.6063H66.75Z" fill="white"/>
            <circle cx="61.9688" cy="68.3438" r="17.5312" fill="white"/>
            <circle cx="148.031" cy="68.3438" r="17.5312" fill="white"/>
            <circle cx="105" cy="79.5" r="19.125" fill="white"/>
          </svg>
        </div>

        <h1 className="text-[40px] font-bold text-[#191919] mb-3 text-center tracking-tight">
          ReverseEducation
        </h1>
        <p className="text-[16px] text-[#979797] text-center max-w-[300px] leading-relaxed">
          Сделай свое обучение легче и измени вектор своего развития
        </p>
      </div>
    </div>
  );
};
