module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper:{
      "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
      "\\.(css|sass)$": "identity-obj-proxy",
      "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
 }

  };