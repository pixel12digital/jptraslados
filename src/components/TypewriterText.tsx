'use client';

import React from 'react';

const TypewriterText = ({ text }: { text: string }) => {
  return (
    <div className="typewriter-container">
      <p className="typewriter-text font-serif text-2xl text-[#B8860B] italic">
        {text}
      </p>
      <style jsx>{`
        .typewriter-container {
          display: inline-block;
        }
        .typewriter-text {
          overflow: hidden;
          border-right: 2px solid #B8860B;
          white-space: nowrap;
          margin: 0;
          animation: 
            typing 4s steps(40, end) infinite,
            blink-caret 0.75s step-end infinite;
        }
        
        @keyframes typing {
          0%, 100% { width: 0 }
          50% { width: 100% }
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