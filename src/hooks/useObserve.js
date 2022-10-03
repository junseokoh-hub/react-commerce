import { useCallback, useEffect, useRef, useState } from "react";

export const useObserve = (options) => {
  const [isView, setIsView] = useState(false);
  const targetRef = useRef(null);

  const callback = useCallback(([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(targetRef.current);
      setIsView(true);
    }
  }, []);

  useEffect(() => {
    if (!targetRef.current) return;
    const io = new IntersectionObserver(callback, options);

    if (targetRef.current) {
      io.observe(targetRef.current);
    }
  }, []);

  return { isView, targetRef };
};
