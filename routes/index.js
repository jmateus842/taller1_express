var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET pagina principal. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Administrador Express' });
});

/* GET pagina de fotos. */
router.get('/photos', async function(req, res, next) {
  const URL = 'https://dawm-fiec-espol-default-rtdb.firebaseio.com/photos.json';
  try {
    const response = await axios.get(URL);
    res.render('fotos', { 
      title: 'Fotos', 
      fotos: response.data || [] 
    });
  } catch (error) {
    console.error('Error al obtener fotos:', error.message);
    res.render('fotos', { 
      title: 'Fotos', 
      fotos: [] 
    });
  }
});

module.exports = router;
