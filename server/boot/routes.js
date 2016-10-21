const TWO_WEEKS = 60 * 60 * 24 * 7 * 2;

module.exports = (app) => {
    app.post('/api/users/login', (req, res) => {
        app.models.user.login({
            email: req.body.email,
            password: req.body.password,
            ttl: TWO_WEEKS
        }, 'user', (err, token) => {
            if (err) {
                res.status(err.statusCode).send(err);
                return;
            }

            res.json({
                email: req.body.email,
                accessToken: token.id
            });
        });
    });
};