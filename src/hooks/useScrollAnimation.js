import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      from = { opacity: 0, y: 60 },
      to = { opacity: 1, y: 0 },
      duration = 0.9,
      ease = 'power3.out',
      delay = 0,
      start = 'top 85%',
      once = true,
    } = options;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: once ? 'play none none none' : 'play none none reverse',
      },
    });

    tl.fromTo(el, from, { ...to, duration, ease, delay });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
    };
  }, []);

  return ref;
};

export const useStaggerAnimation = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      childSelector = '.stagger-item',
      from = { opacity: 0, y: 50 },
      to = { opacity: 1, y: 0 },
      duration = 0.7,
      stagger = 0.12,
      ease = 'power3.out',
      start = 'top 80%',
    } = options;

    const children = el.querySelectorAll(childSelector);
    if (!children.length) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(children, from, { ...to, duration, ease, stagger });

    return () => {
      tl.kill();
    };
  }, []);

  return ref;
};

export const useParallax = (speed = 0.5) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tl = gsap.to(el, {
      yPercent: -30 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => tl.kill();
  }, [speed]);

  return ref;
};
