//2. Insertar 3 documentos en la colección alumnos de la bd test, con todo los campos, pero 
//un documento sin CURP, un documento sin email, un documento sin ciudad, todo con una sola instrucción

db.alumnos.insert(
[
{
    "clave_alu" : 11039998,
    "ap_paterno" : "PEREX",
    "ap_materno" : "GAVIRIA",
    "nombre" : "RAMON",
    "email":"perezgaviria@hotmail.com",
    "sexo" : "M",
    "ciudad" : "MEXICO",
    "colegio" : {
        "nivel" : "Secundaria",
        "nombre" : "Instituto Neza"
    },
    "status_alu" : "AC"
},
{
    "clave_alu" : 11030888,
    "ap_paterno" : "GOMEZ",
    "ap_materno" : "RODRIGUEZ",
    "nombre" : "HUMBERTO",
    "sexo" : "M",
    "curp" : "GORH910403HSPMRM07",
    "ciudad" : "QUERETARO",
    "colegio" : {
        "nivel" : "PREPA",
        "nombre" : "FGFGFG"
    },
    "status_alu" : "AC"
},
{
    "clave_alu" : 11139998,
    "ap_paterno" : "LOPEZ",
    "ap_materno" : "MATEOS",
    "nombre" : "ARTURO",
    "email":"arturo@hotmail.com",
    "curp" : "LOMA990403HSPMRM07",
    "sexo" : "M",
    "colegio" : {
        "nivel" : "Secundaria",
        "nombre" : "IMPULSORA"
    },
    "status_alu" : "AC"
},
]
)




//3. Listar el nombre completo del alumno, ciudad y email de los alumnos
// que tengan una cuidad registrada como Queretaro o sus diversas formas de escritura

db.alumnos.aggregate([
{$match: {
    $or:[
        {ciudad:/.*queretaro.*/i},
        {ciudad:/.*quer.*/i},
        {ciudad:/.*qro.*/i}
    ]
    }},
{   
    $project:{
        _id:0,
        nombre:{$concat:["$ap_paterno", " ", "$ap_materno", " ", "$nombre"]}, //concatenamos para nombre completo 
        ciudad:"$ciudad", 
        email:"$email"
        
        }
},
])
//4.Listar las 10 nombres de alumnos más usados en los alumnos registrados, y el número de apariciones, solo contar los documentos
 que tengan el campo CURP con un valor válido (usar una expresión regular)

db.alumnos.aggregate([
    {$match:{
        $and:[
            {curp:{$exists:1}},
            {curp:/[A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9]/
            },
        ]
        }}, 
    
    {$group:{"_id":
        "$nombre",
        "numero":{$sum: 1},
    }
    },
    {$project:{_id:0, nombre:"$_id",
            numero:1}},
     {$sort:{numero:-1}},
     { $limit: 10}

])



//5. 


db.alumnos.aggregate([
    {$unwind:"$evaluaciones"}, 
    
    {$group:{"_id":
        "$nombre",
        "promedio":{$avg:"$evaluaciones.calificacion"},
    }
    },
    {$project:{_id:0, nombre:"$_id",estado:1,
            promedio:1}},
    {
    $merge:{into:"coloniasAlumnos"}
}
   
])