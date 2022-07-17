//mostrar el numero de alumnos agrupados por estado, que no sean de la ciudad de queretaro y que el nombre
//del alumno no contenga las palabras JUAN o MARIA y ordenados des forma descendente por el numero de alumnos

db.alumnos.aggregate([
    {$match:{"ciudad":{$ne:"QUERETARO"}}},
    {$match:{
        $and:[
            {"nombre":{$not:/.*maria.*/i}},
            {"nombre":{$not:/.*juan.*/i}}
            ]
        }},
    {$group:{"_id":{estado:"$estado"},nalu:{$sum:1}}},
    {$project:{_id:0,"estado":"$_id.estado",nalu:1}},
    {$sort:{nalu:-1}}
    ])



