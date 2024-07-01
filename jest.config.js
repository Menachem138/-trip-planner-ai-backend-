module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  moduleFileExtensions: ["js", "jsx"],
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  globals: {
    "babel-jest": {
      plugins: [
        "@babel/plugin-transform-private-property-in-object"
      ]
    }
  }
};
