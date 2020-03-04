const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors())

mongoose.connect('mongodb://localhost:27017/library', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
mongoose.connection.once('open', () => {
    console.log('connected to database');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(3001, () => {
    console.log("now listening to ", 3001);
})