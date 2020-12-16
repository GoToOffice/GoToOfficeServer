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

// adds a user record to the "users" collection once a user was authenticated
exports.userSignup = functions.auth.user().onCreate((user) => {
    console.log('User created', user.email, user.uid)

    let usersRef = firebaseAdmin.database().ref('users')
    
    usersRef.push(user.uid).set({
        "email": user.email,
        "userName": user.displayName,
        "reservations": []
    }, function(error){
        if(error){
            console.log("failed to add authenticated user: ",error)
        } else {
            
        }
    })

    // App should ask from a first time user to provide some data.
    // can be done by user initiation

    // const ref = usersRef.push(JSON.parse(req.body), function(error){
    //     if(error){
    //         console.log("failed to ad authenticated user: ",error)
            
    //     } else {
            
    //     }
    // })
})

exports.userRemoved = functions.auth.user().onDelete((user) => {
    console.log('User removed', user.email, user.uid)

    let usersRef = firebaseAdmin.database().ref('users')

    // TODO: remove user from the DB?? delete means logged out or ??
    
})


// exports.authChanged = functions.auth.user().onauthChanged((user) => {
//     console.log('User changed', user.email, user.uid)

//     let usersRef = firebaseAdmin.database().ref('users')
    
// })

//exports.userSignup
//exports.userRemoved

//   exports.newOfficeAdded = functions.database.ref('offices/{}')
//   .onCreate((snapshot, context) => {
//     const officeId = context.params.officeId

//     console.log(`new office ${officeId}`)

//     var officeData = snapshot.val()
//     console.log(`office name: ${officeData.name}`)
//   })

  

