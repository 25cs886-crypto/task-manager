/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Manrope", "ui-sans-serif", "sans-serif"],
			},
			colors: {
				brand: {
					50: "#f3f7ff",
					100: "#e3ebff",
					500: "#2251cc",
					700: "#17367f",
				},
				accent: {
					500: "#0f9d7a",
				},
			},
			boxShadow: {
				panel: "0 20px 40px -24px rgba(27, 44, 109, 0.3)",
			},
		},
	},
	plugins: [],
};
