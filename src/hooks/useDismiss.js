import { useState, useCallback } from "react";

const EXIT_DURATION = 180; // debe coincidir con la duración del CSS de salida

export function useDismiss(onClose) {
  const [closing, setClosing] = useState(false);

  const dismiss = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, EXIT_DURATION);
  }, [onClose]);

  return { closing, dismiss };
}