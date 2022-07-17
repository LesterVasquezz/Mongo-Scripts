db.alumnos.aggregate([
    {$unwind:"$evaluaciones"}, //depués agrupamos
    {$group:{"_id":
        "$evaluaciones.materia"
        ,
        "numEvaluaciones":{$sum:1},
        "promedio":{$avg:"$evaluaciones.calificacion"}, //calculamos el promedio de cada MATERIA
        "maxCalif":{$max:"$evaluaciones.calificacion"}, 
        "minCalif":{$min:"$evaluaciones.calificacion"}
        
        }
    },//fin group
    {$project:{_id:0, materia:"$_id",numEvaluaciones:1,
            promedio:1,maxCalif:1,minCalif:"$minCalif"}},
    {$match:{promedio:{$gte:7.00}}},
    {$sort:{promedio:-1}}
    //{$count:"ndocu"}
])
    
//operadores de fecha 
    
db.alumnos.aggregate(
[
    {$match:{ "actualizado" : {$exists:1}}},
    //{$unwind:"$evaluaciones"},
    {$project:{
            fecha:"$evaluaciones.fecha",
            anio:{$year:"$evaluaciones.fecha"},
            mes:{$month:"$evaluaciones.fecha"},
            dia:{$dayOfMonth:"$evaluaciones.fecha"},
            hora:{$hour:"$evaluaciones.fecha"},
            minuto:{$minute:"$evaluaciones.fecha"},
            segundo:{$second:"$evaluaciones.fecha"},
            milisegundo:{$millisecond:"$evaluaciones.fecha"},
            diaAnio:{$dayOfYear:"$evaluaciones.fecha"},
            diaSemana:{$dayOfWeek:"$evaluaciones.fecha"},
            semana:{$week:"$evaluaciones.fecha"},
            calificacion:"$evaluaciones.calificacion",
            califc100:{$multiply:["$evaluaciones.calificacion",100]},
            fmes:{$dateToString:{format:"%m", date:"$evaluaciones.fecha"}},
            fFecha:{$dateToString:{format:"%Y-%m-%d", date:"$evaluaciones.fecha"}},
            fFechany:{$dateToString:{format:"%Y-%m-%d %H:%M:%S:%L%z"
            ,date:"$evaluaciones.fecha",timezone:"America/New_York"}},
            fecha05:{$dateToString:{format:"%Y-%m-%d %H:%M:%S:%L%z", date:"$evaluaciones.fecha",timezone:"+05:00"}},
        }},
     
])

{$group:{"_id":
        "$anio"
        ,
        "numEvaluaciones":{$sum:1},
        "promedio":{$avg:"$calificacion"}, //calculamos el promedio de cada alumno
        "maxCalif":{$max:"$calificacion"}, 
        "minCalif":{$min:"$calificacion"}
        
        }
    }

//para la tabla alumnos de test ****************
db.alumnos.aggregate(
[
    {$match:{ "actualizado" : {$exists:1}}},
    //{$unwind:"$evaluaciones"},
    {$project:{
            fecha:"$actualizado",
            anio:{$year:"$actualizado"},
            mes:{$month:"$actualizado"},
            dia:{$dayOfMonth:"$actualizado"},
            hora:{$hour:"$actualizado"},
            minuto:{$minute:"$actualizado"},
            segundo:{$second:"$actualizado"},
            milisegundo:{$millisecond:"$actualizado"},
            diaAnio:{$dayOfYear:"$actualizado"},
            diaSemana:{$dayOfWeek:"$actualizado"},
            semana:{$week:"$actualizado"},
            calificacion:"$evaluaciones.calificacion",
            califc100:{$multiply:["$evaluaciones.calificacion",100]},
            fmes:{$dateToString:{format:"%m", date:"$actualizado"}},
            fFecha:{$dateToString:{format:"%Y-%m-%d", date:"$actualizado"}},
            fFechany:{$dateToString:{format:"%Y-%m-%d %H:%M:%S:%L%z"
            ,date:"$actualizado",timezone:"America/New_York"}},
            fecha05:{$dateToString:{format:"%Y-%m-%d %H:%M:%S:%L%z", date:"$actualizado",timezone:"+05:00"}},
        }},
     
])
        
db.alumnos.aggregate(
[
    {$match:{ "actualizado" : {$exists:1}}},
    //{$unwind:"$evaluaciones"},
    {$project:{
            fecha:"$actualizado",
            anio:{$year:"$actualizado"},
            fechacdmx:{$dateToString:{format:"%Y-%m-%d %H:%M:%S:%L%z"
            ,date:"$actualizado",timezone:"America/Mexico_City"}},
             //Operador para agregar fecha
            fechaExpira: {$dateAdd: { startDate: "$actualizado", unit: "day", amount: 3 } },
            fechaMasAnio: {$dateAdd: { startDate: "$actualizado", unit: "year", amount: 3 } },
            fechaMasQuarter: {$dateAdd: { startDate: "$actualizado", unit: "quarter", amount: 3 } },
            fechaMasWeek: {$dateAdd: { startDate: "$actualizado", unit: "week", amount: 3 } },
            fechaMasMonth: {$dateAdd: { startDate: "$actualizado", unit: "month", amount: 3 } },
            fechaMasDay: {$dateAdd: { startDate: "$actualizado", unit: "day", amount: 3 } },
            fechaMasHour: {$dateAdd: { startDate: "$actualizado",unit: "hour", amount: 3 } },
            fechaMasMinute: {$dateAdd: { startDate: "$actualizado", unit: "minute", amount: 3 } },
            fechaMasSeconds: {$dateAdd: { startDate: "$actualizado", unit: "second", amount: 3 } },
            fechaMasMs: {$dateAdd: { startDate: "$actualizado", unit: "millisecond", amount: 3 } },
        } 
     },     
])        
        
        