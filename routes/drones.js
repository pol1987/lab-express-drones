const express = require('express');
const router = express.Router();

// require the Drone model here
const DroneModel = require("../models/Drone.model")


// GET "/drones" => renderizar una lista de drones (ITERACION 2)
router.get("/drones", (req, res, next) => {
  //buscar los elementos que queremos listar, en esta caso los name
  DroneModel.find()
  
  .then((drone) => {
    console.log(drone)
    // renderizarla en una vista
    res.render("drones/list.hbs", {
      listDrone: drone
    })

  })
  .catch((err) => {
    next(err)
  })
});






//GET "/drones/create" => renderizar el formulario de crear nuevos drones
router.get('/drones/create', (req, res, next) => {
  res.render("drones/create-form.hbs")
});

//POST "drones/create" => recibir el nuevo drone y añadirlo a la DB
router.post('/drones/create', (req, res, next) => {
  console.log("en la ruta")
  console.log(req.body)

  // 1 usamos la info que da el usuario para crear el elemento en la DB
  const { name, propellers, maxSpeed } = req.body
  DroneModel.create({
    name, 
    propellers, 
    maxSpeed
  })
  .then((drone) => {
    // 2 a donde mandamos al usuario cuando haya metido la nueva data
    res.redirect("/drones")
  })
  .catch((err) => {
    next(err)
  })
});





// GET "/drones/:id/edit" => ruta que renderiza el formulario de edición y enseña la info previa
router.get('/drones/:id/edit', (req, res, next) => {
  const { id } = req.params

  DroneModel.findById(id)
  .then((drone) => {
    res.render("drones/update-form.hbs", {
      drone
    })
  })
  .catch((err) => {
    next(err)
  })
});

// POST "/drones/:id/edit" => ruta que recibe la info del cliente y la sube a la DB
router.post('/drones/:id/edit', (req, res, next) => {
  // 1. Recibir la info
  const { name, propellers, maxSpeed } = req.body
  const { id } = req.params

  // 2. actualizamos la info
  DroneModel.findByIdAndUpdate(id, {    
    name, 
    propellers, 
    maxSpeed
  })  
  .then((drone) => {
    res.redirect("/drones")
    
  })
  .catch((err) => {
    next(err)
  })
});

router.post("/drones/:id/delete", async (req, res, next) => {
   const { id } = req.params

   try {
     // 1 recibir la info a borrar
     await DroneModel.findByIdAndDelete(id)

     // 2 a dónde mandas al usuario??
     res.redirect("/drones")     

   } catch(err) {
     next(err)
   }
});

module.exports = router;
