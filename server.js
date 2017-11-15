const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs');


app.use((req, res, next)=>{
  var now = new Date().toString();
  console.log(`${now}: ${req.method}, ${req.url}`);
  const log = `${now}: ${req.method}, ${req.url}`;
  fs.appendFile('server.log', log + '\n', (e)=>{
    if (e) {
      console.log('Error: unable to save file');
    }
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(`${__dirname}/public`));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page!',
    welcomeMessage: 'Welcome to my page!'
  });
});


app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page!!'
  });
});

app.get('/bad', (req, res) => {
  res.send({errorMessage: 'Unable to find route'});
});

app.listen(3000, () => console.log('App running in port 3000'));
