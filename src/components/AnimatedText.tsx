import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const AnimatedChar: React.FC<CharProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const isSpace = char === ' ';

  return (
    <span className={`relative inline-block ${isSpace ? 'w-[0.35em] sm:w-[0.45em]' : ''}`}>
      <span className="opacity-0 select-none">
        {isSpace ? '\u00A0' : char}
      </span>
      <motion.span style={{ opacity }} className="absolute inset-0">
        {isSpace ? '\u00A0' : char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', style }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalCharacters = text.length;

  let globalCharIndex = 0;

  return (
    <p
      ref={containerRef}
      className={`relative select-text ${className}`}
      style={style}
    >
      {words.map((word, wordIndex) => {
        const wordChars = word.split('');
        const renderedWord = (
          <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap">
            {wordChars.map((char) => {
              const start = globalCharIndex / totalCharacters;
              const step = 1 / totalCharacters;
              const end = Math.min(1, start + step * 2);
              globalCharIndex += 1;

              return (
                <AnimatedChar
                  key={`char-${globalCharIndex}`}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
        );

        // Account for space after word with comfortable spacing
        if (wordIndex < words.length - 1) {
          const spaceStart = globalCharIndex / totalCharacters;
          const spaceStep = 1 / totalCharacters;
          const spaceEnd = Math.min(1, spaceStart + spaceStep * 2);
          globalCharIndex += 1;

          return (
            <React.Fragment key={`frag-${wordIndex}`}>
              {renderedWord}
              <AnimatedChar
                char=" "
                progress={scrollYProgress}
                range={[spaceStart, spaceEnd]}
              />
            </React.Fragment>
          );
        }

        return <React.Fragment key={`frag-${wordIndex}`}>{renderedWord}</React.Fragment>;
      })}
    </p>
  );
};
