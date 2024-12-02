module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './src',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
  },
  coverageDirectory: '../coverage',
};


  
  