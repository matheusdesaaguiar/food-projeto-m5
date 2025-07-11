export default {
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  testEnvironment: "node",
};


//configuração necessária pois o jest entende por padrão o common js e não o ES6 modules, assim ele trasnforma  e aceita