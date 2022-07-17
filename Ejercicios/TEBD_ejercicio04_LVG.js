//listar el nombre, ap_pat, curp, meses, email  de los 
//alumnos que no vivan en queretaro o santiago de queretaro y que si tengan el campo 
//evaluaciones
//usar and, y ordenar por ap_paterno y nombre de forma descendente 

// LESTER VASQUEZ GALVAN 

db.alumnos.find(
{$and:[
    {$or:[{ciudad:{$ne:"QUERETARO"}},{ciudad:{$ne:"SANTIAGO DE QUERETARO"}}]},
    {"evaluaciones":{$exists:1}}
    ]},
{_id:0, nombre:1, ap_paterno:1,curp:1, "edad.meses":1, email:1,}
).sort({ap_paterno:-1,nombre:-1,})









