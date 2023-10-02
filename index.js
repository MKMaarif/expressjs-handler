// import library expressjs
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// use cors
app.use(cors());

// use body parser
app.use(bodyParser.json());

function LoggerMiddleware(req, res, next) {
    console.log(`Request received at: ${new Date()}`);
    next();
}

app.use(LoggerMiddleware);

// create handling http GET all customers
app.get('/api/customers', (req, res) => {
    const { keyword, category, limit } = req.query; // request query string by keyword, category, limit
    
    res.status(200).json({
        message: 'get success',
        data: [
            {
                name: 'MK',
                email: 'mk@gmail.com',
                role: 'maou'
            },
            {
                name: 'Arif',
                email: 'arif@gmail.com',
                role: 'yuusha'
            },
        ],
        pagination: {
            total_record: 100,
            current_page: 1,
            total_pages: limit,
        },
        search: {
            keyword: keyword,
            category: category
        }
    });
});

// create handling http POST add customer
app.post('/api/customers', LoggerMiddleware, (req, res) => {
    console.log(req.body);
    const { name, email, role } = req.body;

    // res.send(`Thank you, Name: ${name}, Email: ${email}, Role: ${role} we have received your submission!`)
    res.status(201).json({
        message: 'create customer success',
        data: {
            name: name,
            email: email,
            role: role
        }
    })
});

// create handling http get detail customer
app.get('/api/customers/:id', (req, res) => {
    const customerID = req.params.id; // get id from params
    res.status(200).json({
        message: 'get detail customer success',
        data: {
            id: customerID,
            name: 'Arkh',
            email: 'arkh@gmail.com',
            role: 'kami'
        }
    });
});

const port = process.env.PORT || 3000; // set port
app.listen(port, "0.0.0.0", () => {
    console.log(`App is listening on port ${port}`);
});