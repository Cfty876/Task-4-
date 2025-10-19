import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { ChevronLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Location } from "@shared/schema";

declare global {
  interface Window {
    ymaps: any;
  }
}

export const MapPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const { data: locations, isLoading } = useQuery<Location[]>({
    queryKey: ["/api/locations"],
  });

  useEffect(() => {
    if (!locations || locations.length === 0) return;

    const apiKey = import.meta.env.VITE_YANDEX_MAPS_API_KEY || '';
    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
    script.async = true;
    script.onload = () => {
      window.ymaps.ready(() => {
        if (mapRef.current) {
          const map = new window.ymaps.Map(mapRef.current, {
            center: [56.8389, 60.6057],
            zoom: 12,
            controls: ['zoomControl', 'geolocationControl']
          });

          locations.forEach((loc) => {
            const placemark = new window.ymaps.Placemark(
              [parseFloat(loc.lat), parseFloat(loc.lng)],
              {
                hintContent: loc.name
              },
              {
                iconLayout: 'default#image',
                iconImageHref: '/figmaAssets/castle-marker.png',
                iconImageSize: [45, 55],
                iconImageOffset: [-22.5, -55]
              }
            );

            placemark.events.add('click', () => {
              setSelectedLocation(loc);
            });

            map.geoObjects.add(placemark);
          });

          setMapLoaded(true);
        }
      });
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [locations]);

  return (
    <div className="bg-white w-full min-h-screen flex flex-col relative">
      <div className="absolute top-[57px] left-[14px] z-10">
        <button
          onClick={() => setLocation("/courses")}
          className="w-[39px] h-[39px] bg-white rounded-full shadow-md flex items-center justify-center text-[#191919] hover:text-[#BA2135] transition-colors"
          data-testid="button-back"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="flex-1 relative">
        <div 
          ref={mapRef} 
          className="w-full h-full min-h-screen"
          data-testid="yandex-map"
        />
        
        {(isLoading || !mapLoaded) && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#f0f0f0]">
            <p className="text-[#979797]">Загрузка карты...</p>
          </div>
        )}
      </div>

      {selectedLocation && (
        <>
          <div 
            className="absolute inset-0 z-20 bg-[rgba(9,9,9,0.3)] backdrop-blur-[4px]"
            onClick={() => setSelectedLocation(null)}
            data-testid="overlay-backdrop"
          />
          
          <div className="absolute left-[30px] top-[265px] w-[316px] bg-[#F5F5F5] rounded-2xl z-30 px-6 py-8 flex flex-col items-center" style={{ boxShadow: '0px 5px 40px rgba(0, 0, 0, 0.07)' }} data-testid="popup-location">
            <h3 className="text-[22px] font-bold text-[#191919] text-center leading-[26px] tracking-[0.005em] mb-4">
              {selectedLocation.name}
            </h3>
            <p className="text-[16px] text-[#A8AAAC] text-center leading-[24px] mb-6 max-w-[246px]">
              {selectedLocation.description || selectedLocation.address}
            </p>
            <button
              onClick={() => setSelectedLocation(null)}
              className="w-[270px] h-[52px] bg-[#BA2135] hover:bg-[#A01D2E] rounded-[100px] font-bold text-white text-[16px] transition-colors flex items-center justify-center"
              style={{ backdropFilter: 'blur(40px)', mixBlendMode: 'normal' }}
              data-testid="button-close-popup"
            >
              Назад
            </button>
          </div>
        </>
      )}
    </div>
  );
};
