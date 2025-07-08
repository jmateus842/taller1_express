var express = require('express');
var router = express.Router();
const axios = require('axios');
const Photo = require('../models/Photo');

/* GET pagina principal. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Administrador Express' });
});

/* GET pagina de fotos. */
router.get('/photos', async function(req, res, next) {
  try {
    // Primero intentamos obtener fotos desde MongoDB
    let fotos = await Photo.find().sort({ createdAt: -1 });
    
    // Si no hay fotos en MongoDB, usamos Firebase como fallback
    if (fotos.length === 0) {
      const URL = 'https://dawm-fiec-espol-default-rtdb.firebaseio.com/photos.json';
      const response = await axios.get(URL);
      
      // Si hay fotos en Firebase, las guardamos en MongoDB
      if (response.data && response.data.length > 0) {
        for (const foto of response.data) {
          await Photo.findOneAndUpdate(
            { url: foto.url }, // criterio de búsqueda
            { 
              descripcion: foto.descripcion,
              url: foto.url
            },
            { upsert: true, new: true } // crear si no existe
          );
        }
        // Obtenemos las fotos recién guardadas
        fotos = await Photo.find().sort({ createdAt: -1 });
      } else {
        fotos = [];
      }
    }
    
    res.render('fotos', { 
      title: 'Fotos', 
      fotos: fotos 
    });
  } catch (error) {
    console.error('Error al obtener fotos:', error.message);
    res.render('fotos', { 
      title: 'Fotos', 
      fotos: [] 
    });
  }
});

/* POST para añadir una nueva foto */
router.post('/photos/add', async function(req, res, next) {
  try {
    const nuevaFoto = new Photo({
      descripcion: req.body.descripcion,
      url: req.body.url
    });
    
    await nuevaFoto.save();
    res.redirect('/photos');
  } catch (error) {
    console.error('Error al guardar foto:', error.message);
    res.status(500).send('Error al guardar la foto');
  }
});

module.exports = router;
