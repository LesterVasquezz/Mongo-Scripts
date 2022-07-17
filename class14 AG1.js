db.alumnos.find({ "clave_alu" : 11050235})


db.alumnos.aggregate(
[
    {$match:{ "clave_alu" : 11050235}},
    {$unwind:"$materias"} //deja un documento para cada elemento del arreglo 
])

db.alumnos.aggregate(
[
    {$match:{ "clave_alu" : 11050235}},
    {$unwind:"$evaluaciones"} //deja un documento para cada elemento del arreglo, 
    //los elementos que no tinen el campo evaluaciones no aparecen  como documento
])

db.alumnos.aggregate(
[
    {$match:{ "clave_alu" : 11050235}},
    {$unwind:"$calificaciones"} 
])


db.alumnos.aggregate(
[
    {$match:{ "clave_alu" : 11050235}},
    {$unwind:"$evaluaciones"},
    {$unwind:"$materias"} 
])
    
db.alumnos.aggregate(
[
    {$match:{ "clave_alu" : 11050235}},
    {$unwind:"$edad"},//solo separa arreglos 
    {$count:"ndocu"}
])


db.alumnos.aggregate([
    {$match:{"evaluaciones":{$exists:1}}},
    {$unwind:"$evaluaciones"}, //depués agrupamos
    {$group:{"_id":{
        "calve_alu":"$clave_alu",
        "alumno":{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}
        },
        "numEvaluaciones":{$sum:1}
        }
        
    }//fin group
    //{$count:"ndocu"}
])

db.alumnos.aggregate([
    {$match:{"evaluaciones":{$exists:1}}},
    {$unwind:"$evaluaciones"}, //depués agrupamos
    {$group:{"_id":{
        "calve_alu":"$clave_alu",
        "alumno":{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}
        },
        "numEvaluaciones":{$sum:1},
        "promedio":{$avg:"$evaluaciones.calificacion"} //calculamos el promedio de cada alumno
        }
        
    }//fin group
    //{$count:"ndocu"}
])
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"}, //depués agrupamos
    {$group:{"_id":{
        "calve_alu":"$clave_alu",
        "alumno":{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}
        },
        "numEvaluaciones":{$sum:1},
        "promedio":{$avg:"$evaluaciones.calificacion"}, //calculamos el promedio de cada alumno
        "maxima":{$max:"$evaluaciones.calificacion"}, 
        "minima":{$min:"$evaluaciones.calificacion"}
        
        }
    }//fin group
    //{$count:"ndocu"}
])
   
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"}, //depués agrupamos
    {$group:{"_id":{
        "calve_alu":"$clave_alu",
        "alumno":{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}
        },
        "numEvaluaciones":{$sum:1},
        "promedio":{$avg:"$evaluaciones.calificacion"}, //calculamos el promedio de cada alumno
        "maxima":{$max:"$evaluaciones.calificacion"}, 
        "minima":{$min:"$evaluaciones.calificacion"}
        }
    },//fin group
    {$project:{_id:0, matricula:"$_id.clave_alu",alumno:"$_id.alumno",numEvaluaciones:1,
            promedio:1,maxima:1,minima:"$min"}},
    {$sort:{promedio:-1}}
    //{$count:"ndocu"}
])   
    
    
    //mostrar a los reprobados 
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"}, //depués agrupamos
    {$group:{"_id":{
        "calve_alu":"$clave_alu",
        "alumno":{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}
        },
        "numEvaluaciones":{$sum:1},
        "promedio":{$avg:"$evaluaciones.calificacion"}, //calculamos el promedio de cada alumno
        "maxima":{$max:"$evaluaciones.calificacion"}, 
        "minima":{$min:"$evaluaciones.calificacion"}
        }
    },//fin group
    {$project:{_id:0, matricula:"$_id.clave_alu",alumno:"$_id.alumno",numEvaluaciones:1,
            promedio:1,maxima:1,minima:"$min"}},
    {$sort:{promedio:-1}},
    {$match:{promedio:{$lt:6}}}//,{$count:"rep"}
    
])       
    
//mostrar a los reprobados hombres
db.alumnos.aggregate([
    {$match:{"sexo":"M"}},
    {$unwind:"$evaluaciones"}, //depués agrupamos
    {$group:{"_id":{
        "calve_alu":"$clave_alu",
        "alumno":{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}
        },
        "numEvaluaciones":{$sum:1},
        "promedio":{$avg:"$evaluaciones.calificacion"}, //calculamos el promedio de cada alumno
        "maxima":{$max:"$evaluaciones.calificacion"}, 
        "minima":{$min:"$evaluaciones.calificacion"}
        }
    },//fin group
    {$project:{_id:0, matricula:"$_id.clave_alu",alumno:"$_id.alumno",numEvaluaciones:1,
            promedio:1,maxima:1,minima:"$min"}},
    {$sort:{promedio:-1}},
    {$match:{promedio:{$lt:6}}},
    {$count:"rep"}
    
])   
    //los hombres que hayan reprobado una materia 
db.alumnos.aggregate([
    {$match:{"sexo":"M"}},
    {$unwind:"$evaluaciones"}, //depués agrupamos
    {$match:{"evaluaciones.calificacion":{$lt:6}}},
    {$group:{"_id":{
        "clave_alu":"$clave_alu",
        "alumno":{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}
        },
        "numReprobadas":{$sum:1}
        }
    },
    {$project:{_id:0, matricula:"$_id.clave_alu",alumno:"$_id.alumno",numReprobadas:1,
            }},
     {$sort:{numReprobadas:-1}},
    //{$count:"rep"}
])     
     
    //los mujeres que hayan reprobado una materia 
db.alumnos.aggregate([
    {$match:{"sexo":"F"}},
    {$unwind:"$evaluaciones"}, //depués agrupamos
    {$match:{"evaluaciones.calificacion":{$lt:6}}},
    {$group:{"_id":{
        "clave_alu":"$clave_alu",
        "alumno":{$concat:["$nombre"," ","$ap_paterno"," ","$ap_materno"]}
        },
        "numReprobadas":{$sum:1}
        }
    },
    {$project:{_id:0, matricula:"$_id.clave_alu",alumno:"$_id.alumno",numReprobadas:1,
            }},
     {$sort:{numReprobadas:-1}},
   // {$count:"rep"}
])     