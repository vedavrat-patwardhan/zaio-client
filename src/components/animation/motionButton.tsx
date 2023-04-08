import type { HTMLMotionProps } from 'framer-motion';
import { motion } from 'framer-motion';

type AnimatedButtonProps = {
  animate: 'pulse' | 'bounce' | 'none';
  children?: React.ReactNode;
} & HTMLMotionProps<'button'>;

interface AnimationType {
  [key: string]: {
    animate?: object;
  };
}

const AnimatedButton = ({
  animate,
  children,
  ...rest
}: AnimatedButtonProps) => {
  const animateObj: AnimationType = {
    pulse: {
      animate: {
        scale: [1, 1.1, 1],
        transition: { ease: 'linear', duration: 0.5, repeat: Infinity },
      },
    },
    bounce: {
      animate: {
        y: [0, -10, 0],
        transition: { ease: 'linear', duration: 0.5, repeat: Infinity },
      },
    },
    none: {},
  };
  const animationProps = animateObj[animate];
  return (
    <motion.button {...animationProps} {...rest}>
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
