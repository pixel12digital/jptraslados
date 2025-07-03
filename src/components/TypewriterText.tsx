'use client';

import React, { useEffect, useRef, useState } from 'react';

const TypewriterText = ({ text }: { text: string }) => {
  const [startTyping, setStartTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartTyping(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="typewriter-container" ref={containerRef}>
      <p className={`typewriter-text font-serif text-2xl text-[#B8860B] italic${startTyping ? ' animate-typewriter' : ''}`}
         style={{ maxWidth: '100%', whiteSpace: 'normal', wordBreak: 'break-word' }}>
        {text}
      </p>
      <style jsx>{`
        .typewriter-container {
          display: inline-block;
        }
        .typewriter-text {
          overflow: hidden;
          border-right: 2px solid #B8860B;
          white-space: normal;
          word-break: break-word;
          margin: 0;
        }
        .animate-typewriter {
          animation: typing 4s steps(40, end) 1, blink-caret 0.75s step-end 5;
        }
        @keyframes typing {
          0% { width: 0 }
          100% { width: 100% }
        }
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #B8860B }
        }
      `}</style>
    </div>
  );
};

export default TypewriterText; 