// initial
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const fileUpload = require('express-fileupload')

require('dotenv').config()
const app = express()
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: '10mb',
    })
)

app.use(bodyParser.json({ limit: '10mb', extended: true }))

//options swagger

const options = {
    definition: {
        info: {
            title: 'TLCN K19 API',
            version: '1.0.0',
            description: 'TLCN K19  Ecommerce API',
        },
        servers: ['http://localhost:5000'],
    },
    apis: ['./routes/*.js'],
}
const specs = swaggerJsDoc(options)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

const expressSession = require('express-session')
app.use(
    expressSession({
        secret: process.env.EXPRESS_SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
)

var passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())

//cors
const cors = require('cors')
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://tlcn-admin-hln.vercel.app',
        'https://ecom-nlh-v3.vercel.app',
        'https://e-com-nlh-fe.vercel.app',
        'https://kltn-fe-ql.vercel.app/'
    ],
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,

}
app.use(cors(corsOptions))

// middle ware for dev log
const morgan = require('morgan')

if (process.env.NODE_ENV == 'develop') {
    app.use(morgan('dev'))
}
//
app.use(cookieParser())
    //
app.use(express.json())
    //routes
const route = require('./src/routes')

route(app)

// Error
const errorHandler = require('./src/middleware/error')
app.use(errorHandler)

// Handle Unhandled Promise rejections
process.on('unhandledRejection', (err) => {
        console.log(`ERROR: ${err.stack}`)
        console.log('Shutting down the server due to Unhandled Promise rejection')
        server.close(() => {
            process.exit(1)
        })
    })
    // Handle Uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`ERROR: ${err.stack}`)
    console.log('Shutting down due to uncaught exception')
    process.exit(1)
})

// db
const db = require('./src/config/db')

db.connect()

//context
const PORT = process.env.PORT
    //

const server = app.listen(PORT || 5000, () =>
    console.log('Server start on port ' + PORT)
)
const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: [
            'http://localhost:3000',
            'https://ecom-nlh-v3.vercel.app',
            'https://tlcn-admin-hln.vercel.app',
        ],
        // credentials: true,
    },
})

io.on('connection', (socket) => {
    console.log('Connected to socket.io')
    socket.on('setup', (userData) => {
        socket.join(userData._id)
        socket.emit('connected')
    })

    socket.on('join chat', (room) => {
        socket.join(room)
        console.log('User Joined Room: ' + room)
    })
    socket.on('typing', (room) => socket.in(room).emit('typing'))
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'))

    socket.on('new message', (newMessageRecieved) => {
        var chat = newMessageRecieved.chat

        if (!chat.users) return console.log('chat.users not defined')

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return

            socket.in(user._id).emit('message recieved', newMessageRecieved)
        })
    })

    socket.off('setup', () => {
        console.log('USER DISCONNECTED')
        socket.leave(userData._id)
    })
})