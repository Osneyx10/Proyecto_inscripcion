var express = require('express');
var router = express.Router();
var docenteDB = require('../db/docente')
var materiasDB = require('../db/materias')

router.get('/', async function(req, res){
    var docente_db = new docenteDB.docente();

    var docentes_materias = await docente_db.filterDocenteMaterias();
    res.render('docente/list_docente', {
        title:"Docentes",
        docentes_materias: docentes_materias
    });
})

router.get('/new_docente/', async function(req, res){
    var materias_db = new materiasDB.materias();
    var materias = await materias_db.filter();

    res.render('docente/new_docente', {
        title:"Nuevo Docente",
        materias: materias
    });
})

router.post('/new_docente/', async function (req, res){
    var docente_db = new docenteDB.docente();
    await docente_db.create({
        nombre_docente: req.body.nombre_docente
    })

    res.redirect('/docente');
})

router.get('/docente_materias/', async function(req, res){
    var docente_db = new docenteDB.docente();
    var materias_db = new materiasDB.materias();

    var docentes = await docente_db.filter();
    var materias = await materias_db.filter();
    res.render('docente/docente_materias', {
        title:"Asignacion de Materias",
        docentes: docentes,
        materias: materias
    });
})

router.post('/docente_materias/', async function (req, res){
    var docente_db = new docenteDB.docente();
    await docente_db.asignacionMateria({
        docente_id: req.body.docente_id,
        materias_id: req.body.materias_id
    })

    res.redirect('/docente');
})

module.exports = router;