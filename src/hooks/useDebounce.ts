import { useEffect, useRef, useState } from "react";

export default function useDebounce(fn: React.ChangeEventHandler<HTMLInputElement>, delay: number) {
  const timeoutRef = useRef<number | undefined>();

  function debouncedFn({...params }: React.ChangeEvent<HTMLInputElement>) {
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => {
      fn(params);
    }, delay);
  }

  return debouncedFn;
}
