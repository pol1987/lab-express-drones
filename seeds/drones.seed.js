// Iteration #1

require("../db/index.js")


const { default: mongoose } = require("mongoose");
const DroneModel = require("../models/Drone.model.js")




const drones = [
    { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
    { name: "Racer 57", propellers: 4, maxSpeed: 20 },
    { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
  ];

 DroneModel.create(drones)
 .then((drones) => {
    console.log(drones.length)
    mongoose.connection.close()
 })
 .catch((err) => {
     console.log(err)
 })
 .then((response) => {
     console.log("Conexion cerrada") // no añadimos el response porque ya esta cerrada y devuelve undefined
 })
 .catch((err) => {
     console.log("Error cerrando la base de datos", err)
 })

  
// const addDrones = async () => {
//     try {
//         await DroneModel.create(drones)
//         console.log(drones.length)
        
//     }catch(err) {
//         next(err)
//     }
// }

// addDrones()