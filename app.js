var express = require('express'), 
    http = require('http');
    //path = require('path'),
    Cash = require('/Users/sandeep/expressDir/ExpensesApp/Cash');

var bodyParser = require('body-parser');


var app = express();
    //app.set('port', process.env.PORT || 6000);
    //app.set('views', __dirname + '/views');
    //app.set('view engine', 'ejs');
    //app.use(express.static(path.join(__dirname, 'public')));

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.set('views', __dirname + '/views');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'ejs');

// Render our home page with all blog posts
app.get('/', function(request, response) {
    Cash.find(function(err, cash) {
        if (err) {
            response.send(500, 'There was an error - tough luck.');
        }
        else {
            response.render('index', {
                cash:cash
            });
            response.write("Yaay!");
            response.end();
        }
    });
});

// Render a form to enter a new post
app.get('/new', function(request, response) {
    response.render('new', {});
});

// create a new blog post object
app.post('/create', function(request, response) {
    //Create and save a Post model
    var cash = new Cash({
        date            : request.body.date,
        amount          : request.body.amount,
        details         : request.body.details,
        billNumber      : request.body.billNumber,
        remainingAmount : request.body.remainingAmount
    });

    //Save the model
    cash.save(function(err, model) {
        if (err) {
            response.send(500, 'There was an error ');
        }
        else {
            response.redirect('/');
        }
    });
});

var server = app.listen(3001, function() {
    console.log('Listening on port %d', server.address().port);
  });