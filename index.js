const express = require('express')

const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');





const port = 5000


const app = express()

app.use(cors());
app.use(bodyParser.json());


var serviceAccount = require("./burj-al-arab-b00e4-firebase-adminsdk-qbo23-58f34fc210.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



const password = "ArabianHorse79";





const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://arabian:ArabianHorse79@cluster0.t43iz.mongodb.net/burj-al-arab?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const bookings = client.db("burj-al-arab").collection("bookings");
  app.post('/addBooking', (req, res) => {
    const newBooking = req.body;
    bookings.insertOne(newBooking)
      .then(result => {
        res.send(result.insertedCount > 0);
      })
    // console.log(newBooking);s
  })

  app.get('/bookings', (req, res) => {
    // console.log(res);
    const bearer = req.headers.authorization
    if( bearer && bearer.startsWith('Bearer ') ){
      const idToken = bearer.split(' ')[1];
      
admin.auth().verifyIdToken(idToken)
.then((decodedToken) => {
  const uid = decodedToken.uid;
  console.log({uid})
  // ...
})
.catch((error) => {
  console.log(error);
  // Handle error
});

    };
    // idToken comes from the client app
 
    // bookings.find({email: req.query.email})
    // .toArray((err, documents) => {
    //   res.send(documents);
    // })
  })

});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)