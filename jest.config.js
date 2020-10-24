module.exports = {
  testEnvironment: "node",
  roots: [
    "<rootDir>/src",
    "<rootDir>/packages/"
  ],
  modulePaths: [
    "<rootDir>",
    "<rootDir>/packages/"
  ],
  transform: {
    "\\.[jt]sx?$": "babel-jest"
  },
  verbose: true,
  projects: [
  ],
  setupFilesAfterEnv: ["<rootDir>/test/setupTests.ts"],
  coverageDirectory: "<rootDir>/coverage/",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx,js,jsx}",
    "!<rootDir>/src/**/*.spec.{ts,tsx,js,jsx}",
  ],
  reporters: [
    "default",
    // ["jest-junit", {
    //   outputDirectory: "./reports",
    //   suiteNameTemplate: "{filepath}",
    //   classNameTemplate: "{classname}",
    //   titleTemplate: "{title}"
    // }],
  ],
  testURL: "http://localhost/",
  // moduleNameMapper: {
  //   '.json$': 'identity-obj-proxy',
  // },
  moduleDirectories: [
    "node_modules",
  ],
  snapshotSerializers: [
  ]
};
