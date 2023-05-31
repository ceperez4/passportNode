const express = require('express');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./config/passport');

const indexRouter = require('./routes/index');
const protectedRouter = require('./routes/protected');
const path = require('path');
const app = express();

// Configuración de Express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Configuración de Passport
passportConfig(passport);

// Middleware de autenticación


// Rutas
app.use('/', indexRouter);
app.use('/protected', protectedRouter);

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});