const { names } = require('debug/src/debug');
var connect = require('./connect');
const { joinClasses } = require('jade/lib/runtime');


class materias {

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

    async create(materiasParm) {
        try{
            var sql = "INSERT INTO materias SET materia = ? ";
            var param = [materiasParm.materia];

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

            var sql = `SELECT id, materia FROM materias`;

            var param = [];

            var con = await connect.createConnection();

            var materias = await new Promise((resolve, reject) =>{
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
                            materia: result[i].materia,
                            
                        })
                    }

                    resolve(list);
                })

            })
            
            return materias;

        } 
        catch (ex) {
            console.log(ex);
        }
    }

}

module.exports.materias = materias;