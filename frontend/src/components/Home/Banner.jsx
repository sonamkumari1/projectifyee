import { motion } from "framer-motion";

function Banner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center text-center py-10 md:pt-20 px-3 sm:px-6 lg:px-8 gap-10"
    >
      <motion.div
        className="w-full max-w-4xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight bg-gradient-to-r from-blue-600 via-red-300 to-yellow-300 inline-block text-transparent bg-clip-text transition-transform hover:scale-105">
          Sell What You Don’t Need,
          <br className="hidden sm:block" />
          Buy What You Love.
        </h1>

        <p className="text-gray-300 text-base sm:text-lg mt-4 transition-opacity duration-500 hover:opacity-90">
          Our platform makes it easy to declutter, discover, and deal—all in one
          place. Whether you're finding hidden gems or turning items into cash,
          it's the smart way to shop and sell.
        </p>
      </motion.div>

      <motion.div
        className="flex justify-center w-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <motion.img
          src="/banner.png"
          alt="Banner Illustration"
          className="rounded-lg shadow-md w-full max-w-md sm:max-w-xl lg:max-w-3xl h-auto transition-transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default Banner;
