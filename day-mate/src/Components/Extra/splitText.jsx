import { useEffect, useRef } from "react";

const SplitText = ({
  text = "",
  className = "",
  delay = 100,
}) => {
  const words = text.split(" ").map((word) => word.split(""));
  const ref = useRef();

  useEffect(() => {
    const letters = ref.current.getElementsByClassName("letter");
    Array.from(letters).forEach((letter, index) => {
      letter.style.animation = `fadeInUp 0.5s ease-out forwards`;
      letter.style.animationDelay = `${index * delay}ms`;
    });
  }, [delay]);

  return (
    <p
      ref={ref}
      className={className}
      style={{
        display: "inline",
        whiteSpace: "normal",
        wordWrap: "break-word",
      }}
    >
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translate3d(0, 50px, 0);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }
          .letter {
            display: inline-block;
            opacity: 0;
          }
        `}
      </style>
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
        >
          {word.map((letter, letterIndex) => (
            <span
              key={`${wordIndex}-${letterIndex}`}
              className="letter"
            >
              {letter}
            </span>
          ))}
          <span style={{ display: "inline-block", width: "0.3em" }}>&nbsp;</span>
        </span>
      ))}
    </p>
  );
};

export default SplitText;
