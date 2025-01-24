import {useEffect, useState} from "react";

// Определение типа устройства
export default function useDeviceType(): string
{
  const [deviceType, setDeviceType] = useState("");

  useEffect((): void =>
  {
    const userAgent: string = navigator.userAgent.toLowerCase();
    if (/mobile|android|iphone|ipad|phone/i.test(userAgent))
    {
      setDeviceType('mobile');
    }
    else if (/tablet|ipad/i.test(userAgent))
    {
      setDeviceType('tablet');
    }
    else
    {
      setDeviceType('desktop');
    }
  }, []);

  return deviceType;
}