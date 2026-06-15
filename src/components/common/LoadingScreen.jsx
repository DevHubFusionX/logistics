import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 bg-[#0a152a] flex flex-col items-center justify-center z-[100] overflow-hidden"
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Subtle Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() > 0.7 ? 2 : 1,
              height: Math.random() > 0.7 ? 2 : 1,
              left: `${Math.random() * 100}%`,
              background: `rgba(96, 165, 250, ${0.15 + Math.random() * 0.25})`,
            }}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ 
              y: "-10%",
              opacity: [0, 0.8, 0],
            }}
            transition={{ 
              duration: 6 + Math.random() * 6, 
              repeat: Infinity, 
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center">
        {/* Central Logo Circle */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.96, 1.03, 0.96],
            opacity: 1,
            boxShadow: [
              "0 0 30px rgba(56, 189, 248, 0.15)",
              "0 0 50px rgba(56, 189, 248, 0.4)",
              "0 0 30px rgba(56, 189, 248, 0.15)"
            ]
          }}
          transition={{
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 0.6, ease: "easeOut" }
          }}
          className="w-28 h-28 bg-white rounded-full flex items-center justify-center p-4 relative"
        >
          <svg 
            viewBox="0 0 1024 1024" 
            className="w-full h-full"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Dara Logo Icon Group */}
            <g transform="translate(512, 512) scale(1.0) translate(-650, -374)">
              {/* Top Blue Arc */}
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                fill="#215C9C" 
                d="M381.329 55.8252L657.57 55.8117L745.139 55.817C790.589 55.8264 817.176 53.9918 861.869 65.0315C940.847 85.3162 1008.65 135.928 1050.56 205.888C1094.8 281.067 1107.62 370.659 1086.25 455.233C1065.94 536.001 1014.76 605.577 943.718 649.012C903.421 673.31 858.045 687.939 811.148 691.753C794.425 692.966 774.179 692.422 757.192 692.408L685.702 692.421L637.53 692.446C633.745 692.45 618.254 692.717 615.516 692.033C579.036 654.651 542.196 617.623 505.001 580.953C569.485 580.057 636.392 580.964 701.05 580.985L756.489 581.003C786.198 581.002 804.124 582.112 833.681 574.763C868.463 566.034 900.246 548.079 925.679 522.791C965.348 483.255 987.63 429.535 987.593 373.521C987.973 318.223 966.19 265.078 927.113 225.96C899.905 198.625 865.483 179.596 827.867 171.096C801.657 165.208 775.432 166.688 748.646 166.697L670.248 166.741L381.44 166.723C381.79 130.037 381.488 92.5492 381.329 55.8252Z"
              />
              {/* Middle Blue Loop */}
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                fill="#215C9C" 
                d="M381.406 226.389L674.477 226.369L751.576 226.354C770.204 226.354 794.367 225.336 812.128 228.927C839.804 234.501 865.222 248.115 885.202 268.064C913.381 296.14 929.088 334.372 928.785 374.154C929.13 413.67 913.431 451.634 885.282 479.362C866.512 497.948 843.048 511.087 817.395 517.375C794.735 522.852 754.387 521.058 729.708 521.048L610.715 521.036L504.213 521.114C515.577 508.299 535.027 490.075 547.524 477.66L615.507 409.446C656.63 408.411 699.876 410.213 741.193 409.426C758.602 408.679 777.768 411.088 794.948 408.523C811.197 406.098 821.983 389.267 822.143 373.786C822.238 363.653 818.312 353.895 811.225 346.653C803.966 339.29 795.435 336.333 785.248 336.165C772.833 335.961 760.409 336.075L663.035 336.133L381.442 336.076L381.406 226.389Z"
              />
              {/* Green Triangle/Arrow */}
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                fill="#3AA048" 
                d="M383.296 409.116C434.212 409.361 485.129 409.334 536.045 409.034C522.297 424.489 501.388 444.164 486.335 459.284L396.052 549.637C440.921 593.652 483.949 640.307 528.907 684.339C531.087 686.473 534.496 689.739 535.901 692.374L383.936 692.51L242.746 549.724C290 503.451 336.109 455.429 383.296 409.116Z"
              />
            </g>
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}