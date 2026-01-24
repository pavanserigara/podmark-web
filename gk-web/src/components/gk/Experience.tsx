
import React, { useState, useRef, useEffect } from 'react';
import { EXPERIENCE, IconMap } from './constants';
import { Award, ChevronDown, ChevronUp } from 'lucide-react';
import type { ExperienceEntry } from './types';

const ExperienceItem: React.FC<{ exp: ExperienceEntry; idx: number; isLast: boolean }> = ({ exp, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      const el = descriptionRef.current;
      if (el) {
        // To check overflow on 2 lines, we compare scrollHeight with clientHeight
        // But clientHeight might be affected by line-clamp.
        // A better way: temporarily remove line-clamp, measure, then put it back
        // const originalStyle = el.style.webkitLineClamp;
        // const originalDisplay = el.style.display;

        // Reset to measure full height
        el.style.webkitLineClamp = 'unset';
        el.style.display = 'block';
        const fullHeight = el.scrollHeight;

        // Restore to measure clamped height
        el.style.webkitLineClamp = '2';
        el.style.display = '-webkit-box';
        const clampedHeight = el.clientHeight;

        setShouldShowButton(fullHeight > clampedHeight + 5); // +5 for buffer
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [exp.description]);

  const Icon = IconMap[exp.icon];

  return (
    <div className="relative flex gap-4 md:gap-6 group">
      {/* Vertical connection line */}
      {!isLast && (
        <div className="absolute left-6 md:left-8 top-16 bottom-[-3rem] w-px bg-white/10 hidden md:block" />
      )}

      {/* Icon / Logo Area */}
      <div className="shrink-0 relative">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shadow-xl transition-transform group-hover:scale-105">
          {Icon ? (
            <Icon className="w-6 h-6 md:w-8 md:h-8 text-slate-400 group-hover:text-podPurple transition-colors" />
          ) : (
            <Award className="w-6 h-6 md:w-8 md:h-8 text-slate-400" />
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 pb-12 border-b border-white/5 last:border-0">
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-podCyan transition-colors leading-tight">
            {exp.title}
          </h3>
          <p className="text-slate-300 font-medium text-base md:text-lg mt-1">
            {exp.company}
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-slate-500">
            <span className="flex items-center gap-1.5 font-medium">
              {exp.period} {exp.duration && <span className="text-slate-600">· {exp.duration}</span>}
            </span>
            <span className="flex items-center gap-1.5">
              {exp.location}
            </span>
          </div>
        </div>

        {/* Indented Description with Toggle */}
        <div className="relative">
          <div
            ref={descriptionRef}
            className={`text-slate-400 text-sm md:text-base leading-relaxed whitespace-pre-line border-l-2 border-white/5 pl-4 ml-1 transition-all duration-300 ${!isExpanded ? 'line-clamp-2 overflow-hidden' : ''}`}
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: isExpanded ? 'unset' : '2'
            }}
          >
            {exp.description}
          </div>
          {shouldShowButton && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-5 mt-2 text-xs font-bold text-podCyan hover:text-white transition-colors flex items-center gap-1"
            >
              {isExpanded ? (
                <><ChevronUp className="w-3 h-3" /> ...view less</>
              ) : (
                <><ChevronDown className="w-3 h-3" /> ...view more</>
              )}
            </button>
          )}
        </div>

        {/* Skills Snippet */}
        {exp.skills && exp.skills.length > 0 && (
          <div className="flex items-start gap-2 mt-4">
            <Award className="w-4 h-4 text-slate-500 mt-1 shrink-0" />
            <div className="flex flex-wrap gap-1 items-center">
              {exp.skills.slice(0, 2).map((skill, sIdx) => (
                <span key={sIdx} className="text-sm font-medium text-slate-300">
                  {skill}{sIdx !== 1 ? ', ' : ''}
                </span>
              ))}
              <span className="text-sm font-medium text-slate-300 ml-1">and +10 skills</span>
            </div>
          </div>
        )}

        {/* Featured Media (Army Training Example) */}
        {exp.title.includes("CCNA") && (
          <div className="mt-6">
            <div className="group/img relative w-full max-w-lg aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/images/gk_army.jpg"
                alt="Training session"
                className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 md:py-28 px-4 sm:px-6 bg-podDark relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-8 w-1.5 bg-podPurple rounded-full" />
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Experience</h2>
        </div>

        <div className="space-y-12">
          {EXPERIENCE.map((exp, idx) => (
            <ExperienceItem
              key={idx}
              exp={exp}
              idx={idx}
              isLast={idx === EXPERIENCE.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
