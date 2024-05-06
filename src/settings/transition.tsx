import { motion } from "framer-motion";

const Transition = ({isHome = false}) => {
  return (
    <>
      <motion.div
        key="slide-in"
        className="slide-in"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: isHome ? 2 : 1.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
};

export default Transition;
