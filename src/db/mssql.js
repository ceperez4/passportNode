const conn={
    user:'sa',
    password:'$_iDrix@2022',
    server:'144.126.136.185',
    port:1433,
    database:'bddoctores',
    options:{
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};

module.exports={conn};