import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./AnimatedTooltip.css";

export const AnimatedTooltip = ({ items, onItemClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRefs = useRef([]);
  const tooltipRefs = useRef([]);

  useGSAP(() => {
    // We will set up quickTo for each tooltip individually
    items.forEach((_, idx) => {
      const el = containerRefs.current[idx];
      const tooltip = tooltipRefs.current[idx];
      if (!el || !tooltip) return;

      const xTo = gsap.quickTo(tooltip, "x", { duration: 0.5, ease: "power4.out" });
      const rotationTo = gsap.quickTo(tooltip, "rotation", { duration: 0.5, ease: "power4.out" });

      const handleMouseMove = (e) => {
        const rect = el.getBoundingClientRect();
        // Calculate offset from center of element
        const halfWidth = rect.width / 2;
        const x = e.clientX - rect.left - halfWidth;
        
        // Map x to translation and dramatic rotation
        xTo(x);
        rotationTo(x * 0.8); 
      };

      el.addEventListener("mousemove", handleMouseMove);

      return () => {
        el.removeEventListener("mousemove", handleMouseMove);
      };
    });
  }, { dependencies: [items] });

  // Handle enter/leave animations
  const handleMouseEnter = (idx) => {
    setHoveredIndex(idx);
    const tooltip = tooltipRefs.current[idx];
    if (tooltip) {
      gsap.fromTo(tooltip, 
        { opacity: 0, scale: 0.6, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)", overwrite: "auto" }
      );
    }
  };

  const handleMouseLeave = (idx) => {
    setHoveredIndex(null);
    const tooltip = tooltipRefs.current[idx];
    if (tooltip) {
      gsap.to(tooltip, {
        opacity: 0, 
        scale: 0.6,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
        overwrite: "auto"
      });
    }
  };

  return (
    <div className="animated-tooltip-container">
      {items.map((item, idx) => (
        <div
          className="animated-tooltip-item"
          key={item.id}
          ref={(el) => (containerRefs.current[idx] = el)}
          onMouseEnter={() => handleMouseEnter(idx)}
          onMouseLeave={() => handleMouseLeave(idx)}
          onClick={() => onItemClick && onItemClick(item)}
          style={{ zIndex: hoveredIndex === idx ? 100 : items.length - idx }}
        >
          <div 
            className="animated-tooltip"
            ref={(el) => (tooltipRefs.current[idx] = el)}
            style={{ opacity: 0, pointerEvents: 'none' }}
          >
            <div className="tooltip-name">{item.name}</div>
            <div className="tooltip-designation">{item.designation}</div>
            <div className="tooltip-arrow"></div>
          </div>
          
          <img
            src={item.image}
            alt={item.name}
            className={`animated-tooltip-avatar ${hoveredIndex === idx ? 'hovered' : ''}`}
          />
        </div>
      ))}
    </div>
  );
};
