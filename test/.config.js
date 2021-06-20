// https://jestjs.io/docs/en/configuration
module.exports = {
  bail: 1,
  collectCoverage: true,
  collectCoverageFrom: ['lib/[a-z]*.js'],
  coverageDirectory: 'reports',
  // coveragePathIgnorePatterns: ['reports', 'test'],
  rootDir: '..',
  verbose: true
}
