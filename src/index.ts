import express, { Application, Request, Response } from 'express'
import dbInit from './db/init.js';
import routerDogs from './routes/index.js';

dbInit()
const app: Application = express()
const port = 3000

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });
  
app.use("/dogs", routerDogs);
app.use("/", async(req, res)=>{
    res.status(200).json({message: "Working!"})
});

try {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
} catch (error) {
    console.log(`Error occurred: ${error.message}`)
}