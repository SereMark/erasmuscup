import React from "react";
import { motion } from "framer-motion";
import { itemVariants } from "../../constants/animations";
import EventTypeTag from "./EventTypeTag";

export default function EventCard({ event }) {
  return (
    <motion.div 
      variants={itemVariants} 
      className="group bg-black/70 p-1 rounded-xl shadow-lg border border-purple-900/20 hover:border-purple-500/50 transition-all duration-500 h-full"
    >
      <div className="bg-black/80 backdrop-blur-sm p-5 rounded-xl h-full flex flex-col">
        <div className="h-48 rounded-lg overflow-hidden mb-4 bg-black/30">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-white">{event.title}</h3>
            <EventTypeTag type={event.type} />
          </div>
          
          <p className="text-sm text-gray-400 mb-4 line-clamp-2">{event.description}</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-xs text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>{event.date}</span>
            </div>
            
            <div className="flex items-center text-xs text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>{event.time}</span>
            </div>
            
            <div className="flex items-center text-xs text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{event.location}</span>
            </div>
          </div>
        </div>
        
        <button 
          className="group inline-flex items-center justify-center w-full bg-black hover:bg-purple-800 text-gray-300 hover:text-white font-medium px-4 py-2 rounded-lg transition-all duration-300"
          aria-label={`View details for ${event.title}`}
        >
          <span>View Details</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}