import React from "react";

export const MobileHeader = (): JSX.Element => {
  return (
    <header className="flex z-[5] flex-col w-full items-start fixed top-0 left-0 bg-color-paletteneutral00">
      <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
        <div className="relative self-stretch w-full h-11 bg-color-paletteneutral00">
          <div className="absolute top-[calc(50.00%_-_8px)] left-[21px] w-[54px] [font-family:'DM_Sans',Helvetica] font-bold text-black-1 text-[15px] text-center tracking-[-0.30px] leading-[normal]">
            9:41
          </div>

          <img
            className="absolute top-[17px] left-[336px] w-6 h-[11px]"
            alt="Battery"
            src="/figmaAssets/battery.png"
          />

          <img
            className="absolute top-[17px] right-11 w-[15px] h-[11px]"
            alt="Wifi"
            src="/figmaAssets/wifi.svg"
          />

          <img
            className="absolute top-[18px] right-16 w-[17px] h-[11px]"
            alt="Cellular connection"
            src="/figmaAssets/cellular-connection.svg"
          />
        </div>
      </div>
    </header>
  );
};
