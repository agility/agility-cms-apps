import { useEffect } from "react";

export const useAssetWidth = (assetRef, widthRef, widthHandler) => {
  useEffect(() => {
    let interval = setInterval(() => {
      if (assetRef.current) {
        const currentWidth = widthRef.current || 0;
        // @ts-ignore
        const theWidth = assetRef.current?.clientWidth;
        if (theWidth !== currentWidth) {
          widthHandler(theWidth);
          widthRef.current = theWidth;
        }
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
