import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const Star = ({ className = "", size = 47 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 47 47" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M23.5 0L28.7366 16.2634L45 21.5L28.7366 26.7366L23.5 43L18.2634 26.7366L2 21.5L18.2634 16.2634L23.5 0Z" 
      fill="#FFC107"
    />
  </svg>
);

export const SuccessPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code") || "ABCD1234";

  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <Star className="absolute top-[192px] left-[31px]" size={47} />
      <Star className="absolute top-[140px] right-[40px]" size={35} />
      <Star className="absolute top-[280px] right-[25px]" size={28} />
      <Star className="absolute bottom-[180px] left-[45px]" size={38} />
      <Star className="absolute bottom-[220px] right-[35px]" size={42} />
      <Star className="absolute top-[380px] left-[25px]" size={32} />

      <div className="flex flex-col items-center max-w-[343px] relative z-10">
        <div className="relative mb-8">
          <div className="text-[56px] font-bold text-[#191919] text-center tracking-wider" data-testid="text-code">
            {code}
          </div>
        </div>

        <h2 className="text-[20px] font-bold text-[#191919] text-center mb-3">
          Поздравляем, вы прошли тест!
        </h2>
        <p className="text-[14px] text-[#979797] text-center mb-12 leading-relaxed">
          Теперь вам доступен уникальный код для участия в розыгрыше
        </p>

        <Button
          onClick={() => setLocation("/courses")}
          className="w-full h-[58px] bg-[#BA2135] hover:bg-[#A01D2E] rounded-[100px] font-bold text-white text-[16px]"
          data-testid="button-main-menu"
        >
          Главное меню
        </Button>
      </div>
    </div>
  );
};
