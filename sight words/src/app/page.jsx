"use client";
import React from "react";

function MainComponent() {
  const [theme, setTheme] = React.useState("masculine");
  const [selectedGrades, setSelectedGrades] = React.useState([]);
  const [correctAnswers, setCorrectAnswers] = React.useState({});
  const [incorrectAnswers, setIncorrectAnswers] = React.useState({});
  const [currentWord, setCurrentWord] = React.useState(null);
  const [showCelebration, setShowCelebration] = React.useState(false);
  const [touchStart, setTouchStart] = React.useState(null);
  const [wordStatus, setWordStatus] = React.useState({});
  const [showWorkingList, setShowWorkingList] = React.useState(false);
  const [showEndOptions, setShowEndOptions] = React.useState(false);
  const [usedWords, setUsedWords] = React.useState(new Set());
  const [progress, setProgress] = React.useState(0);
  const [customWords, setCustomWords] = React.useState([]);
  const [showCustomWordsModal, setShowCustomWordsModal] = React.useState(false);
  const [customWordsText, setCustomWordsText] = React.useState("");
  const [streak, setStreak] = React.useState(() => {
    const saved = localStorage.getItem("streak");
    return saved ? parseInt(saved) : 0;
  });
  const [totalCorrect, setTotalCorrect] = React.useState(() => {
    const saved = localStorage.getItem("totalCorrect");
    return saved ? parseInt(saved) : 0;
  });
  const [showWarning, setShowWarning] = React.useState(false);

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
    if (customWords.length > 0) {
      return customWords;
    }
    return selectedGrades.reduce((acc, grade) => [...acc, ...words[grade]], []);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const words = text
          .split(/[,\n]/)
          .map((word) => word.trim())
          .filter(Boolean);
        setCustomWordsText(words.join(", "));
      };
      reader.readAsText(file);
    }
  };

  const handleUseCustomWords = () => {
    const words = customWordsText
      .split(",")
      .map((word) => word.trim())
      .filter(Boolean);
    setCustomWords(words);
    setShowCustomWordsModal(false);
    setUsedWords(new Set());
    resetProgress();
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
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

  React.useEffect(() => {
    localStorage.setItem("streak", streak.toString());
    localStorage.setItem("totalCorrect", totalCorrect.toString());
  }, [streak, totalCorrect]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (selectedGrades.length === 0 && customWords.length === 0) {
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 3000);
        return;
      }
      setStreak((s) => s + 1);
      setTotalCorrect((t) => t + 1);
      setWordStatus((prev) => ({ ...prev, [currentWord]: true }));
      setUsedWords((prev) => new Set([...prev, currentWord]));
      updateProgress();
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
    if (selectedGrades.length === 0 && customWords.length === 0) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
      return;
    }

    const grade = Object.entries(words).find(([g, list]) =>
      list.includes(currentWord)
    )?.[0];

    if (grade) {
      setCorrectAnswers((prev) => ({
        ...prev,
        [grade]: (prev[grade] || 0) + 1,
      }));
    }

    setStreak((s) => s + 1);
    setTotalCorrect((t) => t + 1);
    setWordStatus((prev) => ({ ...prev, [currentWord]: true }));
    setUsedWords((prev) => new Set([...prev, currentWord]));

    updateProgress();

    const newWord = getRandomWord();
    if (!newWord) {
      setShowEndOptions(true);
    } else {
      setCurrentWord(newWord);
    }
  };

  const handleIncorrect = () => {
    if (selectedGrades.length === 0 && customWords.length === 0) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
      return;
    }

    const grade = Object.entries(words).find(([g, list]) =>
      list.includes(currentWord)
    )?.[0];

    if (grade) {
      setIncorrectAnswers((prev) => ({
        ...prev,
        [grade]: (prev[grade] || 0) + 1,
      }));
    }

    setStreak(0);
    setWordStatus((prev) => ({ ...prev, [currentWord]: false }));
    setUsedWords((prev) => new Set([...prev, currentWord]));

    const newWord = getRandomWord();
    if (!newWord) {
      setShowEndOptions(true);
    } else {
      setCurrentWord(newWord);
    }
  };

  const handleSpeak = () => {
    if (currentWord) {
      fetch(`/integrations/text-to-speech/speech?text=${currentWord}`)
        .then((response) => response.blob())
        .then((blob) => {
          const audio = new Audio(URL.createObjectURL(blob));
          audio.play();
        });
    }
  };

  const updateProgress = () => {
    setProgress((prev) => {
      const newProgress = prev + 1;
      if (newProgress >= 5) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
        return 0;
      }
      return newProgress;
    });
  };

  const resetProgress = () => {
    setCorrectAnswers({});
    setIncorrectAnswers({});
    setWordStatus({});
    setUsedWords(new Set());
    setCurrentWord(getRandomWord());
    setProgress(0);
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

    const subject = `Words to practice by Grade Level`;
    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(emailBody)}`;
  };

  return (
    <div
      className="min-h-screen p-8 font-montserrat"
      style={{
        background:
          theme === "masculine"
            ? "#D6E1E8"
            : theme === "feminine"
            ? "#FFF0F5"
            : "#FFFFFF",
      }}
    >
      <div className="max-w-2xl mx-auto relative">
        <div className="absolute right-0 top-0 flex gap-2">
          <button
            onClick={() => setTheme("masculine")}
            className="border-2 text-2xl p-1 rounded-lg hover:opacity-80 transition-opacity"
            style={{
              borderColor: theme === "masculine" ? "#2B4C7E" : "transparent",
            }}
          >
            🥏
          </button>
          <button
            onClick={() => setTheme("feminine")}
            className="border-2 text-2xl p-1 rounded-lg hover:opacity-80 transition-opacity"
            style={{
              borderColor: theme === "feminine" ? "#FF6B98" : "transparent",
            }}
          >
            🌸
          </button>
          <button
            onClick={() => setTheme("highContrast")}
            className="border-2 text-2xl p-1 rounded-lg hover:opacity-80 transition-opacity"
            style={{
              borderColor: theme === "highContrast" ? "#000000" : "transparent",
            }}
          >
            ⚡
          </button>
        </div>
        <h1
          className="text-xl font-bold mb-8"
          style={{
            color:
              theme === "masculine"
                ? "#1D1D1D"
                : theme === "feminine"
                ? "#2D2D2D"
                : "#000000",
          }}
        >
          Sight Words
        </h1>
        {showEndOptions ? (
          <div
            className="rounded-lg p-8 text-center"
            style={{
              background:
                theme === "masculine"
                  ? "#FFFFFF"
                  : theme === "feminine"
                  ? "#FFFFFF"
                  : "#FFFFFF",
              color:
                theme === "masculine"
                  ? "#1D1D1D"
                  : theme === "feminine"
                  ? "#2D2D2D"
                  : "#000000",
            }}
          >
            <h2
              className="text-4xl font-semibold mb-8"
              style={{
                color:
                  theme === "masculine"
                    ? "#2B4C7E"
                    : theme === "feminine"
                    ? "#FF6B98"
                    : "#000000",
              }}
            >
              Great job!
            </h2>
            <div className="flex flex-col gap-4">
              <div className="text-2xl mb-4">
                {customWords.length > 0 ? (
                  <span>
                    You completed {usedWords.size} out of {customWords.length}{" "}
                    words!
                  </span>
                ) : (
                  <span>You completed all selected grade levels!</span>
                )}
              </div>
              <button
                onClick={() => {
                  resetProgress();
                  setShowEndOptions(false);
                }}
                className="px-6 py-3 rounded-lg text-white transition-colors mx-auto"
                style={{
                  background:
                    theme === "masculine"
                      ? "#2B4C7E"
                      : theme === "feminine"
                      ? "#FF6B98"
                      : "#000000",
                }}
              >
                Play Again
              </button>
              <button
                onClick={handleEmailList}
                className="px-6 py-3 rounded-lg transition-colors mx-auto"
                style={{
                  background:
                    theme === "masculine"
                      ? "#1D1D1D"
                      : theme === "feminine"
                      ? "#2D2D2D"
                      : "#000000",
                  color: "white",
                }}
              >
                Email Word List
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="flex gap-2 mb-4 md:mb-0">
                {selectedGrades.length === 0 && customWords.length === 0 && (
                  <div
                    className="absolute top-8 animate-bounce"
                    style={{
                      color:
                        theme === "masculine"
                          ? "#2B4C7E"
                          : theme === "feminine"
                          ? "#FF6B98"
                          : "#000000",
                    }}
                  >
                    <i className="fas fa-arrow-down text-2xl"> </i> &nbsp; Pick
                    a grade level
                  </div>
                )}
                {["K", "1", "2", "3"].map((grade) => (
                  <div key={grade} className="flex flex-col items-center">
                    <button
                      onClick={() => {
                        if (selectedGrades.includes(grade)) {
                          setSelectedGrades(
                            selectedGrades.filter((g) => g !== grade)
                          );
                        } else {
                          setSelectedGrades([...selectedGrades, grade]);
                        }
                      }}
                      className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium transition-colors"
                      style={{
                        background: selectedGrades.includes(grade)
                          ? theme === "masculine"
                            ? "#2B4C7E"
                            : theme === "feminine"
                            ? "#FF6B98"
                            : "#000000"
                          : "transparent",
                        color: selectedGrades.includes(grade)
                          ? "white"
                          : theme === "masculine"
                          ? "#2B4C7E"
                          : theme === "feminine"
                          ? "#FF6B98"
                          : "#000000",
                        border: selectedGrades.includes(grade)
                          ? "none"
                          : `2px solid ${
                              theme === "masculine"
                                ? "#2B4C7E"
                                : theme === "feminine"
                                ? "#FF6B98"
                                : "#000000"
                            }`,
                      }}
                    >
                      {grade}
                    </button>
                    <div
                      className="text-sm mt-1"
                      style={{
                        color:
                          theme === "masculine"
                            ? "#1D1D1D"
                            : theme === "feminine"
                            ? "#2D2D2D"
                            : "#000000",
                      }}
                    >
                      {(correctAnswers[grade] || 0) +
                        (incorrectAnswers[grade] || 0)}
                      /{words[grade].length}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowCustomWordsModal(true)}
                className="px-4 py-2 rounded-lg text-white transition-colors"
                style={{
                  background:
                    theme === "masculine"
                      ? "#2B4C7E"
                      : theme === "feminine"
                      ? "#FF6B98"
                      : "#000000",
                }}
              >
                Custom Words
              </button>
            </div>

            <div
              className="rounded-lg p-8 text-center"
              style={{
                background:
                  theme === "masculine"
                    ? "#FFFFFF"
                    : theme === "feminine"
                    ? "#FFFFFF"
                    : "#FFFFFF",
                color:
                  theme === "masculine"
                    ? "#1D1D1D"
                    : theme === "feminine"
                    ? "#2D2D2D"
                    : "#000000",
              }}
            >
              {customWords.length > 0 && (
                <div className="mb-4 text-lg">
                  Progress: {usedWords.size}/{customWords.length} words
                </div>
              )}
              {showCustomWordsModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div
                    className="rounded-lg p-6 max-w-lg w-full"
                    style={{
                      background:
                        theme === "masculine"
                          ? "#D6E1E8"
                          : theme === "feminine"
                          ? "#FFF0F5"
                          : "#FFFFFF",
                      color:
                        theme === "masculine"
                          ? "#1D1D1D"
                          : theme === "feminine"
                          ? "#2D2D2D"
                          : "#000000",
                    }}
                  >
                    <h3 className="text-xl font-medium mb-4">Custom Words</h3>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Paste words (comma-separated)
                      </label>
                      <textarea
                        value={customWordsText}
                        onChange={(e) => setCustomWordsText(e.target.value)}
                        className="w-full h-32 p-2 border rounded-lg"
                        placeholder="Example: cat, dog, house"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Or upload CSV file
                      </label>
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="w-full"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setCustomWords([]);
                          setCustomWordsText("");
                          setShowCustomWordsModal(false);
                        }}
                        className="px-4 py-2 rounded-lg transition-colors"
                        style={{
                          background:
                            theme === "masculine"
                              ? "#1D1D1D"
                              : theme === "feminine"
                              ? "#2D2D2D"
                              : "#000000",
                          color: "white",
                        }}
                      >
                        Clear
                      </button>
                      <button
                        onClick={() => setShowCustomWordsModal(false)}
                        className="px-4 py-2 rounded-lg transition-colors"
                        style={{
                          border: `2px solid ${
                            theme === "masculine"
                              ? "#2B4C7E"
                              : theme === "feminine"
                              ? "#FF6B98"
                              : "#FFD700"
                          }`,
                          color:
                            theme === "masculine"
                              ? "#2B4C7E"
                              : theme === "feminine"
                              ? "#FF6B98"
                              : "#FFD700",
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleUseCustomWords}
                        className="px-4 py-2 rounded-lg text-white transition-colors"
                        style={{
                          background:
                            theme === "masculine"
                              ? "#2B4C7E"
                              : theme === "feminine"
                              ? "#FF6B98"
                              : "#FFD700",
                        }}
                      >
                        Use Custom Words
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {showCelebration && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="relative w-full h-full">
                    {Array.from({ length: 50 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `-20px`,
                          width: "10px",
                          height: "10px",
                          background: ["#FFD700", "#FF6B98", "#2B4C7E"][
                            Math.floor(Math.random() * 3)
                          ],
                          animation: `confetti 1s ease-out ${
                            Math.random() * 3
                          }s forwards`,
                        }}
                      />
                    ))}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <div className="text-4xl font-bold text-white mb-4">
                        {streak} in a row! 🎯
                      </div>
                      <div className="text-2xl text-white">
                        Total correct: {totalCorrect}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-4 mb-8">
                <div
                  className="text-6xl select-none"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  style={{
                    color:
                      theme === "masculine"
                        ? "#1D1D1D"
                        : theme === "feminine"
                        ? "#2D2D2D"
                        : "#000000",
                  }}
                >
                  {currentWord}
                </div>
                <button
                  onClick={handleSpeak}
                  className="text-4xl transition-colors"
                  style={{
                    color:
                      theme === "masculine"
                        ? "#2B4C7E"
                        : theme === "feminine"
                        ? "#FF6B98"
                        : "#FFD700",
                  }}
                >
                  <i className="fas fa-volume-up"></i>
                </button>
              </div>
              <div className="flex justify-center gap-8 mb-8">
                <button
                  onClick={handleNext}
                  className="text-7xl transition-colors"
                  style={{
                    color:
                      theme === "masculine"
                        ? "#2B4C7E"
                        : theme === "feminine"
                        ? "#FF6B98"
                        : "#FFD700",
                  }}
                >
                  ✓
                </button>
                <button
                  onClick={handleIncorrect}
                  className="text-7xl transition-colors"
                  style={{
                    color:
                      theme === "masculine"
                        ? "#1D1D1D"
                        : theme === "feminine"
                        ? "#2D2D2D"
                        : "#000000",
                  }}
                >
                  ✗
                </button>
              </div>
              <div className="flex flex-col items-center gap-2 mb-4">
                <div className="flex justify-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className="text-4xl">
                      {i < progress ? "🎉" : "⚪"}
                    </span>
                  ))}
                </div>
                <div className="text-lg">
                  Current streak: {streak} • Total correct: {totalCorrect}
                </div>
              </div>
              <button
                onClick={() => setShowWorkingList(true)}
                className="px-6 py-3 rounded-lg text-white transition-colors mx-auto"
                style={{
                  background:
                    theme === "masculine"
                      ? "#2B4C7E"
                      : theme === "feminine"
                      ? "#FF6B98"
                      : "#000",
                }}
              >
                View Progress
              </button>

              {showWorkingList && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                      <h3
                        className="text-2xl font-medium"
                        style={{
                          color:
                            theme === "masculine"
                              ? "#2B4C7E"
                              : theme === "feminine"
                              ? "#FF6B98"
                              : "#000",
                        }}
                      >
                        Progress Report
                      </h3>
                      <button
                        onClick={() => setShowWorkingList(false)}
                        className="text-xl transition-colors"
                        style={{
                          color:
                            theme === "masculine"
                              ? "#1D1D1D"
                              : theme === "feminine"
                              ? "#2D2D2D"
                              : "#000000",
                        }}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
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
                                className="rounded-lg p-4"
                                style={{
                                  background:
                                    theme === "masculine"
                                      ? "#fff"
                                      : theme === "feminine"
                                      ? "#fff"
                                      : "#fff",
                                  color: "black",
                                }}
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
                      <div className="mt-4"></div>
                    </div>
                    <div className="flex justify-center mt-6">
                      <button
                        onClick={handleEmailList}
                        className="px-6 py-3 rounded-lg text-white transition-colors"
                        style={{
                          background:
                            theme === "masculine"
                              ? "#2B4C7E"
                              : theme === "feminine"
                              ? "#FF6B98"
                              : "#000",
                        }}
                      >
                        Email List
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {showWarning && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg">
          Please select a grade level or add custom words first
        </div>
      )}
      <style jsx global>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default MainComponent;