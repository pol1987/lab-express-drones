// Iteration #1

const { model, Schema } = require("mongoose")

// const mongoose = require("mongoose")


const droneSchema = new Schema({
    name: {
        type: String,
    },
    propellers: {
        type: Number,
    },
    maxSpeed: {
        type: Number,
    }
})

//Creamos el modelo
const DroneModel = model("drone", droneSchema)

// Exportamos el modelo
module.exports = DroneModel;