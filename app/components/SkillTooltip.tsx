'use client';
import { useState } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: {
    company?: string;
    project: string;
    icon?: string;
  }[];
}

export default function SkillTooltip({ children, content }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      {/* Tooltip */}
      {isVisible && (
        <div className="absolute z-50 left-0 top-full mt-2 w-80 animate-fade-in">
          {/* Arrow */}
          <div className="absolute -top-2 left-8 w-4 h-4 bg-white/95 backdrop-blur-sm rotate-45 border-l border-t border-pink-100"></div>

          {/* Content */}
          <div className="relative bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-pink-100 p-4">
            <div className="text-xs font-semibold text-gray-500 mb-3 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-400"></span>
              Used in:
            </div>
            <div className="space-y-2">
              {content.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-sm group hover:translate-x-1 transition-transform duration-200"
                >
                  <span className="text-base flex-shrink-0">{item.icon || '•'}</span>
                  <div className="flex-1">
                    {item.company && (
                      <span className="font-semibold text-gray-700">{item.company}</span>
                    )}
                    {item.company && <span className="text-gray-400 mx-1">→</span>}
                    <span className="text-gray-600">{item.project}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
