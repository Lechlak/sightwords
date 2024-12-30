"use client";
import React from "react";

function StyleGuide() {
  const [theme, setTheme] = React.useState("masculine");

  const themes = {
    masculine: {
      primary: "#2B4C7E",
      secondary: "#4A6FA5",
      accent: "#6B8FB7",
      background: "#D6E1E8",
      text: "#1D1D1D",
      success: "#34D399",
      error: "#EF4444",
      button: {
        primary: "#2B4C7E",
        secondary: "#4A6FA5",
        text: "#FFFFFF",
        hover: {
          primary: "#1A3B6D",
          secondary: "#395C92",
        },
      },
    },
    feminine: {
      primary: "#FF6B98",
      secondary: "#FF89AB",
      accent: "#FFA7BE",
      background: "#FFF0F5",
      text: "#2D2D2D",
      success: "#34D399",
      error: "#EF4444",
      button: {
        primary: "#FF6B98",
        secondary: "#FF89AB",
        text: "#FFFFFF",
        hover: {
          primary: "#FF4D85",
          secondary: "#FF6B98",
        },
      },
    },
    highContrast: {
      primary: "#000000",
      secondary: "#333333",
      accent: "#666666",
      background: "#FFFFFF",
      text: "#000000",
      success: "#008000",
      error: "#FF0000",
      button: {
        primary: "#000000",
        secondary: "#333333",
        text: "#FFFFFF",
        hover: {
          primary: "#1A1A1A",
          secondary: "#4D4D4D",
        },
      },
    },
  };

  const currentTheme = themes[theme];

  return (
    <div
      className="min-h-screen p-8 font-montserrat"
      style={{ background: currentTheme.background }}
    >
      <div className="fixed top-4 right-4 flex gap-2">
        {Object.keys(themes).map((themeName) => (
          <button
            key={themeName}
            onClick={() => setTheme(themeName)}
            className="text-2xl p-2 rounded-lg hover:opacity-80 transition-opacity"
            style={{
              background:
                theme === themeName ? themes[themeName].primary : "transparent",
            }}
          >
            {themeName === "masculine"
              ? "🔷"
              : themeName === "feminine"
              ? "🌸"
              : "⚡"}
          </button>
        ))}
      </div>

      <div className="max-w-4xl mx-auto">
        <h1
          className="text-4xl font-semibold mb-12"
          style={{ color: currentTheme.text }}
        >
          Style Guide
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl mb-6" style={{ color: currentTheme.text }}>
            Colors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(themes).map(([themeName, colors]) => (
              <div key={themeName} className="space-y-4">
                <h3
                  className="text-xl capitalize"
                  style={{ color: currentTheme.text }}
                >
                  {themeName} Theme
                </h3>
                <div className="flex flex-col gap-4">
                  {["primary", "secondary", "accent", "background", "text"].map(
                    (colorKey) => (
                      <div key={colorKey} className="flex flex-col">
                        <div
                          className="h-24 rounded-lg"
                          style={{ background: colors[colorKey] }}
                        ></div>
                        <p
                          className="mt-2"
                          style={{ color: currentTheme.text }}
                        >
                          {colors[colorKey]}
                        </p>
                        <p
                          className="text-sm capitalize"
                          style={{ color: currentTheme.text }}
                        >
                          {colorKey}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl mb-6" style={{ color: currentTheme.text }}>
            Typography
          </h2>
          <div className="space-y-6">
            {[
              { level: "h1", size: "text-4xl", text: "Heading 1" },
              { level: "h2", size: "text-2xl", text: "Heading 2" },
              { level: "p", size: "text-lg", text: "Body Text" },
              { level: "small", size: "text-sm", text: "Small Text" },
            ].map((item) => (
              <div key={item.level}>
                <div
                  className={`${item.size} font-semibold`}
                  style={{ color: currentTheme.text }}
                >
                  {item.text}
                </div>
                <p
                  className="text-sm mt-2"
                  style={{ color: currentTheme.text }}
                >
                  font-montserrat {item.size} font-semibold
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl mb-6" style={{ color: currentTheme.text }}>
            Buttons
          </h2>
          <div className="space-y-4">
            <div>
              <button
                className="px-6 py-3 rounded-lg transition-all hover:opacity-90"
                style={{
                  background: currentTheme.button.primary,
                  color: currentTheme.button.text,
                }}
              >
                Primary Button
              </button>
            </div>
            <div>
              <button
                className="px-6 py-3 rounded-lg transition-all hover:opacity-90"
                style={{
                  background: currentTheme.button.secondary,
                  color: currentTheme.button.text,
                }}
              >
                Secondary Button
              </button>
            </div>
            <div>
              <button
                className="text-4xl transition-colors"
                style={{ color: currentTheme.success }}
              >
                ✓
              </button>
              <button
                className="text-4xl transition-colors ml-4"
                style={{ color: currentTheme.error }}
              >
                ✗
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function StyleGuideStory() {
  return <StyleGuide />;
}

export default StyleGuide;