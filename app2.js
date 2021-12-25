const express = require('express')
const morgan = require('morgan')
const path = require('path')
//Routes
const authRouter = require('./routes/authRouter')
const defaultRout = require("./routes")
const adminRout = require("./routes/admin")
const wantVisit = require("./routes/wantVisit")
const alreadyVisit = require("./routes/alreadyVisit")
const personalAreaRout = require('./routes/personalAreaRout')
const cookieParser = require('cookie-parser')
const eventsRout = require('./routes/event')
const feedbackRout = require('./routes/feedback')
const articleRout = require('./routes/article')

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
        this.app.use("/eventR", eventsRout)
        this.app.use("/articleR", articleRout)
        this.app.use("/feedbackR", feedbackRout)
        this.app.use("/AreaP", personalAreaRout)
        this.app.use("/auth", authRouter)
        this.app.use('/', defaultRout);
        this.app.use('/admin', adminRout);
        this.app.use('/wantVisit', wantVisit);
        this.app.use('/alreadyVisit', alreadyVisit);
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
