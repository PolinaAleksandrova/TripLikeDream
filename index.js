const App = require('./app2');
const connect = require('./database');

const app = new App();
connect();

app.start();
