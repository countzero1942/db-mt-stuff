/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
	preset: "ts-jest",
	testEnvironment: "node",
	transform: {
		"^.+.tsx?$": ["ts-jest", {}],
	},
	coveragePathIgnorePatterns: ["/node_modules/"],
	coverageReporters: ["json", "html"],
	coverageDirectory: "coverage",
	moduleNameMapper: {
		// "@/app/*": ["app/*"],
		// "@/utils/*": ["lib/utils/*"],
		// "@/types/*": ["lib/types/*"],
		// "@/server/*": ["lib/server/*"],
		// "@/client-data/*": ["lib/client-data/*"],
		// "@/ui/*": ["lib/ui/*"],
		// "@/styles/*": ["styles/*"]
		"^@/client-data/(.*)$": "<rootDir>/lib/client-data/$1",
		"^@/utils/(.*)$": "<rootDir>/lib/utils/$1",
	},
};

// const nextJest = require("next/jest");

// const createJestConfig = nextJest({
// 	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
// 	dir: "./",
// });

// // Add any custom config to be passed to Jest
// const customJestConfig = {
// 	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
// 	testEnvironment: "jest-environment-jsdom",
// };

// // createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// module.exports = createJestConfig(customJestConfig);
