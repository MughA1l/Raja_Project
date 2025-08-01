import express from 'express';
const app = express();
const port = 3000
import errorHandler from './middleware/errorHandler.js'

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome to backend')
})

// using for custom errors handling
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
