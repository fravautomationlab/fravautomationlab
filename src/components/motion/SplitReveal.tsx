import React from 'react';
import { motion } from 'motion/react';

interface SplitRevealProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  animateOnMount?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const SplitReveal: React.FC<SplitRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 1.1,
  stagger = 0.08,
  animateOnMount = false,
  as: Component = 'div',
}) => {
  const words = children.split(' ');
  const fravEase = [0.22, 1, 0.36, 1] as const;

  return (
    <Component className={`flex flex-wrap overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0 py-1">
          <motion.span
            initial={animateOnMount ? false : { y: '110%', opacity: 0 }}
            animate={animateOnMount ? { y: '0%', opacity: 1 } : undefined}
            whileInView={animateOnMount ? undefined : { y: '0%', opacity: 1 }}
            viewport={animateOnMount ? undefined : { once: true, amount: 'some' }}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: fravEase,
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
};
