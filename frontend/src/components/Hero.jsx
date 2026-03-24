import { motion } from "framer-motion"

function Hero(){


  const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
}


const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

  return(
    


  <motion.section
  variants={container}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.4 }}
  className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 bg-[#080B36] overflow-hidden z-0"
>

  {/* HERO-ONLY BG */}
  
 <img
  src="/ui.jpg"
  className="absolute bottom-0 left-1/2 -translate-x-1/2 
             w-[1600px] max-w-none pointer-events-none opacity-80 -z-10"
/>



      {/* BADGE */}
      <motion.div variants={item} className="mb-4 px-5 py-2 rounded-full 
  bg-white/10 backdrop-blur-xl 
  border border-white/20 
  text-blue-200 text-sm 
  shadow-[0_0_25px_rgba(59,130,246,0.25)]
  relative overflow-hidden">

  <span className="absolute inset-0 
    bg-gradient-to-r from-white/30 via-transparent to-transparent 
    opacity-30 pointer-events-none" />

  <span className="absolute top-0 left-0 w-full h-1/2 
    bg-gradient-to-b from-white/40 to-transparent 
    opacity-20 blur-sm pointer-events-none" />

  <span className="relative">
    AI + Uncertainty Estimation
  </span>

</motion.div>

      {/* HEADING */}
      <motion.h1 variants={item} className="text-5xl md:text-6xl font-bold leading-tight max-w-4xl">

  <span className="bg-gradient-to-r from-white via-blue-300 to-blue-500 
  bg-[length:200%_200%] animate-gradient-x 
  text-transparent bg-clip-text">
  Uncertainty Estimation in CNN
</span>

  <br/>

<span className="bg-gradient-to-r from-blue-400 via-blue-300 to-white
  bg-[length:200%_200%] animate-gradient-x 
  text-transparent bg-clip-text">
  Image based Classification
</span>

</motion.h1>

      {/* SUBTEXT */}
      <motion.p variants={item} className="text-gray-400 mt-6 text-lg max-w-2xl">
        Analyze predictions and understand how reliable your model is using Monte Carlo Dropout.
      </motion.p>

      {/* BUTTON */}
      <motion.div variants={item} className="flex gap-4 mt-10">

        <button
          onClick={() => document.getElementById("features").scrollIntoView({behavior:"smooth"})}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-7 py-3 rounded-full 
                     hover:scale-105 transition"
        >
          Explore Features
        </button>

      </motion.div>

      {/* STATS */}
      <motion.div variants={item} className="flex gap-10 mt-12 text-sm text-gray-400">

        <div>
          <p className="font-semibold text-white">94.39%</p>
          <p>Accuracy</p>
        </div>

        <div>
          <p className="font-semibold text-white">GTSRB</p>
          <p>Dataset</p>
        </div>

        <div>
          <p className="font-semibold text-white">50+</p>
          <p>MC Runs</p>
        </div>

      </motion.div>

    </motion.section>
  )
}

export default Hero