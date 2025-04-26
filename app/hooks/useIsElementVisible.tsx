import { useState, useEffect } from "react";

interface UseIsElementVisibleOptions {
  threshold?: number;
}

const useIsElementVisible = (
  elementIdOrRef: string | React.RefObject<HTMLElement>,
  options: UseIsElementVisibleOptions = {}
) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    //Id lub ref
    const element =
      typeof elementIdOrRef === "string"
        ? document.getElementById(elementIdOrRef)
        : elementIdOrRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        //Jest true tylko, gdy element jest w pełni widoczny
        setIsVisible(entry.intersectionRatio === 1);
      },
      {
        threshold: options.threshold ?? 1, //Domyślnie 1, czyli wyzwala, gdy element nie jest już w pełni widoczny
      }
    );
    observer.observe(element);

    //Czyszczenie przy odmontowaniu
    return () => {
      observer.unobserve(element);
    };
  }, [elementIdOrRef, options.threshold]);

  return isVisible;
};

export default useIsElementVisible;
