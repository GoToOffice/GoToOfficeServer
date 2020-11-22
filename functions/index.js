const functions = require('firebase-functions');
const express = require('express');
const app = express();

const admin = require('firebase-admin')
let firebaseAdmin = admin.initializeApp({
    databaseURL: "https://inseat-f012d.firebaseio.com/"
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
  
exports.createOffice = functions.https.onRequest((req, res) => {
    let officesRef = firebaseAdmin.database().ref('offices')

    console.log(`about to add a new office to Offices`)
    
        const ref = officesRef.push(JSON.parse(req.body), function(error){
            if(error){
                console.log("failed to create new office: ",error)
                res.send({
                    "error": error
                })
            } else {
                res.send({
                    "officeId":  ref.getKey()
                })
            }
        })
})

exports.getOffice = functions.https.onRequest((req, res) => {
    var officesRef = admin.database().ref('offices').child(req.query.id)
    
    officesRef.on("value", function(snapshot) {
        console.log(snapshot.val());
        res.send(snapshot.val())
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
        
  })

//   exports.newOfficeAdded = functions.database.ref('offices/{}')
//   .onCreate((snapshot, context) => {
//     const officeId = context.params.officeId

//     console.log(`new office ${officeId}`)

//     var officeData = snapshot.val()
//     console.log(`office name: ${officeData.name}`)
//   })

  

