import type { HTMLMotionProps } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';

type MotionTextProps = {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  animate: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn';
  visible?: boolean;
  children?: React.ReactNode;
} & HTMLMotionProps<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'>;

interface AnimationType {
  [key: string]: {
    x: number;
    y: number;
  };
}

const AnimatedText = ({
  tag,
  animate,
  children,
  visible,
  ...rest
}: MotionTextProps) => {
  const Component = tag;
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
          key="text"
          initial={{ opacity: 0, x: xi, y: yi }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, x: xi, y: yi }}
          transition={{ duration: 0.5 }}
          {...rest}
        >
          <Component>{children}</Component>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedText;
