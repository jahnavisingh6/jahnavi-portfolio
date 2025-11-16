'use client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import SkillTooltip from './SkillTooltip';

interface SkillBarProps {
  skill: string;
  percentage: number;
  color: string;
  delay?: number;
  usedIn?: {
    company?: string;
    project: string;
    icon?: string;
  }[];
}

export default function SkillBar({ skill, percentage, color, delay = 0, usedIn }: SkillBarProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        setWidth(percentage);
      }, delay);
    }
  }, [inView, percentage, delay]);

  const colorClasses = {
    pink: 'bg-gradient-to-r from-pink-400 to-pink-500',
    purple: 'bg-gradient-to-r from-purple-400 to-purple-500',
    orange: 'bg-gradient-to-r from-orange-400 to-orange-500',
  };

  const content = (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{skill}</span>
        <span className="text-sm font-semibold text-gray-600">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full ${colorClasses[color as keyof typeof colorClasses]} rounded-full transition-all duration-1000 ease-out relative`}
          style={{ width: `${width}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  if (usedIn && usedIn.length > 0) {
    return <SkillTooltip content={usedIn}>{content}</SkillTooltip>;
  }

  return content;
}
