module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  moduleFileExtensions: ["js", "jsx"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: ["/node_modules/(?!(axios|other-es6-module))"]
};
