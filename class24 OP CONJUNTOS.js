db.alumnos.aggregate([
{$match:{
    $and:[{"estado":"QUERETARO"},{materias:{$exists:1}}]
    }},
{$project:{
    alumno:{$concat:["$nombre"," ", "$ap_paterno"," ", "$ap_materno"]},
    materias:"$materias", _id:0,
    slideMaterias:{$slice:["$materias",3 ,3 ]}
    }},
{$project:{
    alumno:1,
    materias:1, _id:0,
    slideMaterias:1,
    diffMaterias:{$setDifference:["$materias","$slideMaterias"]},
    intersecMaterias:{$setIntersection:["$materias","$slideMaterias"]},
    unionMaterias:{$setUnion:["$materias","$slideMaterias"]}
    }},
{$project:{
    alumno:1,
    materias:1, _id:0,
    slideMaterias:1,
    diffMaterias:1,
    intersecMaterias:1,
    unionMaterias:1,
    esigualMaterias:{$setEquals:["$materias","$unionMaterias"]},
    essubsetMaterias:{$setIsSubset:["$materias","$slideMaterias"]},
    essubsetMaterias2:{$setIsSubset:["$slideMaterias","$materias"]},
    }}
])


db.alumnos.aggregate([
{$match:{
    $and:[{"estado":"QUERETARO"},{materias:{$exists:1}}]
    }},
{$project:{
    alumno:{$concat:["$nombre"," ", "$ap_paterno"," ", "$ap_materno"]},
    _id:0,
    }},
{
    $addFields:{
            replaceUno:{$replaceOne:{input:"$alumno",find:"A", replacement:"@"}},
            replaceTodo:{$replaceAll:{input:"$alumno",find:"A", replacement:"@"}}
        }
    }

])

db.alumnos.aggregate([
{$unwind:"$evaluaciones"},
{$match:{"evaluaciones.materia":"FIS"}},
{$project:{
    alumno:{$concat:["$nombre"," ", "$ap_paterno"," ", "$ap_materno"]},
   ciudad:"$ciudad", _id:0,
    evaluaciones:"$evaluaciones"
    }},
{$merge:"evaluacionesFIS"}
])

db.evaluacionesESP.aggregate([
{$set:{_id:"evaluacionesESP"}},
{$unionWith:{
    coll:"evaluacionesFIS",
    pipeline:[{$set:{_id:"evaluacionesFIS"}}]
    }},
{$unionWith:{
    coll:"evaluacionesOPT",
    pipeline:[{$set:{_id:"evaluacionesOPT"}}]
    }},
{$sort:{alumno:1}},
{$group:{_id:"$alumno", ncalif:{$sum:1},promedio:{$avg:"$evaluaciones.calificacion"}}},
{$project:{alumno:"$_id",ncalif:"$ncalif", promedio:"$promedio",_id:0}}
])
