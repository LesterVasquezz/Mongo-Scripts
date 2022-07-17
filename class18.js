db.alumnos.aggregate([
    {
        $lookup:{
            from:"alumnosEvalQueretaro",
            localField:"clave_alu", 
            foreignField:"matricula",
            as:"EvaluacionesAlumnos" 
            }
    },
    {
         $match:{$expr:{$gt:[{$size:"$EvaluacionesAlumnos"},0]}}
     },
     {   
    $project:{
        _id:0,
        alumno:{$concat:["$ap_paterno", " ", "$ap_materno", " ", "$nombre"]},
        clave_alu:1, "EvaluacionesAlumnos":1
        }
       },

{
            $unwind:"$EvaluacionesAlumnos"
            },
            
{$group: {
        _id: {
            clave_alu: "$clave_alu",
            alumno: "$alumno",
            anio: {$dateToString: {format: "%Y", date: "$EvaluacionesAlumnos.fecha"}},
            promedio: {$avg: "$EvaluacionesAlumnos.calificacion"},
            materias: {$sum: 1}
        }
      }
    
    },
    
    {$sort:{"_id.alumno":1}
    
    },
    {   
    $project:{
        _id:0,
        clave_alu:"$_id.clave_alu",
        alumno:"$_id.alumno",
        anio:"$_id.anio",
        promedio:1,
        materias:1
        }
       },
])













