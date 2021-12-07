const App = require('./app');
const connect = require('./database');

const app = new App();
connect();

app.start();
