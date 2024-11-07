// jest.config.js
module.exports = {
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/__mocks__/fileMock.js',
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],  // Inclut 'ts' et 'tsx' si tu utilises TypeScript
  setupFilesAfterEnv: ["jest-fetch-mock"],
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)",  // Ajoute cette ligne pour inclure `axios` dans la transformation
  ],
};
