var express = require('express');
var router = express.Router();
var studentDB = require('../db/student')

router.get('/', async function(req, res){
    var student_db = new studentDB.student();

    var estudiantes = await student_db.filter();
    res.render('student/list', {
        title: "Estudiantes",
        estudiantes: estudiantes
    });

})

router.get('/new/', async function(req, res){
    var student_db = new studentDB.student();

    var especialidad = await student_db.filter_especialidades();
    res.render('student/new', {
        title:"Nuevo Estudiante",
        especialidad: especialidad
    });

})

router.post('/new', async function (req, res){
    var student_db = new studentDB.student();
    await student_db.create({
        nombre_alumno: req.body.nombre_alumno,
        email: req.body.email,
        cod_especialidad: req.body.cod_especialidad
    })

    res.redirect('/student');
})

module.exports = router;