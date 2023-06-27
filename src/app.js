const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const axios = require ('axios'); //AGREGADO PARA API REST
require('dotenv').config(); //AGREGADO PARA API REST

const tasksRoutes = require('./routes/tasks');
const contactoRoutes = require('./routes/contacto');
//const apiRoutes = require('./routes/api');  //AGREGADO LUEGO DE PASAR TODO A API ROUTES



const app = express();
app.set('port', 4000);

// Configuración de directorio de archivos estáticos
//app.use(express.static(__dirname + '/public')); usado por YANET
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
  extname: '.hbs',
}));
app.set('view engine', 'hbs');

app.use(myconnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'cleanup_house'
}, 'single'));

app.listen(app.get('port'), () => {
  console.log('Listening on port ', app.get('port'));
});

app.get('/contacto', (req, res) => {
  res.render('contacto');
});


app.use('/', tasksRoutes);
app.use('/contacto', contactoRoutes);
//app.use('/api', apiRoutes); //AGREGADO LUEGO DE PASAR TODO A API ROUTES

app.get('/', (req, res) => {
  res.render('home');
});


app.get('/api', async (req, res) => {
  try {
    const response = await axios.get('https://api.github.com/user/repos', {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`, // Reemplaza con tu token de acceso a GitHub
      },
    });

    const repositories = response.data;
    res.render('api', { repositories });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los repositorios');
  }
});









