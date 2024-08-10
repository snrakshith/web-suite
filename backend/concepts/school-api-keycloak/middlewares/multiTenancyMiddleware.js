const { getNamespace } = require('cls-hooked');

function multiTenancyMiddleware(req, res, next) {
    const schoolId = req.params.schoolId; // Assuming schoolId is part of the URL
    const namespace = getNamespace('multi-tenant');
    namespace.set('schoolId', schoolId);
    next();
}

module.exports = multiTenancyMiddleware