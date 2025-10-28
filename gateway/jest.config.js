module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/tests/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  }
};


// Map Node builtin "node:fs" imports (some packages use the node: prefix) to the core 'fs' module
module.exports.moduleNameMapper = {
  '^node:(.*)$': '$1'
  ,
  '^formidable$': '<rootDir>/tests/__mocks__/formidable.js'
};
