module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        animation: {
          shake: "shake 0.5s",
          pulse: "pulse 1.5s ease infinite",
          bounce: "bounce 1s infinite"
        },
        keyframes: {
          shake: {
            "0%, 100%": { transform: "translateX(0)" },
            "25%": { transform: "translateX(-5px)" },
            "75%": { transform: "translateX(5px)" },
          }
        },
        fontFamily: {
          pixelify: ["Pixelify Sans", "sans-serif"]
        }
      }
    },
    plugins: [],
  }