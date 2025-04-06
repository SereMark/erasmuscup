import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Component displaying a house card with info and styling
 */
export function HouseCard({ house, inView }) {
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    if (inView && !hasBeenInView) {
      setHasBeenInView(true);
    }
  }, [inView, hasBeenInView]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay: house.delay }}
      className="group h-full relative"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${house.gradient} opacity-20 rounded-2xl blur-xl transform group-hover:scale-105 transition-all duration-700 -rotate-2`}></div>
      <div className="relative h-full bg-black/70 rounded-2xl p-5 sm:p-8 border border-white/10 backdrop-blur-md overflow-hidden transform transition-all duration-500 group-hover:translate-y-[-8px] group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br opacity-20 rounded-bl-full"></div>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-transparent bg-clip-text bg-gradient-to-br drop-shadow-lg">
              <span className={`bg-gradient-to-r ${house.gradient}`} style={{ WebkitBackgroundClip: 'text' }}>
                {house.name}
              </span>
            </h3>
            <div className={`h-1 w-12 sm:w-16 bg-gradient-to-r ${house.gradient} rounded-full mb-3 sm:mb-4`}></div>
          </div>
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${house.gradient} opacity-30 rounded-full blur-md transform group-hover:scale-110 transition-all duration-500`}></div>
            <motion.img
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              src={house.logo}
              alt={`${house.name} Logo`}
              className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
              loading="lazy"
            />
          </div>
        </div>
        <div className="relative z-10 mt-4 sm:mt-6">
          <ul className="space-y-2 sm:space-y-2.5">
            <HouseInfoItem icon="colors" label="Colors" value={house.colors} />
            <HouseInfoItem icon="animal" label="Animal" value={house.animal} />
            <HouseInfoItem 
              icon="motto" 
              label="Motto" 
              value={`"${house.motto}"`}
              caption={house.caption} 
            />
            <HouseInfoItem icon="captain" label="Captain" value={house.captain} />
          </ul>
        </div>
        <div className={`absolute bottom-0 right-0 h-32 sm:h-40 w-32 sm:w-40 bg-gradient-to-tl ${house.gradient} opacity-10 rounded-tl-full transform translate-y-1/4 translate-x-1/4 group-hover:scale-125 transition-all duration-700`}></div>
      </div>
    </motion.div>
  );
}

/**
 * Component for individual house info items
 */
export function HouseInfoItem({ icon, label, value, caption }) {
  // Icons mapping
  const icons = {
    colors: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h-1.5v-1.5c0-1.243-.501-2.363-1.313-3.175-.275.584-.636 1.137-1.084 1.621.478.309.897.721 1.197 1.204.189.303.3.641.3 1.099V21H6.5v-1.5c0-.458.111-.796.3-1.099.3-.483.718-.895 1.197-1.204-.448-.484-.809-1.037-1.084-1.621C6.001 17.137 5.5 18.257 5.5 19.5V21H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1z"/>
        <path d="M18 17c-.55 0-1-.45-1-1v-1.5c0-1.93-1.57-3.5-3.5-3.5S10 12.57 10 14.5V16c0 .55-.45 1-1 1s-1-.45-1-1v-1.5c0-3.03 2.47-5.5 5.5-5.5s5.5 2.47 5.5 5.5V16c0 .55-.45 1-1 1z"/>
      </svg>
    ),
    animal: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
      </svg>
    ),
    motto: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
      </svg>
    ),
    captain: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
        <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
      </svg>
    )
  };
  
  return (
    <li className="flex items-center text-gray-200 text-sm sm:text-base">
      <div className="w-6 sm:w-8 text-gray-400 flex-shrink-0 flex items-center justify-center">
        {icons[icon]}
      </div>
      <div>
        <strong>{label}:</strong> {value}
        {caption && <span className="text-gray-400 text-xs sm:text-sm block mt-0.5">{caption}</span>}
      </div>
    </li>
  );
}