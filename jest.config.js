module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  moduleFileExtensions: ["js", "jsx"],
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: ["/node_modules/(?!axios)"],
  globals: {
    "babel-jest": {
      plugins: [
        "@babel/plugin-transform-private-property-in-object",
        "@babel/plugin-transform-modules-commonjs"
      ]
    }
  }
};
