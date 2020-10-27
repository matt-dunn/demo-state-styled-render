module.exports = {
  testEnvironment: "jsdom",
  verbose: true,
  roots: [
    "<rootDir>/src/",
    "<rootDir>/packages/"
  ],
  modulePaths: [
    "<rootDir>"
  ],
  coverageDirectory: "<rootDir>/coverage/",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx,js,jsx}",
    "<rootDir>/packages/**/*.{ts,tsx,js,jsx}",
  ],
  snapshotSerializers: [
    "<rootDir>/packages/render/test-utils/jest/serialize-to-json"
  ]
};
