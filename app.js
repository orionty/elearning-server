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


const stripe = require("stripe")('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');


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
    origin: "https://esurde.com",
    allowedHeaders: ["my-custom-header"],
    credentials: true
    
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

app.get("/", (req, res) => {
  res.send("Hello API")
}); 
// stripe for web development
app.post("/web-development-payment-intent", async (req, res) => {
  
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 4065,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
// stripe for mobile app development
app.post("/app-development-payment-intent", async (req, res) => {


  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 4467,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
// stripe for data science
app.post("/data-science-payment-intent", async (req, res) => {
  

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 3599,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
// stripe for Artificial Intelligence
app.post("/artificial-intelligence-payment-intent", async (req, res) => {
  

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 3699,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
// stripe for Machine Learning
app.post("/machine-learning-payment-intent", async (req, res) => {
 
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 3699,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
// stripe for Python
app.post("/python-payment-intent", async (req, res) => {

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 4599,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
// stripe for java
app.post("/java-payment-intent", async (req, res) => {

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 4499,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// stripe for C++
app.post("/cplus-payment-intent", async (req, res) => {

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 4599,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
// stripe for graphic designing
app.post("/graphic-designing-payment-intent", async (req, res) => {
  

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 3346,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


// register web development
app.post("/register/web/development", (req, res, next) =>{

  var content = `Email: ${req.body.web_email} \n Name : ${req.body.firstName} ${req.body.lastName} \n Phone number: ${req.body.phoneNumber} \n Country: ${req.body.web_country} \n Course: ${req.body.web_course} `

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
// register graphic designing
app.post("/register/graphic/designing", (req, res, next) =>{

  var content = `Email: ${req.body.design_email} \n Name : ${req.body.firstname} ${req.body.lastname} \n Phone number: ${req.body.phonenumber} \n Country: ${req.body.design_country} \n Course: ${req.body.design_course} `

  var mail = {
    from: req.body.web_email,
    to:process.env.EMAIL,
    subject: 'GRAPHIC DESIGNING',
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
// register app development
app.post("/register/app/development", (req, res, next) =>{

  var content = `Email: ${req.body.app_email} \n Name : ${req.body.AppFirstname} ${req.body.AppLastname} \n Phone number: ${req.body.AppPhonenumber} \n Country: ${req.body.app_country} \n Course: ${req.body.app_course} `

  var mail = {
    from: req.body.app_email,
    to:process.env.EMAIL,
    subject: 'MOBILE APP DEVELOPMENT',
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
// register data science
app.post("/register/data/science", (req, res, next) =>{

  var content = `Email: ${req.body.data_email} \n Name : ${req.body.DataFirstname} ${req.body.DataLastname} \n Phone number: ${req.body.DataPhonenumber} \n Country: ${req.body.data_country} \n Course: ${req.body.data_course} `

  var mail = {
    from: req.body.data_email,
    to:process.env.EMAIL,
    subject: 'DATA SCIENCE',
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
// register Cplus
app.post("/register/Cplus", (req, res, next) =>{

  var content = `Email: ${req.body.cp_email} \n Name : ${req.body.CpFirstname} ${req.body.CpLastname} \n Phone number: ${req.body.CpPhonenumber} \n Country: ${req.body.cp_country} \n Course: ${req.body.cp_course} `

  var mail = {
    from: req.body.cp_email,
    to:process.env.EMAIL,
    subject: 'C++',
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
// register Python
app.post("/register/python", (req, res, next) =>{

  var content = `Email: ${req.body.Python_email} \n Name : ${req.body.PythonFirstName} ${req.body.PythonLastname} \n Phone number: ${req.body.PythonPhoneNumber} \n Country: ${req.body.Python_country} \n Course: ${req.body.Python_course} `

  var mail = {
    from: req.body.Python_email,
    to:process.env.EMAIL,
    subject: 'PYTHON',
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
// register Java
app.post("/register/java", (req, res, next) =>{

  var content = `Email: ${req.body.Java_email} \n Name : ${req.body.JavaFirstName} ${req.body.JavaLastname} \n Phone number: ${req.body.JavaPhoneNumber} \n Country: ${req.body.Java_country} \n Course: ${req.body.Java_course} `

  var mail = {
    from: req.body.Java_email,
    to:process.env.EMAIL,
    subject: 'JAVA',
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
// register Machine Learning
app.post("/register/machine/learning", (req, res, next) =>{

  var content = `Email: ${req.body.ML_email} \n Name : ${req.body.MLFirstName} ${req.body.MLLastname} \n Phone number: ${req.body.MLPhoneNumber} \n Country: ${req.body.ML_country} \n Course: ${req.body.ML_course} `

  var mail = {
    from: req.body.ML_email,
    to:process.env.EMAIL,
    subject: 'MACHINE LEARNING',
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
// register Artificial Intelligence
app.post("/register/artificial/intelligence", (req, res, next) =>{

  var content = `Email: ${req.body.AI_email} \n Name : ${req.body.AIFirstName} ${req.body.AILastname} \n Phone number: ${req.body.AIPhoneNumber} \n Country: ${req.body.AI_country} \n Course: ${req.body.AI_course} `

  var mail = {
    from: req.body.AI_email,
    to:process.env.EMAIL,
    subject: 'ARTIFICIAL INTELLIGENCE',
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
  var content = `Email: ${registered_email}\n Name : ${req.body.first_name} ${req.body.last_name}\n Phone number: ${ req.body.phone_number}\n Country: ${req.body.registerCountry} \n Course: ${req.body.user_course}`

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
  const message = `Name: ${req.body.name} \n\n Email: ${req.body.email} \n\n Message: ${req.body.message}`


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





