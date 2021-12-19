const express = require('express')
const morgan = require('morgan')
const path = require('path')
//Routes
const authRouter = require('./routes/authRouter')
const defaultRout = require("./routes")
const adminRout = require("./routes/admin")
const personalAreaRout = require('./routes/personalAreaRout')
const adminAreaRout = require('./routes/adminAreaRout')
const cookieParser = require('cookie-parser')

module.exports = class Applicaction {
    constructor() {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set('port', 4000);
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', '.pug');
    }
    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(express.json());
        this.app.use(cookieParser())
    }
    routes() {
        this.app.use("/AreaP", personalAreaRout)
        this.app.use("/AreaA", adminAreaRout)
        this.app.use("/auth", authRouter)
        this.app.use('/', defaultRout);
        this.app.use('/admin', adminRout);
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(express.static(path.join(__dirname, 'uploads')));
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('>>> Server is running at', this.app.get('port'));
            return;
        });
    }
}
