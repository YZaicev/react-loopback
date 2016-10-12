const posts = [{
    title: 'title 1',
    text: 'text 1'
}, {
    title: 'title 2',
    text: 'text 2'
}, {
    title: 'title 3',
    text: 'text 3'
}];

module.exports = (app) => {
    // TODO: use autoupdate if not need clear data
    app.dataSources.PostgreSQL.automigrate('post', (err) => {
        if (err) throw err;
        app.models.Post.create(posts, (err, rows) => {
            if (err) throw err;
        });
    });
    app.dataSources.PostgreSQL.automigrate('User', (err) => {
        if (err) throw err;
    });
};
