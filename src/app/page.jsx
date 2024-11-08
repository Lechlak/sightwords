"use client";
import React from "react";
import StylizedButton from "../components/stylized-button";

function MainComponent() {
  const [selectedGrades, setSelectedGrades] = React.useState(["K"]);
  const [correctAnswers, setCorrectAnswers] = React.useState({});
  const [incorrectAnswers, setIncorrectAnswers] = React.useState({});
  const [currentWord, setCurrentWord] = React.useState(null);
  const [showCelebration, setShowCelebration] = React.useState(false);
  const [touchStart, setTouchStart] = React.useState(null);
  const [wordStatus, setWordStatus] = React.useState({});
  const [showWorkingList, setShowWorkingList] = React.useState(false);
  const [showEndOptions, setShowEndOptions] = React.useState(false);
  const [usedWords, setUsedWords] = React.useState(new Set());

  const words = {
    K: [
      "a",
      "and",
      "away",
      "big",
      "blue",
      "can",
      "come",
      "down",
      "find",
      "for",
      "funny",
      "go",
      "help",
      "here",
      "I",
      "in",
      "is",
      "it",
      "jump",
      "little",
      "look",
      "make",
      "me",
      "my",
      "not",
      "one",
      "play",
      "red",
      "run",
      "said",
      "see",
      "the",
      "three",
      "to",
      "two",
      "up",
      "we",
      "where",
      "yellow",
      "you",
      "all",
      "am",
      "are",
      "at",
      "ate",
      "be",
      "black",
      "brown",
      "but",
      "came",
      "did",
      "do",
      "eat",
      "four",
      "get",
      "good",
      "have",
      "he",
      "into",
      "like",
      "must",
      "new",
      "no",
      "now",
      "on",
      "our",
      "out",
      "please",
      "pretty",
      "ran",
      "ride",
      "saw",
      "say",
      "she",
      "so",
      "soon",
      "that",
      "there",
      "they",
      "this",
      "too",
      "under",
      "want",
      "was",
      "well",
      "went",
      "what",
      "white",
      "who",
      "will",
      "with",
      "yes",
    ],
    1: [
      "after",
      "again",
      "an",
      "any",
      "as",
      "ask",
      "by",
      "could",
      "every",
      "fly",
      "from",
      "give",
      "going",
      "had",
      "has",
      "her",
      "him",
      "his",
      "how",
      "just",
      "know",
      "let",
      "live",
      "may",
      "of",
      "old",
      "once",
      "open",
      "over",
      "put",
      "round",
      "some",
      "stop",
      "take",
      "thank",
      "them",
      "then",
      "think",
      "walk",
      "were",
      "when",
    ],
    2: [
      "always",
      "around",
      "because",
      "been",
      "before",
      "best",
      "both",
      "buy",
      "call",
      "cold",
      "does",
      "don't",
      "fast",
      "first",
      "five",
      "found",
      "gave",
      "goes",
      "green",
      "its",
      "made",
      "many",
      "off",
      "or",
      "pull",
      "read",
      "right",
      "sing",
      "sit",
      "sleep",
      "tell",
      "their",
      "these",
      "those",
      "upon",
      "us",
      "use",
      "very",
      "wash",
      "which",
      "why",
      "wish",
      "work",
      "would",
      "write",
      "your",
    ],
    3: [
      "about",
      "better",
      "bring",
      "carry",
      "clean",
      "cut",
      "done",
      "draw",
      "drink",
      "eight",
      "fall",
      "far",
      "full",
      "got",
      "grow",
      "hold",
      "hot",
      "hurt",
      "if",
      "keep",
      "kind",
      "laugh",
      "light",
      "long",
      "much",
      "myself",
      "never",
      "only",
      "own",
      "pick",
      "seven",
      "shall",
      "show",
      "six",
      "small",
      "start",
      "ten",
      "today",
      "together",
      "try",
      "warm",
    ],
  };

  const getAllWords = () => {
    return selectedGrades.reduce((acc, grade) => [...acc, ...words[grade]], []);
  };
  const getRandomWord = () => {
    const allWords = getAllWords().filter((word) => !usedWords.has(word));
    if (allWords.length === 0) return null;
    return allWords[Math.floor(Math.random() * allWords.length)];
  };

  React.useEffect(() => {
    const newWord = getRandomWord();
    setCurrentWord(newWord);
    setUsedWords(new Set());
  }, [selectedGrades]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };
  const handleTouchEnd = (e) => {
    if (!touchStart) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      const newCorrectAnswers = correctAnswers + 1;
      setCorrectAnswers(newCorrectAnswers);
      setWordStatus((prev) => ({ ...prev, [currentWord]: true }));
      setUsedWords((prev) => new Set([...prev, currentWord]));
      if (newCorrectAnswers % 5 === 0) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
      const newWord = getRandomWord();
      if (!newWord) {
        setShowEndOptions(true);
      } else {
        setCurrentWord(newWord);
      }
    }

    setTouchStart(null);
  };

  const handleNext = () => {
    const grade = Object.entries(words).find(([g, list]) =>
      list.includes(currentWord)
    )?.[0];

    if (grade) {
      setCorrectAnswers((prev) => ({
        ...prev,
        [grade]: (prev[grade] || 0) + 1,
      }));
    }

    setWordStatus((prev) => ({ ...prev, [currentWord]: true }));
    setUsedWords((prev) => new Set([...prev, currentWord]));

    const totalCorrect =
      Object.values(correctAnswers).reduce((sum, val) => sum + val, 0) + 1;
    if (totalCorrect % 5 === 0) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }

    const newWord = getRandomWord();
    if (!newWord) {
      setShowEndOptions(true);
    } else {
      setCurrentWord(newWord);
    }
  };

  const handleIncorrect = () => {
    const grade = Object.entries(words).find(([g, list]) =>
      list.includes(currentWord)
    )?.[0];

    if (grade) {
      setIncorrectAnswers((prev) => ({
        ...prev,
        [grade]: (prev[grade] || 0) + 1,
      }));
    }

    setWordStatus((prev) => ({ ...prev, [currentWord]: false }));
    setUsedWords((prev) => new Set([...prev, currentWord]));

    const newWord = getRandomWord();
    if (!newWord) {
      setShowEndOptions(true);
    } else {
      setCurrentWord(newWord);
    }
  };

  const handleEmailList = () => {
    const incorrectWordsByGrade = Object.keys(words).reduce((acc, grade) => {
      const gradeWords = words[grade].filter(
        (word) => wordStatus[word] === false
      );
      if (gradeWords.length > 0) {
        acc[grade] = gradeWords;
      }
      return acc;
    }, {});

    const emailBody = Object.entries(incorrectWordsByGrade)
      .map(([grade, words]) => `Grade ${grade}:\n${words.join(", ")}`)
      .join("\n\n");

    const subject = `Incorrect Words by Grade Level`;
    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(emailBody)}`;
  };

  const totalWords = getAllWords().length;
  const gradeProgress = selectedGrades.reduce((acc, grade) => {
    const total = words[grade].length;
    const correct = correctAnswers[grade] || 0;
    const incorrect = incorrectAnswers[grade] || 0;
    acc[grade] = {
      total,
      progress: total > 0 ? ((correct + incorrect) / total) * 100 : 0,
    };
    return acc;
  }, {});

  const progressWidth =
    totalWords > 0
      ? ((Object.values(correctAnswers).reduce((sum, val) => sum + val, 0) +
          Object.values(incorrectAnswers).reduce((sum, val) => sum + val, 0)) /
          totalWords) *
        100
      : 0;

  return (
    <div className="min-h-screen bg-[#EDECE2] p-8 font-montserrat">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4 bg-[#EDECE2] rounded-lg p-4">
          <div className="w-full h-4 bg-[#474141] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                wordStatus[currentWord] === false
                  ? "bg-red-500"
                  : "bg-[#F5663B]"
              }`}
              style={{ width: `${progressWidth}%` }}
            ></div>
          </div>
        </div>

        {showEndOptions ? (
          <div className="bg-[#EDECE2] rounded-lg p-8 text-center">
            <h2 className="text-[#F5663B] text-4xl font-semibold mb-8">
              Great job!
            </h2>
            <div className="flex flex-col gap-4">
              <StylizedButton
                onClick={() => {
                  setShowEndOptions(false);
                  setCurrentWord(getRandomWord());
                }}
              >
                Try Again
              </StylizedButton>
              <StylizedButton onClick={handleEmailList}>
                Email Words to Practice
              </StylizedButton>
              <StylizedButton
                onClick={() =>
                  setSelectedGrades((prev) => {
                    const allGrades = ["K", "1", "2", "3"];
                    const currentIndex = allGrades.indexOf(prev[0]);
                    return [allGrades[(currentIndex + 1) % allGrades.length]];
                  })
                }
              >
                Next Grade Level
              </StylizedButton>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="flex gap-2 mb-4 md:mb-0">
                {["K", "1", "2", "3"].map((grade) => (
                  <div key={grade} className="flex flex-col items-center">
                    <StylizedButton
                      onClick={() => {
                        setSelectedGrades((prev) =>
                          prev.includes(grade)
                            ? prev.filter((g) => g !== grade)
                            : [...prev, grade]
                        );
                      }}
                    >
                      <span
                        className={
                          selectedGrades.includes(grade)
                            ? "opacity-100"
                            : "opacity-50"
                        }
                      >
                        {grade === "K" ? "K" : grade}{" "}
                        {selectedGrades.includes(grade) && "✓"}
                      </span>
                    </StylizedButton>
                    <div className="text-sm text-[#474141] mt-1">
                      {(correctAnswers[grade] || 0) +
                        (incorrectAnswers[grade] || 0)}
                      /{words[grade].length}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#EDECE2] rounded-lg p-8 text-center">
              {showCelebration && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                  <img
                    src="https://ucarecdn.com/0e034408-9499-4fca-9829-b174bed007d6/"
                    alt="Celebration animation"
                    className="max-w-md"
                  />
                </div>
              )}

              <div
                className="text-6xl mb-8 select-none"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {currentWord}
              </div>
              <div className="flex justify-center gap-8 mb-8">
                <button
                  onClick={handleNext}
                  className="text-7xl text-green-500 hover:text-green-600 transition-colors"
                >
                  ✓
                </button>
                <button
                  onClick={handleIncorrect}
                  className="text-7xl text-red-500 hover:text-red-600 transition-colors"
                >
                  ✗
                </button>
              </div>

              <StylizedButton
                onClick={() => setShowWorkingList(!showWorkingList)}
              >
                {showWorkingList ? "Hide Word List" : "Show Word List"}
              </StylizedButton>

              {showWorkingList && (
                <div>
                  <div className="space-y-6">
                    {Object.entries(words).map(([grade, gradeWords]) => {
                      const gradeIncorrectWords = gradeWords.filter(
                        (word) => wordStatus[word] === false
                      );
                      const gradeCorrectWords = gradeWords.filter(
                        (word) => wordStatus[word] === true
                      );
                      if (
                        (gradeIncorrectWords.length > 0 ||
                          gradeCorrectWords.length > 0) &&
                        selectedGrades.includes(grade)
                      ) {
                        return (
                          <div
                            key={grade}
                            className="bg-[#F5663B] rounded-lg p-4 text-[#EDECE2]"
                          >
                            <h3 className="text-xl font-semibold mb-4">
                              Grade {grade}
                            </h3>
                            {gradeCorrectWords.length > 0 && (
                              <div className="mb-4">
                                <h4 className="font-semibold mb-2">
                                  Correct Words:
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                  {gradeCorrectWords.map((word) => (
                                    <div
                                      key={word}
                                      className="flex items-center gap-2"
                                    >
                                      <span>✓</span>
                                      <span>{word}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {gradeIncorrectWords.length > 0 && (
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Incorrect Words:
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                  {gradeIncorrectWords.map((word) => (
                                    <div
                                      key={word}
                                      className="flex items-center gap-2"
                                    >
                                      <span>✗</span>
                                      <span>{word}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                  <div className="mt-4">
                    <StylizedButton onClick={handleEmailList}>
                      Email Words to Practice
                    </StylizedButton>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MainComponent;