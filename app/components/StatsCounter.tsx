'use client';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: string;
  decimals?: number;
}

const stats: Stat[] = [
  {
    value: 3.5,
    suffix: '+',
    label: 'Years Experience',
    icon: '💼',
    decimals: 1,
  },
  {
    value: 20,
    suffix: '+',
    label: 'ML Models Deployed',
    icon: '🤖',
  },
  {
    value: 1,
    suffix: 'M+',
    label: 'Records Analyzed',
    icon: '📊',
  },
  {
    value: 90,
    suffix: '%',
    label: 'Model Accuracy',
    icon: '🎯',
  },
];

export default function StatsCounter() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-16 bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center transform hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/20">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {inView && (
                    <>
                      {stat.prefix}
                      <CountUp
                        end={stat.value}
                        duration={2.5}
                        decimals={stat.decimals || 0}
                        decimal="."
                      />
                      {stat.suffix}
                    </>
                  )}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
