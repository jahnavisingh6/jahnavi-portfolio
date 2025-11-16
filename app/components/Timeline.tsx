'use client';
import { FiBriefcase, FiMapPin, FiClock } from 'react-icons/fi';

interface TimelineItem {
  company: string;
  role: string;
  duration: string;
  location: string;
  icon: string;
  current?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-400 via-purple-400 to-pink-400"></div>

      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={index} className="relative pl-20">
            {/* Timeline dot */}
            <div className="absolute left-0 flex items-center justify-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl z-10 ${
                item.current
                  ? 'bg-gradient-to-br from-pink-400 to-purple-400 shadow-lg shadow-pink-300/50 animate-pulse'
                  : 'bg-white border-4 border-purple-300'
              }`}>
                {item.icon}
              </div>
            </div>

            {/* Content card */}
            <div className={`card p-6 ${
              item.current
                ? 'bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200'
                : 'bg-white/80'
            }`}>
              <div className="flex flex-wrap items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.company}</h3>
                  <div className="flex items-center gap-2 text-pink-500 font-medium mb-2">
                    <FiBriefcase className="w-4 h-4" />
                    <span>{item.role}</span>
                  </div>
                </div>
                {item.current && (
                  <span className="px-3 py-1 bg-gradient-to-r from-pink-400 to-purple-400 text-white text-xs font-semibold rounded-full">
                    Current
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FiClock className="w-4 h-4 text-purple-400" />
                  <span>{item.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiMapPin className="w-4 h-4 text-purple-400" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
