module.exports = {
  transform: {
    '\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'ts'],
  moduleDirectories: ['node_modules'],
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'html'],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/__tests__/**/*.spec.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
};
