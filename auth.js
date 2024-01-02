const basicAuth = require('express-basic-auth');

const users = {
    'username': 'password',
    'anotheruser': 'anotherpassword',
};


const basicAuthMiddleware = basicAuth({
    users,
    challenge: true,
    unauthorizedResponse: 'Unauthorized', 
});

router.use(basicAuthMiddleware);