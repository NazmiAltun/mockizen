module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverage: true,
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
