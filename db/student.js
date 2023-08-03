const { names } = require('debug/src/debug');
var connect = require('./connect');
const { joinClasses } = require('jade/lib/runtime');


class student {

    async filter_especialidades(){
        try{     
            var sql = "SELECT id, name FROM especialidades";
            var con = await connect.createConnection();
            
            var especialidad = await new Promise((resolve, reject) =>{
                con.query(sql, [], function (err, result){

                    con.release();
                    if (err) {
                        reject(err)
                        return;
                    }

                    var list = [];

                    for (let i = 0; i < result.length; i++) {
                        list.push({
                            id: result[i].id,
                            name: result[i].name
                        })
                    }

                    resolve(list);
                })

            })
            
            return especialidad;

        }
        catch (ex) {
            console.log(ex);
        }
    }

    async create(studentParm) {
        try{
            var sql = "INSERT INTO estudiantes SET nombre_alumno = ?, email = ?, create_at = ?, cod_especialidad = ? ";
            var param = [studentParm.nombre_alumno, studentParm.email, new Date(), studentParm.cod_especialidad];

            var con = await connect.createConnection();

            await new Promise((resolve, reject) => {
                con.query(sql, param, function (err, result){
                    con.release();
                    if (err) {
                        console.log(err);
                        reject(err)
                        return;
                    }
                    resolve(result)
                })
            })

        }
        catch(ex) {
            console.log(ex)
        }
    }

    async filter(criteria) {
        try {

            var sql = `SELECT 
                            s.id, 
                            s.nombre_alumno, 
                            s.email, 
                            sp.name especialidad, 
                            s.create_at 
                        FROM 
                            estudiantes s 
                        INNER JOIN 
                            especialidades sp on sp.id = s.cod_especialidad`;

            var param = [];

            var con = await connect.createConnection();

            var estudiantes = await new Promise((resolve, reject) =>{
                con.query(sql, [], function (err, result){

                    con.release();
                    if (err) {
                        reject(err)
                        return;
                    }

                    var list = [];

                    for (let i = 0; i < result.length; i++) {
                        list.push({
                            id: result[i].id,
                            name: result[i].nombre_alumno,
                            email: result[i].email,
                            create_at: result[i].create_at,
                            especialidad: result[i].especialidad
                        })
                    }

                    resolve(list);
                })

            })
            
            return estudiantes;

        } 
        catch (ex) {
            console.log(ex);
        }
    }

}

module.exports.student = student;