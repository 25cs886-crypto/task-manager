export default [
	{
		ignores: ["dist/**", "node_modules/**"],
	},
	{
		files: ["**/*.{js,jsx}"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				AbortController: "readonly",
				Blob: "readonly",
				clearTimeout: "readonly",
				console: "readonly",
				document: "readonly",
				File: "readonly",
				fetch: "readonly",
				FormData: "readonly",
				IntersectionObserver: "readonly",
				localStorage: "readonly",
				navigator: "readonly",
				ResizeObserver: "readonly",
				setTimeout: "readonly",
				sessionStorage: "readonly",
				URL: "readonly",
				URLSearchParams: "readonly",
				window: "readonly",
			},
		},
	},
];
