db.alumnos.aggregate([//hace count del campo y ordena 
{$sortByCount:"$evaluaciones.calificacion"}
])
db.alumnos.aggregate([//hace count del campo y ordena 
{$sortByCount:"$ciudad"}
])
db.alumnos.aggregate([//hace count del campo y ordena 
{$sortByCount:"$estado"}
])

db.alumnos.aggregate([
{$match:{ciudad:{$exists:1}, sexo:{$exists:1}}},
])

db.alumnos.aggregate([
{$unwind:"$evaluaciones"},
{$bucket:{ //genera grupos particulares a partir de los campos, los grupos de especifica en boundaries 
    groupBy:"$evaluaciones.calificacion",
    boundaries:[6,7,8,9,10,11],// no se considera el ultimo elemento del arreglo
    default:"otros",
    output:{
        nalu:{$sum:1},
        aluMat:{$addToSet:{
               $concat:["$nombre"," ", "$ap_paterno"," ","$ap_materno"," ", "$evaluaciones.materia"]
            }}
        }
    }}
])
db.alumnos.aggregate([
{$unwind:"$evaluaciones"},
{$bucket:{ //genera grupos particulares a partir de los campos, los grupos de especifica en boundaries 
    groupBy:"$evaluaciones.calificacion",
    boundaries:[6,7,8,9,10,11],// no se considera el ultimo elemento del arreglo
    default:"otros",
    output:{
        nalu:{$sum:1},
        aluMat:{$addToSet:{
               $concat:["$nombre"," ", "$ap_paterno"," ","$ap_materno"," ", "$evaluaciones.materia"]
            }}
        }
    }}
])
db.alumnos.aggregate([
{$unwind:"$materias"},
        {$sortByCount:"$materias"}
])


db.alumnos.aggregate([
{$facet:{//crea subprocesos en el proceso de aggregate
    "materias":[
        {$unwind:"$materias"},
        {$sortByCount:"$materias"},
        {$project:{materia:"$_id",nrow:"$count",_id:0}}
        
    ],
    "evaluaciones":[
        {$unwind:"$evaluaciones"},
        {$sortByCount:"$evaluaciones.calificacion"},
        {$project:{calificacion:"$_id",nrow:"$count",_id:0}}
        
    ]
    }}
])














