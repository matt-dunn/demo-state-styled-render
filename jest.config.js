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
    // Don't collect coverage from the packages for now as it's only example / test code...
    // "<rootDir>/packages/**/*.{ts,tsx,js,jsx}",
  ],
  snapshotSerializers: [
    "<rootDir>/packages/render/test-utils/jest/serialize-to-json"
  ],
  reporters: [
    "default",
    ["jest-junit", {
      outputDirectory: "./reports",
      suiteNameTemplate: "{filepath}",
      classNameTemplate: "{classname}",
      titleTemplate: "{title}"
    }],
  ]
};
