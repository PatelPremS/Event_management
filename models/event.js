const mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    title : {type: String, required: true},
    speaker : {type: String, required: true},
    date : {type: String, required: true},
    time : {type: String, required: true},
    description: {type: String, required: true},
    address: {type: String, required: true},
    country: {type: String, required: true},
    state: {type: String, required: true},
    postal: {type: String, required: true},
});

var eventModel = mongoose.model("Event", eventSchema, "events");

module.exports = {
    eventModel
}