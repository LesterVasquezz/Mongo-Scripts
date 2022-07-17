db.alumnos.aggregate([
    {$unwind:"$evaluaciones"}, //depués agrupamos
    {$group:
        {
            _id:"$evaluaciones.materia",
            fmax:{$max:"$evaluaciones.fecha"},
            fmin:{$min:"$evaluaciones.fecha"},
            }
        },
        
     {$group:
        {
            _id:{fmax:"$fmax", fmin:"$fmin"}
            }
        },
      {
          $project:{_id:0, fmax:"$_id.fmax",fmin:"$_id.fmin"}
          } 
      
   
])

db.alumnos.aggregate([
    {$unwind:"$evaluaciones"}, //depués agrupamos
    {$match:{
        $and:[
        {"evaluaciones.fecha":{$gte:ISODate("2020-12-01T00:00:00.000Z")}},
        {"evaluaciones.fecha":{$lte:ISODate("2021-02-28T00:00:00.000Z")}},
        ]
        }},
        {$group:
        {
            _id:"materia",
            fmax:{$max:"$evaluaciones.fecha"},
            fmin:{$min:"$evaluaciones.fecha"},
            }
        }
      
   
])


db.alumnos.aggregate([
    {$unwind:"$evaluaciones"}, //depués agrupamos
    {$match:{
        $and:[
        {"evaluaciones.fecha":{$gte:ISODate("2020-12-01T00:00:00.000Z")}},
        {"evaluaciones.fecha":{$lte:ISODate("2021-02-28T00:00:00.000Z")}},
        ]
        }},
        {$group:
        {
            _id:"$ciudad",
            fmax:{$max:"$evaluaciones.fecha"},
            fmin:{$min:"$evaluaciones.fecha"},
            calificacionNumero:{$sum:1},
            calificacionTotal:{$sum:"$evaluaciones.calificacion"},
            calificacionPromedio:{$avg:"$evaluaciones.calificacion"}
            }
        }
      
   
])

db.alumnos.aggregate([
    {$unwind:"$evaluaciones"}, //después agrupamos
    {$match:{
        $and:[
        {"evaluaciones.fecha":{$gte:ISODate("2020-12-01T00:00:00.000Z")}},
        {"evaluaciones.fecha":{$lte:ISODate("2021-02-28T00:00:00.000Z")}},
        ]
        }},
        {$group:
        {
            _id:"$ciudad",
            fmax:{$max:"$evaluaciones.fecha"},
            fmin:{$min:"$evaluaciones.fecha"},
            calificacionNumero:{$sum:1},
            calificacionTotal:{$sum:"$evaluaciones.calificacion"},
            calificacionPromedio:{$avg:"$evaluaciones.calificacion"}
            }
        },{
          $project:{_id:0, ciudad:"$_id",fmax:1, fmin:1,calificacionNumero:1,
              calificacionTotal:1,calificacionPromedio:1}
          },
          
          {$sort:{ciudad:1}},
          
          {
            //sirve para guardar el resultado en una nueva coleccion 
            $merge:{into:"ciudadevaluaciones", on:"_id", whenMatched:"replace",whenNotMatched:"insert"}
            }
        
      
   
])


db.alumnos.aggregate([
    {$unwind:"$evaluaciones"}, //depués agrupamos
    {$match:{
        $and:[
        {"evaluaciones.fecha":{$gte:ISODate("2020-12-01T00:00:00.000Z")}},
        {"evaluaciones.fecha":{$lte:ISODate("2021-02-28T00:00:00.000Z")}},
        ]
        }},
        {$group:
        {
            _id:"$ciudad",
            fmax:{$max:"$evaluaciones.fecha"},
            fmin:{$min:"$evaluaciones.fecha"},
            calificacionNumero:{$sum:1},
            calificacionTotal:{$sum:"$evaluaciones.calificacion"},
            calificacionPromedio:{$avg:"$evaluaciones.calificacion"}
            }
        },{
          $project:{_id:0, ciudad:{$ifnull:["$_id","Sin Dato"]},fmax:1, fmin:1,calificacionNumero:1,
              calificacionTotal:1,calificacionPromedio:1}
          },
          
          {$sort:{ciudad:1}},
          
          {
            //sirve para guardar el resultado en una nueva coleccion 
            $merge:{into:"cdevaluaciones", on:"ciudad", whenMatched:"replace",whenNotMatched:"insert"}
            }

])

//out, crea proyeccion sin hacer merge 
            
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"}, //depués agrupamos
    {$match:{
        $and:[
        {"evaluaciones.fecha":{$gte:ISODate("2020-12-01T00:00:00.000Z")}},
        {"evaluaciones.fecha":{$lte:ISODate("2021-02-28T00:00:00.000Z")}},
        ]
        }},
        {$group:
        {
            _id:"$ciudad",
            fmax:{$max:"$evaluaciones.fecha"},
            fmin:{$min:"$evaluaciones.fecha"},
            calificacionNumero:{$sum:1},
            calificacionTotal:{$sum:"$evaluaciones.calificacion"},
            calificacionPromedio:{$avg:"$evaluaciones.calificacion"}
            }
        },{
          $project:{_id:0, ciudad:{$ifnull:["$_id","Sin Dato"]},fmax:1, fmin:1,calificacionNumero:1,
              calificacionTotal:1,calificacionPromedio:1}
          },
          
          {$sort:{ciudad:1}},
          
          {
            $out:"cdevaluaciones"
            }
])







