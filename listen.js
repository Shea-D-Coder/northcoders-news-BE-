const app = require('./app') 

// app.listen(9090, (err) => {
//     if(err){
//         console.log(err);
//     }else{
//         console.log(' listening on 9090')
//     }
// })

const { PORT = 9090 } = process.env;

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));