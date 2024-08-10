import { Config } from "@jest/types";

const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]s$",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  // collectCoverage: true,
  // collectCoverageFrom: [
  //     '**/*.{ts,tsx}',
  //     '!**/node_modules/**',
  //     '!**/coverage/**',
  //     '!**/src/helper/**',
  //     '!**/src/middleware/**',
  //     '!**/src/config/**'
  // ],
  // coverageReporters: ['lcov', 'text-summary']
};

export default config;
