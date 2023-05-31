const LocalStrategy = require('passport-local').Strategy;
const { conn } = require('../db/mssql');
const sql = require("mssql");
const {verified} = require('../helpers/bcrypt.handle')
const users = [
  { id: 1, username: 'admin', password: 'admin', test: 'sd' },
  { id: 2, username: 'user', password: 'user', test: 'rttr' }
];

module.exports = function (passport) {
  // Serializar usuario
  passport.serializeUser(function (user, done) {
    done(null, user.USUA_NOMBRE);
  });

  // Deserializar usuario
  passport.deserializeUser(async function (username, done) {
  
    try {
      var comandoNoRepetir = `SELECT * FROM dbo.sy_seguridad_ususarios WHERE  USUA_NOMBRE='${username}';`;
      const connection = await new sql.ConnectionPool(conn).connect();
      const User = (await connection.request().query(comandoNoRepetir)).recordset;

      if (User.length <= 0) {
        done(null, false);
      } else {
        done(null, User[0]);
      }
    } catch (error) {
      done(error);
    }


  });

  // Estrategia de autenticación local
  passport.use(new LocalStrategy(async function (username, password, done) {
    try {
      console.log(username,password)
      var comandoNoRepetir = `SELECT USUA_NOMBRE, USUA_CONTRA FROM dbo.sy_seguridad_ususarios WHERE  USUA_NOMBRE='${username}';`;
      const connection = await new sql.ConnectionPool(conn).connect();
      const User = (await connection.request().query(comandoNoRepetir)).recordset;

      //const user = users.find(user => user.username === username);

      if (User.length <= 0) {
        return done(null, false, { message: 'Credenciales incorrectas' });
      }
      const passwordHash = User[0].USUA_CONTRA;

      const isCorrect = await verified(password, passwordHash);
      if (!isCorrect) {
        return done(null, false, { message: 'Contraseña incorrecta' });
      }
      console.log()
      return done(null, User[0]);
    } catch (error) {
      done(error);
    }

  }));
};