const express = require('express')
const path = require("path")
const app = express()
require('dotenv').config();
const bodyParser = require('body-parser')
const pino = require('express-pino-logger')();
const mysql =require('mysql')
const session = require("express-session")
const cors = require('cors')
const http = require("http");
const nodemailer = require('nodemailer');
const { resolve4 } = require('dns');
const { Server } = require("socket.io");



const server = http.createServer(app);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", 
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

// verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});


const port = process.env.PORT || 3001


app.use(cors())

// Chat app

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(pino);
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use("/img", express.static(path.join(__dirname, "public/img")));
app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/js", express.static(path.join(__dirname, "public/js")));


// register web development
app.post("/register/web/development", (req, res, next) =>{

  var content = `Email: ${req.body.web_email} \n Name : ${req.body.firstName} ${req.body.lastName} \n Phone number: ${req.body.phoneNumber} \n Country: ${req.body.user_country} \n Course: ${req.body.web_course} \n Country: ${req.body.web_country}`

  var mail = {
    from: req.body.web_email,
    to:process.env.EMAIL,
    subject: 'WEB DEVELOPMENT',
    text: content
  }
  
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
       status: 'success'
      })
    }
  })

})
// course register
app.post("/register/course", (req, res, next) =>{

  var registered_email = req.body.registered_email
  var content = `Email: ${registered_email}\n Name : ${req.body.first_name} ${req.body.last_name}\n Phone number: ${ req.body.phone_number}\n Country: ${req.body.user_country} \n Course: ${req.body.course}`

  var mail = {
    from: registered_email,
    to:process.env.EMAIL,
    subject: 'Online Course Registration',
    text: content
  }
  
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
       status: 'success'
      })
    }
  })

})

// newsletter
app.post("/newsletter", (req, res, next) =>{

  var content = `Email: ${req.body.subEmail}`

  var mail = {
    from: req.body.subEmail,
    to:process.env.EMAIL,
    subject: 'Newsletter Subscribe',
    text: content
  }
  
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
       status: 'success'
      })
    }
  })

})


// contact mail
app.post("/send/mail", (req, res, next) =>{

  const email = req.body.email
  const subject = req.body.subject
  const message = `Email: ${req.body.email} \n\n Message: ${req.body.message}`


  var mail = {
    from: email,
    to:process.env.EMAIL,
    subject:  subject,
    text: message
  }
  
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
       status: 'success'
      })
    }
  })

})
// online tutors
app.post("/online/tutors", (req, res) =>{


  const message = `Email: ${req.body.user_email} \n Name: ${req.body.firstname} ${ req.body.lastname} \n Phone Number: ${req.body.phoneNumber} \n Linkedin:  ${req.body.linkedin}`

  var mailOptions = {
    from: req.body.user_email,
    to:process.env.EMAIL,
    subject: 'Online Tutor',
    text: message
  }
  
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
       status: 'success'
      })
    }
  })

})






  server.listen(port, ()=> console.log('server running on port 3001'))





