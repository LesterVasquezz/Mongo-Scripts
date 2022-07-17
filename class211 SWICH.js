db.alumnos.aggregate([
{$unwind: "$evaluaciones"},
{$group:{
    _id:{alumno:{$concat:["$nombre"," ", "$ap_paterno"," ","$ap_materno"]}},
    promCalif:{$avg:"$evaluaciones.calificacion"}
    }},//fin group 
{$project:{alumno:"$_id.alumno",promCalif:"$promCalif",_id:0,
    observacion:{
        $switch:{
            branches:[
            {
                case:{$eq:["$promCalif",10]},
                then:"excelente calificacion"
            },
            {
                case:{$and:[{$gte:["$promCalif",8]},{$lt:["$promCalif",10]}]},
                then:"buena calificacion"
            },
            {
                case:{$and:[{$gte:["$promCalif",6]},{$lt:["$promCalif",8]}]},
                then:"calificacion regular"
            },
            {
                case:{$lt:["$promCalif",6]},
                then:"mala calificacion"
            },
            ],
            default:"sin calificacion para evaluar"
            }
        }
    }},//fin project 
    {$sort:{promCalif:-1}}
])

db.alumnos.aggregate([
{$match: {evaluaciones:{$exists:1}}},
{$project:{
    alumno:{$concat:["$nombre"," ", "$ap_paterno"," ","$ap_materno"]},
    califGTE8:{
        $filter:{
            input:"$evaluaciones",
            as:"evaluaciones",
            cond:{$gte:["$$evaluaciones.calificacion",8]}
            }
        }
    }},//fin project 
    {$sort:{alumno:1}}
])

db.alumnos.aggregate([
{$match: {//"_id" : ObjectId("5f873e4a7591b0b48f65fd0f")
            //evaluaciones:{$exists:1}
           }},
{$unwind:"$evaluaciones"},
{$sort:{"evaluaciones.calificacion":-1,"evaluaciones.materia":1}},
{$group:{_id:{oid:"$_id",alumno:{$concat:["$nombre"," ", "$ap_paterno"," ","$ap_materno"]}},
        evaluaciones:{$push:"$evaluaciones"}
        }},
{$project:{
    _id:0,
    alumno:"$_id.alumno",
    califGTE8:{
        $filter:{
            input:"$evaluaciones",
            as:"evaluaciones",
            cond:{$gte:["$$evaluaciones.calificacion",8]}
            }
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
