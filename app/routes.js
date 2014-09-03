
module.exports = function(app, passport) {
	Cash = require('./models/Cash');

	app.get('/', function(req, res) {
		res.render('home.ejs'); // load the index.ejs file
	});

	app.get('/signup', function(req, res) {
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/index', 
		failureRedirect : '/signup', 
		failureFlash : true 
	}));

	app.get('/login', function(req, res) {
		res.render('login.ejs', { message: req.flash('loginMessage') }); 
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/index', 
		failureRedirect : '/login', 
		failureFlash : true 
	}));

	app.get('/index', function(request, response) {
    Cash.find(function(err, cash) {
        if (err) {
            response.send(500, 'There was an error.');
        }
        else {
            response.render('index.ejs', {
                cash:cash
            });
        	}
    	});
	});

	app.get('/index', isLoggedIn, function(req, res) {
		res.render('index.ejs', {
			cash : req.cash 
		});
	});

	app.get('/new', function(request, response) {
    	response.render('new', {});
	});

	app.post('/create', function(request, response) {
    var cash = new Cash({
        date            : request.body.date,
        amount          : request.body.amount,
        details         : request.body.details,
        billNumber      : request.body.billNumber,
        remainingAmount : request.body.remainingAmount
    });

    	cash.save(function(err, model) {
        	if (err) {
            	response.send(500, 'There was an error ');
        	}
        	else {
            	response.redirect('/index');
        	}
    	});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

function isLoggedIn(req, res, next) {

	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
