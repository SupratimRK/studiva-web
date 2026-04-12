import Spline from '@splinetool/react-spline';
import { useRef, useEffect, useState } from 'react';

const SplineScene = ({ onLoad }) => {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Pause the Spline WebGL renderer when the hero is off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '200px' } // Start rendering 200px before it enters viewport
    );

    // Observe the parent container
    const container = canvasRef.current?.parentElement;
    if (container) {
      observer.observe(container);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={canvasRef} style={{ width: '100%', height: '100%' }}>
      {isVisible && (
        <Spline
          scene="https://prod.spline.design/0iqzUdlSbWmA4Nib/scene.splinecode"
          onLoad={onLoad}
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </div>
  );
};

export default SplineScene;