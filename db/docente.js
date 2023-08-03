const { names } = require('debug/src/debug');
var connect = require('./connect');
const { joinClasses } = require('jade/lib/runtime');

class docente {
   
    async create(docenteParam) {
        try {
            var sql = "INSERT INTO docente SET nombre_docente = ?";
            var param = [docenteParam.nombre_docente];

            var conn = await connect.createConnection();

            await new Promise((resolve, reject) => {
                conn.query(sql, param, function(err, result){
                    conn.release();
                    if(err){
                        reject(err)
                        return;
                    }
                    resolve(result);
                })
            })

        } 
        catch (ex) {
            console.log(ex);
        }
    }

    async filter(criteria) {
        try {

            var sql = "SELECT id, nombre_docente FROM docente";

            var param = [];

            var con = await connect.createConnection();

            var docentes = await new Promise((resolve, reject) =>{
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
                            nombre_docente: result[i].nombre_docente,
                            
                        })
                    }

                    resolve(list);
                })

            })
            
            return docentes;

        } 
        catch (ex) {
            console.log(ex);
        }
    }

    async asignacionMateria(param) {
        try {
            var sql = "INSERT INTO docente_materias SET docente_id = ?, materias_id = ?";
            var param = [param.docente_id, param.materias_id];

            var conn = await connect.createConnection();

            await new Promise((resolve, reject) => {
                conn.query(sql, param, function(err, result){
                    conn.release();
                    if(err){
                        reject(err)
                        return;
                    }
                    resolve(result);
                })
            })

        } catch (error) {
            console.log(error);
        }
    }

    async filterDocenteMaterias(criteria){
        try {
            var sql = `SELECT
                            dm.id,
                            doc.nombre_docente,
                            mat.materia
                        FROM
                            docente_materias dm
                        INNER JOIN
                            docente doc ON dm.docente_id = doc.id
                        INNER JOIN
                            materias mat ON dm.materias_id = mat.id`;

            var conn = await connect.createConnection();
            var docente_materias = await new Promise((resolve, reject) =>{
                conn.query(sql, [], function (err, result){

                    conn.release();
                    if (err) {
                        reject(err)
                        return;
                    }

                    var list = [];

                    for (let i = 0; i < result.length; i++) {
                        list.push({
                            id: result[i].id,
                            nombre_docente: result[i].nombre_docente,
                            materia: result[i].materia
                        })
                    }
                    resolve(list);
                })
            })

            return docente_materias;

        }
        catch (ex) {
            console.log(ex);
        }
    }

}

module.exports.docente = docente;