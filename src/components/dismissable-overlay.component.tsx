import React, { ReactNode, useCallback, useEffect, useRef } from "react";

type DissmissableOverlayProps = {
  children: ReactNode;
  onClose?: () => void;
};

const DissmissableOverlay = ({
  onClose,
  children,
}: DissmissableOverlayProps) => {
  const ref = useRef(null);

  const clickListener = useCallback(
    (e: MouseEvent) => {
      if (!(ref.current as any)?.contains(e.target)) {
        onClose?.();
      }
    },
    // eslint-disable-next-line
    [ref.current]
  );
  useEffect(() => {
    document.addEventListener("click", clickListener);
    return () => {
      document.removeEventListener("click", clickListener);
    };
    // eslint-disable-next-line
  }, []);
  return <div ref={ref}>{children}</div>;
};

export default DissmissableOverlay;
