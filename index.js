// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
const e = require('express');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
    res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', (req, res) => {
    let { date } = req.params;
    console.log('date', date);

    if (typeof date == 'string') {
        let check;
        let uctDate;
        if (/^\d+$/.test(date)) {
            console.log('YES');
            check = new Date(parseInt(date)).getTime();
            uctDate = new Date(parseInt(date)).toUTCString();
        } else {
            check = new Date(date).getTime();
            uctDate = new Date(date).toUTCString();
        }
        // console.log('check', check);
        if (isNaN(check)) {
            console.log('Y');
            res.json({
                error: 'Invalid Date',
            });
        } else {
            res.json({
                unix: check,
                utc: uctDate,
            });
        }
    } else {
        res.json({
            unix: new Date().getTime(),
            utc: new Date().toUTCString(),
        });
        return;
    }

    // if (check) {
    //     if (typeof date == 'string') {
    //         date = new Date(date).getTime();
    //         // console.log(typeof date);
    //         if (date[4] == '-' && date[7] == '-') {
    //             date[4] = '/';
    //             date[7] = '/';

    //             // console.log(date);
    //             if (isNaN(date)) {
    //                 res.json({
    //                     error: 'Invalid Date',
    //                 });
    //                 return;
    //             }
    //         } else {
    //             if (/^\d+$/.test(date)) {
    //                 date = parseInt(date);
    //             } else {
    //                 res.json({
    //                     error: 'Invalid Date',
    //                 });
    //                 return;
    //             }
    //         }
    //         const utcDate1 = new Date(date).toUTCString();
    //         console.log(utcDate1);

    //         res.json({
    //             unix: date,
    //             utc: utcDate1,
    //         });
    //     } else {
    //         res.json({
    //             unix: new Date().getTime(),
    //             utc: new Date().toUTCString(),
    //         });
    //     }
    // } else {
    //     res.json({
    //         error: 'Invalid Date',
    //     });
    //     return;
    // }
    // console.log('test', test);
    // console.log(typeof date);
});

// listen for requests :)
var listener = app.listen(3000, function () {
    console.log('Your app is listening on port ' + 3000);
});
