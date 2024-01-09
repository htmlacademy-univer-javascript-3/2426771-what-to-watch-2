import { useEffect, useRef, useState } from 'react';

export function useVideoPreview(hoverCondition: boolean, delay: number) {
  const [isPreviewPlays, setIsPreviewPlays] = useState(false);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  function safeClearTimeout() {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  }

  useEffect(() => {
    if (hoverCondition) {
      timeoutId.current = setTimeout(() => {
        setIsPreviewPlays(true);
      }, delay);
    } else {
      safeClearTimeout();
      setIsPreviewPlays(false);
    }
  }, [delay, hoverCondition]);

  useEffect(() => () => {
    safeClearTimeout();
  }, []);

  return isPreviewPlays;
}
