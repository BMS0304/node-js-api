const express = require('express')
const app = express()
app.use(express.urlencoded({extended:true}));
app.use(express.json());
let users = [];

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/name', function (req, res) {
    const name = "Brendan"
    res.send(name)
})

app.post('/echo-body', function (req, res) {
    const body = req.body;
    console.log(body);
    res.send(body);
});

app.post('/echo-query', function (req, res) {
    const query = req.query;
    console.log(query);
    res.send(query);
});

// app.post('/users', function (req, res) {
//     // let user = {name: "Brendan", age: "23", gender: "male"}
//     const {body} = req;
//     const {name, age, gender} = body;

//     // const body = req.body;
//     // const name = body.name;
//     // const age = body.age;
//     // const gender = body.gender;
//     const user = {name, age, gender, createdDate : new Date()}
//     console.log(user);
//     res.send(user);
// });

app.post('/users', function (req, res) {
    const {name, age, gender} = req.body;
    if(!name || !age){
        return res.status(404).send("Error");
    }
    const user = { id:users.length+1, name, age, gender, createdDate : new Date()};
    users.push(user);
    console.log(user);
    res.send(user);
});

app.get('/user', function (req, res) {
    const {id} = req.query;
    const user = users.find(user => user.id == id);
    res.send(user);
});

app.get('/users/:index', function (req, res) {
    const {index} = req.params;
    const user = users[index];
    res.send(user);
});

app.listen(3000)
console.log("App listening @http://localhost:3000")