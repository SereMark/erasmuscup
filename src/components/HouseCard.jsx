import React from "react"

export default function HouseCard({ title, gradient, logo, items }) {
  return (
    <div className={`rounded-lg overflow-hidden shadow-md transition-all hover:shadow-2xl hover:-translate-y-1 flex flex-col ${gradient} relative`}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative p-6 flex flex-col h-full z-10">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl sm:text-2xl font-bold drop-shadow-lg">{title}</h3>
          <img
            src={logo}
            alt={`${title} Logo`}
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
          />
        </div>
        <ul className="space-y-1 text-sm sm:text-base leading-relaxed mt-auto">
          {items.map(({ label, value }) => (
            <li key={label}>
              <strong>{label}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}