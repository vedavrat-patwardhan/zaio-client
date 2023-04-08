import type { HTMLMotionProps } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';

type MotionDivProps = {
  animate: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn';
  visible?: boolean;
  children?: React.ReactNode;
} & HTMLMotionProps<'div'>;

interface AnimationType {
  [key: string]: {
    x: number;
    y: number;
  };
}

const AnimatedDiv = ({
  animate,
  visible,
  children,
  ...rest
}: MotionDivProps) => {
  const animateObj: AnimationType = {
    fadeIn: {
      x: 0,
      y: 0,
    },
    fadeInUp: {
      x: 0,
      y: 20,
    },
    fadeInDown: {
      x: 0,
      y: -20,
    },
    fadeInLeft: {
      x: 50,
      y: 0,
    },
    fadeInRight: {
      x: -50,
      y: 0,
    },
  };
  const xi = animateObj?.[animate]?.x;
  const yi = animateObj?.[animate]?.y;

  return (
    <AnimatePresence>
      {(visible === undefined || visible) && (
        <motion.div
          key="box"
          initial={{ opacity: 0, x: xi, y: yi }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, x: xi, y: yi }}
          transition={{ duration: 0.5 }}
          {...rest}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedDiv;
