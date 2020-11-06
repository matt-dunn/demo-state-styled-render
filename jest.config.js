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
  ],
  "moduleNameMapper": {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/etc/test/mock.js"
  }
};
