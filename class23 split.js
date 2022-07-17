db.alumnos.aggregate([
{$match:{
    $and:[{"estado":"QUERETARO"},{ciudad:/(quer|qro)/i}]
    }},
{$project:{
    alumno:{$concat:["$nombre"," ", "$ap_paterno"," ", "$ap_materno"]},
    splitColonia:{$split:["$colonia"," "]},_id:0
    }},
{$unwind:"$splitColonia"},
{$match:{"splitColonia":/(parque|quinta|fracc|lomas|plaza|cumbre|colina)/i}},
{$group:{_id:"$splitColonia", totalAlu:{$sum:1}}},
{$project:{tipoColonia:"$_id",totalAlu:"$totalAlu", _id:0}},
{$sort:{tipoColonia:1}}
])

db.alumnos.aggregate([
{$match:{
    $and:[{"estado":"QUERETARO"},{ciudad:/(quer|qro)/i}]
    }},
{$project:{
    alumno:{$concat:["$nombre"," ", "$ap_paterno"," ", "$ap_materno"]},
    splitColonia:{$split:["$colonia"," "]},_id:0
    }},
{$project:{
    alumno:1, splitColonia:1,indexColonia:{$indexOfArray:["$splitColonia","FRACCIONAMIENTO"]}
    }},
{$match:{"indexColonia":{$ne:-1}}}
    
])

db.alumnos.aggregate([
{$match:{
    $and:[{"estado":"QUERETARO"},{ciudad:/(quer|qro)/i}]
    }},
{$project:{
    alumno:{$concat:["$nombre"," ", "$ap_paterno"," ", "$ap_materno"]},
    evaluaciones:1, _id:0,
    coloniaArray:{
        $cond:{
            if:{$regexMatch:{
                    input:"$colonia",
                    regex:/\s/
                    }
                },
                then: {$split:["$colonia"," "]},
                else:"$colonia"
            }
        }
    }},
{$project:{
    alumno:1, evaluaciones:1, coloniaArray:1,
    esArrayColonia:{$isArray:"$coloniaArray"},
    esArrayEval:{$isArray:"$evaluaciones"},
    }}

])

db.alumnos.aggregate([
{$match:{
    $and:[{"estado":"QUERETARO"},{materias:{$exists:1}}]
    }},
{$project:{
    alumno:{$concat:["$nombre"," ", "$ap_paterno"," ", "$ap_materno"]},
    materias:1, _id:0,
    reverseMaterias:{$reverseArray:"$materias"}
    }}

])





