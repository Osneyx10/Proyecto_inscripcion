var express = require('express');
var router = express.Router();
var materiasDB = require('../db/materias')

router.get('/', async function(req, res){
    var materias_db = new materiasDB.materias();

    var materias = await materias_db.filter();
    res.render('materias/list_materias', {
        title: "Materias",
        materias: materias
    });

})

router.get('/new_materias/', async function(req, res){
    res.render('materias/new_materias', {
        title:"Nueva Materia",
    });
})

router.post('/new_materias/', async function (req, res){
    var materias_db = new materiasDB.materias();
    await materias_db.create({
        materia: req.body.materia
    })

    res.redirect('/materias');
})

module.exports = router;