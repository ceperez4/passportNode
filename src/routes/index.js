const express = require('express');
const passport = require('passport');

const router = express.Router();

// Página de inicio
router.get('/', (req, res) => {
    res.render('index');
});

// Formulario de inicio de sesión
router.get('/login', (req, res) => {
    res.render('login');
});

// Manejar inicio de sesión
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        
        if (err) {
            // Error interno del servidor
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        if (!user) {
            // Credenciales incorrectas
            return res.status(401).json({ error: 'Credenciales incorrectas 😊' });
        }
        // Autenticación exitosa
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/protected');
        });
    })(req, res, next);
});

// Cerrar sesión
router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            console.error(err);
            return res.redirect('/');
        }
        res.redirect('/');
    });
});

module.exports = router;