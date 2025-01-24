"use server";
import Slider from "@/app/Slider/Slider";

// Тип слайдов
export type Slide =
  {
    id: number;
    image: string;
    alt: string;
  }

// Данные слайдов
const slides: Slide[] = [
  {id: 1, image: '/images/slide1.jpg', alt: 'Slide 1'},
  {id: 2, image: '/images/slide2.jpg', alt: 'Slide 2'},
  {id: 3, image: '/images/slide3.jpg', alt: 'Slide 3'},
  {id: 4, image: '/images/slide4.jpg', alt: 'Slide 4'},
  {id: 5, image: '/images/slide5.jpg', alt: 'Slide 5'},
  {id: 6, image: '/images/slide6.jpg', alt: 'Slide 6'}
];

export default async function Home(): Promise<React.JSX.Element>
{
  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-2xl font-bold mt-[15px] mb-[8px]">Slider</h1>
      <Slider props={{slides: slides}}/>
    </div>
  );
};