const express = require('express')
const app = express()
const axios = require('axios').default;
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

app.get('/users/names', function (req, res) {
    const names = users.map(user=>user.name);
    console.log(names);
    res.send(names);
});

app.get('/users/demographics', function (req, res) {
    const demographics = [];
    users.forEach(user=>{
        const {gender} = user;
        const newGender = demographics.find(theGender => thisGender = theGender.genderName == `${gender}`);
        if (newGender){
            newGender.count++;
            newGender.percentage = (newGender.count/users.length*100).toFixed(2)+"%";
        } else {
            let count = 1;
            let newerGender = {
                genderName: gender || 'undefined',
                count,
                percentage: (count/users.length*100).toFixed(2)+'%'
            };
            demographics.push(newerGender);
        }
    });
    res.send(demographics);
});

app.post('/load-users', function (req, res) {
    try {
         const {count} = req.body;
        const response = await axios.get(`https://random-data-api.com/api/users/random_user?size=${count}`);
        const randomUsers = response.data;
        const createdUsers = randomUsers.map((user, index)=>{
        const id = users.length+index+1;
        const name = user.first_name + " " + user.last_name;
        const age = (new Date().getFullYear() - new Date(user.date_of_birth).getFullYear());
         return {
         id,
         name,
        age,
         gender:user.gender};
         });
         users.push(...createdUsers);
         return res.send(createdUsers);
         } 
         catch(err){
            return res.status(500).send(`Internal server error: ${err}`);
        }
});


app.listen(3000)
console.log("App listening @http://localhost:3000")