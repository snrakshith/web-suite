const express = require('express');
const { createNamespace } = require('cls-hooked');
const Keycloak = require('keycloak-js');
const express = require('express');

const multiTenancyMiddleware = require('./middleware/multiTenancy');
const schoolRoutes = require('./routes');


const app = express();
const keycloak = new Keycloak({ /* Keycloak configuration options */ });
const namespace = createNamespace('multi-tenant');

app.use(express.json());

app.use(keycloak.middleware());

app.use((req, res, next) => {
    namespace.bindEmitter(req);
    namespace.bindEmitter(res);
    namespace.run(() => {
        next();
    });
});

app.use('/api', multiTenancyMiddleware);
app.use('/api', schoolRoutes);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

