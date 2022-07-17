//LISTAR TODOS LOS ALUMNOS DE LA COLECCION 
//MOSTRAR EN UN ARREGLO SOLO CON LAS CALIFICACION >= 8
//MOSTRAR EN UN ARREGLO SOLO CON LAS CALIFICACION < 8
//GENERAR UN CAMPO DE OBSERVACIONES DE CALIFICACION 
//GENERAR UN CAMPO DE OBSERVACIONES BASADO EN EL PROMEDIO DE CALIFICACION 
//10=>A
//8,9 =>B
//6,7 =>C
//5 o menos => D

db.alumnos.aggregate([
{$match: {//"_id" : ObjectId("5f873e4a7591b0b48f65fd0f")
            //evaluaciones:{$exists:1}
           }},
{$unwind:"$evaluaciones"},
{$sort:{"evaluaciones.calificacion":-1,"evaluaciones.materia":1}},
{$group:{_id:{oid:"$_id",alumno:{$concat:["$nombre"," ", "$ap_paterno"," ","$ap_materno"]}},
        evaluaciones:{$push:"$evaluaciones"},promCalif:{$avg:"$evaluaciones.calificacion"}
        }},
{$project:{
    _id:0,
    alumno:"$_id.alumno",
    califGTE8:{
        $filter:{
            input:"$evaluaciones",
            as:"evaluaciones",
            cond:{$gte:["$$evaluaciones.calificacion",8]}
            },
        
        },
    califLT8:{
        $filter:{
            input:"$evaluaciones",
            as:"evaluaciones",
            cond:{$lt:["$$evaluaciones.calificacion",8]}
            }
        }
    }},//fin project 
    {$sort:{alumno:1}}
])
    
    
    
    
    
