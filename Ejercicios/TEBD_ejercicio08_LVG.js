//agrupar por estados y crear un arreglo con las  ciudades y colonias y numero de alumnos por cada uno
        
db.alumnos.aggregate([
{
    $group:{
        _id:{estado:"$estado",
        ciudad:"$ciudad",
        colonia:"$colonia",},
        alu:{$sum:1}
        
        }
    },
{
    $group:{
        _id:{estado:"$_id.estado"},
        ciudades:{$push:{
            ciudad:"$_id.ciudad",
            colonia:"$_id.colonia",
            numAlu:"$alu"
            }},
        }
    },
{$project:{
    estado:"$_id.estado", ciudades:"$ciudades",_id:0
    }}
])