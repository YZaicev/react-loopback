module.exports = (User) => {
    User.afterRemote('create', function(context, user, next) {
        console.log('> user.afterRemote triggered');

        var options = {
            type: 'email',
            to: user.email,
            from: 'noreply@loopback.com',
            subject: 'Thanks for registering.',
            redirect: '/login?verified=true',
            user: user
        };

        user.verify(options, function(err, response) {
            if (err) {
                User.deleteById(user.id);
                return next(err);
            }

            console.log('> verification email sent:', response);

            // context.res.render('response', {
            //     title: 'Signed up successfully',
            //     content: 'Please check your email and click on the verification link ' +
            //         'before logging in.',
            //     redirectTo: '/',
            //     redirectToLinkText: 'Log in'
            // });
            context.res.send('OK');
        });
    });
};