const express = require('express');

const app = express();

const port = 3000;

//Middleware - köztes alkalmazások
app.use(express.json());

const courses = [
    {id: 1,name: 'course1',},
    {id: 2,name: 'course2',},
    {id: 3,name: 'course3',}
]

//GET végpont egy szöveges üzener visszaküldésére
app.get('/hello', (req, res ) => {
    res.send('sziaaaaaa');
})


app.get('/api/courses', (req, res) => {
    res.json(courses);
    console.log(courses);
})
//GET végpont egy kiválasztott kurzus lekérésére
app.get('/api/courses/:id' , (req, res) => {
    //Kurzus adatok keresése a courses tömbben
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('a megadott azonositoval nincs kurzus')
    res.json(course);
    console.log(course);
    console.log(req.params.id);
})

app.post('/api/courses', (req,res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
courses.push(course);
res.json(req.body);
})

app.delete('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('a megadott azonositoval nincs kurzus')
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.json({message: 'sikeres torles', data: req.body});
})

app.listen(port,() => console.log(`A webszerver figyel a ${port} számú porton`))

app.put('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('a megadott azonositoval nincs kurzus')
    course.name = req.body.name;
    res.json({message: 'sikeres adatmódosítás', data: req.body});
})

app.listen(port,() => console.log(`A webszerver figyel a ${port} számú porton`))
