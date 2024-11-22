/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ['**/*.test.ts'],
  watchPathIgnorePatterns: ['node_modules/', 'dist/', '.docker/'],
};