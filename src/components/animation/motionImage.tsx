import type { HTMLMotionProps } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';

type MotionImageProps = {
  animate: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn';
  visible?: boolean;
} & HTMLMotionProps<'img'>;

interface AnimationType {
  [key: string]: {
    x: number;
    y: number;
  };
}
const AnimatedImage = ({ animate, visible, ...rest }: MotionImageProps) => {
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
        <motion.img
          key="img"
          initial={{ opacity: 0, x: xi, y: yi }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, x: xi, y: yi }}
          transition={{ duration: 0.5 }}
          {...rest}
        />
      )}
    </AnimatePresence>
  );
};

export default AnimatedImage;
