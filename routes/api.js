const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
var Event = require('../models/event.js');

require('../models/db.js');

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretkey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}
// routes
router.get('/', (req, res) => {
    res.send('From API route');
});

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if(error) {
            console.log(error);
        } else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretkey')
            res.status(200).send({token})
        }
    });
})

router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({email: userData.email}, (error, user) => {
        if(error) {
            console.log(error);
        } else {
            if(!user) {
                res.status(401).send('Invalid email');
            } else {
                if (user.password !== userData.password) {
                res.status(401).send('Invalid password');
                } else {
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'secretkey')
                    res.status(200).send({token});
                }
            }
        }
    })
})

// regular events
// get all events
router.get('/events', (req, res) => {
    Event.eventModel.find().exec(function(err, eventData){ 
        if(err){
            res
            .status(200)
            .json(err);
        return;
        }
        res
        .status(200)
        .json(eventData);
    });
})
// get single event
router.get('/events/:eventid', (req, res) => {
    var id = req.params.eventid;
    Event.eventModel
        .findById(id)
        .exec(function(err, data) {
            if(err) {
                res
                    .status(404)
                    .json(err);
                return;
            }
            res
                .status(200)
                .json(data);
        });
})
// create event
router.post('/events', (req, res) => {
    Event.eventModel.create({
        title: req.body.title,
        speaker: req.body.speaker,
        date: req.body.date,
        time: req.body.time,
        description: req.body.description,
        address: req.body.address,
        country: req.body.country,
        state: req.body.state,
        postal: req.body.postal,
    }, (err, eventData) => {
        if(err) {
            res
            .status(400)
            .json(err);
        } else {
            res
            .status(201)
            .json(eventData)
        }
    });
})
// update single event
router.put('/events/:eventid', (req, res) => {
    if(!req.params.eventid){
        res
        .status(404)
        .json(
            {"Message" : "eventid is not found"}
        )
    return;
    }
    Event.eventModel.findById(req.params.eventid)
        .exec((err, eventdata) => {
            if(!eventdata) {
                res
                .status(404)
                .json (
                    {"Message" : "eventid not found"}
                );
                return;
            } else if (err){
                res
                .status(404)
                .json(err)
                return;
            }            
            eventdata.title = req.body.title;
            eventdata.speaker = req.body.speaker;
            eventdata.date = req.body.date;
            eventdata.time = req.body.time;
            eventdata.description = req.body.description;
            eventdata.address = req.body.address;
            eventdata.country = req.body.country;
            eventdata.state = req.body.state;
            eventdata.postal = req.body.postal;
            eventdata.save((err, eventdata) => {
                if(err) {
                    res
                    .status(404)
                    .json(err);
                } else {
                    res
                    .status(200)
                    .json(eventdata)
                }
            });
        });
})
// delete single event
router.delete('/events/:eventid', (req, res) => {
    const eventid = req.params.eventid;
    if(eventid) {
        Event.eventModel
        .findByIdAndRemove(eventid)
        .exec((err, eventData) => {
            if(err) {
                res
                .status(404)
                .json(err);
            return;
            }
            res
            .status(200)
            .json({"message" : "Delete Success !"});
        });
    } else {
        res
        .status(404)
        json({"message" : "eventid not valid or not avilable in database"})
    }
})

//search event
router.get('/events/search/:keyword', (req, res) => {
    var keyword = req.params.keyword;
    // var searchRegex = new RegExp(keyword);
    // var fullTextSearchOptions = {
    //     "$text":{
    //       "$search": keyword
    //     }
    // };
    // var regexSearchOptions = {
    //     "title": {
    //       "$regex": searchRegex
    //     }
    // };
    // Event.eventModel.find(fullTextSearchOptions, function(err, data){
    //     if(err){
    //       console.log(err);
    //     }else if(data){
    //       console.log(data);
    //     }
    // })
    // const query = { $text: { $search: keyword } };
    // const projection = {
    //     _id: 0,
    //     title: 1,
    //   };
    // console.log(keyword);
        
    // Event.eventModel.createIndex({"title":"text"});
    // Event.eventModel
    //     .find( query )
    //     .project(projection)
    //     .exec(function(err, data) {
    //         if(err) {
    //             res
    //                 .status(404)
    //                 .json(err);
    //             return;
    //         }
    //         res
    //             .status(200)
    //             .json(data);
    //     });

    // var keyword = req.params.keyword;
    // const query = { $text: { $search: keyword } };
    // const projection = {
    //     _id: 0,
    //     title: 1,
    //     };
    // console.log(keyword);
        
    // Event.eventModel.createIndex({"title":"text"});
    // Event.eventModel
    //     .find( query )
    //     .project(projection)
    //     .exec(function(err, data) {
    //         if(err) {
    //             res
    //                 .status(404)
    //                 .json(err);
    //             return;
    //         }
    //         res
    //             .status(200)
    //             .json(data);
    //     });
})

module.exports = router;