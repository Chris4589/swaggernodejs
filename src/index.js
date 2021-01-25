'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./configs/db');
const router = require('./routes/routes');
const swaggerUi = require('swagger-ui-express'); 
const swaggerDocument = require('../swagger.json'); 

require('dotenv').config();

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3030;

const onConnect = () =>{
    return new Promise((resolve, reject)=>{
        db.sync({force:false});
        db.authenticate()
            .then( () => resolve('CONECTADO A DB') )
            .catch( (error) => reject(`Error ${error}`) );
    });
}

onConnect().then(()=>{
    app.use(cors());
    app.use(express.json());
    app.use('/', router);
    app.use(require('./middlewares/joi-middleware'));

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 

    app.listen(port, host, ()=> console.log(`Server Online port ${host}:${port}`));
}).catch( (err)=> console.log(err) );


