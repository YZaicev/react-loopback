const user = {
    email: 'admin@example.com',
    password: 'qwe',
    username: 'admin',
    emailVerified: true
};

module.exports = (app) => {
    // TODO: use autoupdate if not need clear data
    app.dataSources.PostgreSQL.automigrate('user', (err) => {
        if (err) throw err;
        app.models.User.create(user, (err, userInstance) => {
            if (err) throw err;
            console.log(userInstance);
        });
    });
};
