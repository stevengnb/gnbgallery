import { motion } from "framer-motion";

const Transition = () => {
  return (
    <>
      <motion.div
        key="slide-in"
        className="slide-in"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
};

export default Transition;
