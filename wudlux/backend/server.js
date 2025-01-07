const express = require('express');
const mongoose = require('mongoose');


const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/wudlux',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Database connected');
}).then((err)=>{
    console.log(err);
});

app.get('/', (req, res) => {
  res.send('');
});


app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});