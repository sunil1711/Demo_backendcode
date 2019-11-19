const express = require('express');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./middleware');
var cors = require('cors')

class HandlerGenerator {
  login (req, res) {
    console.log(req)
    let username = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB
    let mockedUsername = 'admin';
    let mockedPassword = 'password';
    
    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        let token = jwt.sign({username: username},
          config.secret,
          { expiresIn: '24h' // expires in 24 hours
          }
        );
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token
        });
      } else {
        res.send(403).json({
          success: false,
          message: 'Incorrect username or password'
        });
      }
    }
  }
  index (req, res) {
    res.json({
      success: true,
      message: 'Index page'
    });
  }
}

// Starting point of the server
function main () {
  let app = express(); // Export app for other routes to use
 

  let handlers = new HandlerGenerator();
  const port = process.env.PORT || 8000;
  app.use(bodyParser.urlencoded({ // Middleware
    extended: true
  }));
  app.use(bodyParser.json());
  
  app.use(cors())
  // Routes & Handlers
  app.post('/login', handlers.login);
  app.get('/employees',function(req,res){

    res.send([{"id":"1","firstname":"TFee","employee_salary":"0","joining":"1999","lastname":"erer"},{"id":"97772","firstname":"nama","employee_salary":"123","joining":"23","lastname":""},{"id":"97777","firstname":"manimegalai","employee_salary":"123","joining":"23","lastname":""},{"id":"97779","firstname":"namaasd21das","employee_salary":"121","joining":"31","lastname":""},{"id":"97799","firstname":"Igc0swj7uq","employee_salary":"200","joining":"21","lastname":""},{"id":"97801","firstname":"Sundar.Pichai","employee_salary":"400023232","joining":"40","lastname":""},{"id":"97807","firstname":"Lukasz32569","employee_salary":"30000","joining":"35","lastname":""},{"id":"97808","firstname":"Marta32569","employee_salary":"9200","joining":"21","lastname":""},{"id":"97811","firstname":"Michal32577","employee_salary":"150000","joining":"32","lastname":""},{"id":"97812","firstname":"Karol32579","employee_salary":"150000","joining":"32","lastname":""},{"id":"97813","firstname":"MichalUpd32580","employee_salary":"1100000","joining":"66","lastname":""},{"id":"97823","firstname":"131asds","employee_salary":"121","joining":"31","lastname":""},{"id":"97828","firstname":"test12345","employee_salary":"123","joining":"23","lastname":""},{"id":"97835","firstname":"rifdiardi","employee_salary":"13128","joining":"14","lastname":""},{"id":"97836","firstname":"test1234588","employee_salary":"123","joining":"60","lastname":""},{"id":"97838","firstname":"Ridhi Kapur","employee_salary":"777677","joining":"26","lastname":""},{"id":"97841","firstname":"test1234588dffdfd","employee_salary":"123","joining":"60","lastname":""},{"id":"97842","firstname":"Rohan","employee_salary":"50000","joining":"60","lastname":""},{"id":"97844","firstname":"Rohal","employee_salary":"50000","joining":"60","lastname":""},{"id":"97846","firstname":"Rohal01","employee_salary":"50000","joining":"60","lastname":""}])
  })
  app.get('/check', function(req,res){
    console.log("Dfdf")
   
    res.send("hello");
});
  app.listen(port, () => console.log(`Server is listening on port: ${port}`));
}

main();
