const express = require('express'),
        path = require('path'),
        fs = require('fs'),
        app = express();

app.use((req,res, next) => {
    res.type(`json`)
    next()
})

app.get('/', (req, res) => {
    console.log(req.originalUrl)
    res.json(fs.readFileSync(path.join(__dirname, 'data.json')).toString())
})


app.listen(6767, () => {
    console.log(`running API on 6767`)
})