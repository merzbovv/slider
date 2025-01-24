"use client";
import React, {useEffect, useState} from 'react';
import {Slide} from "@/app/page";
import useDeviceType from "@/app/useDeviceDetect/useDeviceDetect";
import Image from "next/image";

type SliderProps = {
  props: {
    slides: Slide[]
  }
}

export default function Slider(props: SliderProps): React.JSX.Element
{
  const deviceType: string = useDeviceType(); // Определение типа устройства

  const [currentIndex, setCurrentIndex] = useState(0); // Текущее положение слайда
  const [minWSlide, setMinWSlide] = useState(25);  // Минимальная ширина каждого слайда
  const [slidesPerPage, setSlidesPerPage] = useState(4); // Количество слайдов одновременно отображаемых на странице

  const slides: Slide[] = props.props.slides; // Слайды полученные с серверной стороны

  useEffect((): void =>
  {
    if (deviceType.length === 0)
    {
      return;
    }
    if (deviceType === "desktop")
    {
      setSlidesPerPage(4)
      setMinWSlide(25)
    }
    else
    {
      setSlidesPerPage(1)
      setMinWSlide(100)
    }
  }, [deviceType]);

  // Количество точек для отображения всех слайдов
  const totalPages: number = Math.ceil(slides.length / slidesPerPage);

  /*
   Функция для перехода к следующему слайду (циклично)
   */
  function fnGoToNextSlide(): void
  {
    if (currentIndex + slidesPerPage >= slides.length)
    {
      setCurrentIndex(0); // Возврат к первому слайду, если достигнут конец
    }
    else
    {
      setCurrentIndex(currentIndex + 1);
    }
  }

  /*
   Функция для перехода к предыдущему слайду (циклично)
   */
  function fnGoToPrevSlide(): void
  {
    if (currentIndex === 0)
    {
      setCurrentIndex(slides.length - slidesPerPage); // Переход к последнему слайду, если находимся в начале
    }
    else
    {
      setCurrentIndex(currentIndex - 1);
    }
  }

  /*
   Функция для перехода к конкретной группе слайдов (по индексу точки)
   */
  function fnGoToPage(pageIndex: number): void
  {
    const targetIndex: number = pageIndex * slidesPerPage; // Рассчитываем первый слайд целевой страницы
    if (targetIndex + slidesPerPage > slides.length)
    {
      setCurrentIndex(slides.length - slidesPerPage); // Отображаем последние слайды, если страница не полная
    }
    else
    {
      setCurrentIndex(targetIndex);
    }
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Контейнер слайдов */}
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-500"
          // Смещаем слайды на основе текущей "страницы"
          style={{transform: `translateX(-${currentIndex * (100 / slidesPerPage)}%)`}}
        >
          {slides.map((slide: Slide) => (
            <div
              key={slide.id}
              style={{minWidth: minWSlide + "%"}}
              className="p-[10px] flex items-center justify-center"
            >
              <Image
                width={300}
                height={186}
                src={slide.image}
                alt={slide.alt}
                className="rounded-[20px] border-[2px]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Точки для переключения страниц слайдов */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({length: totalPages}).map((item, pageIndex: number) => (
          <button
            key={pageIndex}
            onClick={() => fnGoToPage(pageIndex)}
            className={`h-3 rounded-full focus:outline-none transition-all duration-300 ${
              Math.ceil(currentIndex / slidesPerPage) === pageIndex // Проверка, активна ли точка
                ? 'w-8 bg-black' // Активная точка
                : 'w-3 bg-gray-300' // Неактивная точка
            }`}
          ></button>
        ))}
      </div>

      {/* Кнопка для перехода к предыдущему слайду */}
      <button
        onClick={fnGoToPrevSlide}
        className="absolute left-0 top-[43%] transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md focus:outline-none"
      >
        &#8592; {/* Стрелка влево */}
      </button>

      {/* Кнопка для перехода к следующему слайду */}
      <button
        onClick={fnGoToNextSlide}
        className="absolute right-0 top-[43%] transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md focus:outline-none"
      >
        &#8594; {/* Стрелка вправо */}
      </button>
    </div>
  );
};