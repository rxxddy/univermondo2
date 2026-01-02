import React, { useRef, useEffect, useState, useCallback } from "react";

const InfiniteLooper = ({ children, speed = 10, direction = "left" }) => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [looperInstances, setLooperInstances] = useState(1);

  // Setup instances to ensure enough content for smooth looping
  const setupInstances = useCallback(() => {
    if (!innerRef?.current || !outerRef?.current) return;

    const { width: innerWidth } = innerRef.current.getBoundingClientRect();
    const { width: outerWidth } = outerRef.current.getBoundingClientRect();

    const widthDeficit = outerWidth - innerWidth;
    const instanceWidth = innerWidth / innerRef.current.children.length;

    if (widthDeficit > 0) {
      setLooperInstances(
        looperInstances + Math.ceil(widthDeficit / instanceWidth) + 1
      );
    }
  }, [looperInstances]);

  useEffect(() => {
    setupInstances();
    const handleResize = () => setupInstances();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setupInstances]);

  return (
    <div className="looper" ref={outerRef}>
      <div className="looper__innerList" ref={innerRef} data-animate="true">
        {[...Array(looperInstances)].map((_, ind) => (
          <div className="flex" key={`outer-${ind}`}>
            <div
              key={`instance-1-${ind}`}
              className="looper__listInstance"
              style={{
                animationDuration: `${speed}s`,
                animationDirection: direction === "right" ? "reverse" : "normal",
              }}
            >
              {children}
            </div>
            <div
              key={`instance-2-${ind}`}
              className="looper__listInstance"
              style={{
                animationDuration: `${speed}s`,
                animationDirection: direction === "right" ? "reverse" : "normal",
              }}
            >
              {children}
            </div>
            <div
              key={`instance-3-${ind}`}
              className="looper__listInstance"
              style={{
                animationDuration: `${speed}s`,
                animationDirection: direction === "right" ? "reverse" : "normal",
              }}
            >
              {children}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteLooper;
