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
{$project:{_id:1,"ap_paterno":1,"ap_materno":1, "nombre":1,"evaluaciones":{
    $cond:{
        if:{$isArray:"$evaluaciones"},
        then:"$evaluaciones",
        else:[{}]
        }
    }}},
{$unwind:"$evaluaciones"},
{$project:{_id:1,"ap_paterno":1,"ap_materno":1, "nombre":1,"evaluaciones":1,
    observacionCal:{
        $switch:{
            branches:[
            {
                case:{$eq:["$evaluaciones.calificacion",10]},
                then:"A"
            },
            {
                case:{$and:[{$gte:["$evaluaciones.calificacion",8]},{$lt:["$evaluaciones.calificacion",10]}]},
                then:"B"
            },
            {
                case:{$and:[{$gte:["$evaluaciones.calificacion",6]},{$lt:["$evaluaciones.calificacion",8]}]},
                then:"C"
            },
            {
                case:{$lt:["$evaluaciones.calificacion",6]},
                then:"D"
            },
            ],
            default:"sin calificacion para evaluar"
            }
        }   
    }},//FIN PROJECT 
{$group:{_id:{oid:"$_id",alumno:{$concat:["$nombre"," ", "$ap_paterno"," ","$ap_materno"]}},
        evaluaciones:{$push:{
            materia:"$evaluaciones.materia",
            calificacion:"$evaluaciones.calificacion",
            observacionCal:"$observacionCal"
         }},
         promCalif:{$avg:"$evaluaciones.calificacion"}
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
        },
    promCalif:"$promCalif",
    observacionProm:{
        $switch:{
            branches:[
            {
                case:{$eq:["$promCalif",10]},
                then:"A"
            },
            {
                case:{$and:[{$gte:["$promCalif",8]},{$lt:["$promCalif",10]}]},
                then:"B"
            },
            {
                case:{$and:[{$gte:["$promCalif",6]},{$lt:["$promCalif",8]}]},
                then:"C"
            },
            {
                case:{$lt:["$promCalif",6]},
                then:"D"
            },
            ],
            default:"sin calificacion para evaluar"
            }
        }
    }},//fin project

])
    

















