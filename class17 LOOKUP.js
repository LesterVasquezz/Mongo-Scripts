db.alumnos.aggregate([
{$match:
    {
        $and:[{ciudad:"QUERETARO"},{nombre:/jose|ana/i}]
        }
},//fin match
{   
    $project:{
        matricula:"$clave_alu", "evaluaciones":1, fecha: "$evaluaciones.fecha",
        alumno:{$concat:["$ap_paterno", " ", "$ap_materno", " ", "$nombre"]}
        }
},//fin projection
{
    $merge:{into:"alumnosQueretaro"}
}
  
])

db.alumnos.aggregate([
{$unwind:"$evaluaciones"},
{$match:
    {
        $and:[{ciudad:"QUERETARO"},{nombre:/jose|ana/i}]
        }
},//fin match
{   
    $project:{
        matricula:"$clave_alu", materia:"$evaluaciones.materia",calificacion:"$evaluaciones.calificacion", 
        fecha: "$evaluaciones.fecha",_id:0,
        alumno:{$concat:["$ap_paterno", " ", "$ap_materno", " ", "$nombre"]}
        }
},//fin projection
{
    $merge:{into:"alumnosEvalQueretaro"}
}
  
])


//-----------------------------//////////--------------//
db.alumnos.aggregate([
    {
        $lookup:{
            from:"alumnosQueretaro", //nombre de la coleccion a donde haremos la busqueda
            localField:"clave_alu", 
            foreignField:"matricula",
            as:"datosAlumnos" //arreglo donde se guardan los datos que si tiene el
                                //otro elemento 
            }
    },
])


db.alumnos.aggregate([
    {
        $lookup:{
            from:"alumnosEvalQueretaro", //nombre de la coleccion a donde haremos la busqueda
            localField:"clave_alu", 
            foreignField:"matricula",
            as:"EvaluacionesAlumnos" //arreglo donde se guardan los datos que si tiene el
                                //otro elemento 
            }
    },
    {
         $match:{$expr:{$gt:[{$size:"$EvaluacionesAlumnos"},0]}}
     },
//      {
//          $match:{clave_alu:{$in:[11030172,11050190]}}
//      }
//     {
//         $match:{EvaluacionesAlumnos:{$not:{$size:0}}}
//     }
])

//ejercicio
//crear una nueva coleccion que contenga la ciudad, el nombre completo del alumno,
//el curp y el email llamado alumnosCiudad
//usando lookup generar un arreglo con los datos de los alumnos que coincidan por ciudad
//mostrar solo los campos ciudad y alumno ciudad 
     
db.alumnos.find({email:"estebanlunete@yahoo.com.mx"})






