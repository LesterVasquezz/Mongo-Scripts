//1. Crear un arreglo que contenga los países por region
db.paises.aggregate(
[
    {
    $group:{
            _id:"$region",
            paises:{$addToSet:{
                Pais:"$nombre"
                }}
        }
    },
    { 
    $project:{Region:"$_id",Paises:"$paises",_id:0}
    }
]
)

//2. Listar los países que tengan mas de una frontera
db.paises.aggregate(
[   {
    $unwind:"$fronteras"
    },
    {
    $group:{
            _id:"$nombre",
            numFronteras:{$sum:1}
        }
    },
    {
     $match:{numFronteras:{$gt:1}}   
    },
    { 
    $project:{Pais:"$_id",numFronteras:"$numFronteras",_id:0}
    }
]
)
    
//3. Listar los países con una población mayor a 100 millones de habitantes
db.paises.aggregate(
[   
    {
     $match:{poblacion:{$gt:100000000}}   
    },
    { 
    $project:{Pais:"$nombre",Poblacion:"$poblacion",_id:0}
    }
]
)

//4.Listar el número de países por cada idioma en la colección
db.paises.aggregate(
[   {
    $unwind:"$idiomas"
    },
    {
    $group:{
            _id:"$idiomas",
            numPaises:{$sum:1}
        }
    },
    { 
    $project:{Idioma:"$_id.nombre",numPaises:"$numPaises",_id:0}
    }
]
)
    
//5.Listar los países que hablen mas de un idioma oficial y crear un arreglo con los idiomas de cada pais
db.paises.aggregate(
[   {
    $unwind:"$idiomas"
    },
    {
    $group:{
            _id:"$nombre",
            numIdiomas:{$sum:1},
            idiomas:{$push:{
                    nombre:"$idiomas.nombre"
                    }}
        }
    },
    {
     $match:{numIdiomas:{$gt:1}}   
    },
    {$project:{Pais:"$_id", idiomas:"$idiomas",_id:0}}    
]
)
    
//6.Listar la poblacion total por cada region
db.paises.aggregate(
[   {
    $group:{
            _id:"$region",
            poblacionTotal:{$sum:"$poblacion"},

        }
    },
    {$project:{Region:"$_id", poblacionTotal:"$poblacionTotal",_id:0}},
    {
    $sort:{"poblacionTotal":-1}
     }
        
]
)
//7.Listar los paises que en su nombre oficial contengan la palabra Republic
db.paises.aggregate(
[   {
    $match:{
            nombre:/.*republic.*/i,
        }
    },       
    {$project:{Pais:"$nombre",_id:0}}
]
)
//8.Listar las monedas en la colección y el numero de países que las utilizan
db.paises.aggregate(
[   {
    $unwind:"$monedas"
    },
    {
    $group:{
            _id:"$monedas",
            numPaises:{$sum:1},
        }
    },
    {$project:{Moneda:"$_id.nombre", Codigo:"$_id.code",numPaises:"$numPaises",_id:0}},
    {
        $sort:{"numPaises":-1}
        }
]
)
//9.Listar los países que pertenezcan a un bloqueRegional y la lista de los bloques a los que pertenece
db.paises.aggregate(
[   {
    $unwind:"$bloqueRegional"
    },
    {
    $group:{
            _id:"$nombre",
            numeroBloques:{$sum:1},
            bloquesRegionales:{$push:{bloque:"$bloqueRegional.nombre"}},
        }
    },
    {$project:{Pais:"$_id", numeroBloques:"$numeroBloques",bloquesRegionales:"$bloquesRegionales",_id:0}}
]
)

//10.Listar los países que tengan mas de 3 zonas horarias y mostrar sus zonas horarias
db.paises.aggregate(
[   {
    $unwind:"$zonahoraria"
    },
    {
    $group:{
            _id:"$nombre",
            numZonasH:{$sum:1},
            zonasHorarias:{$addToSet:{zonaHoraria:"$zonahoraria"}},
        }
    },
    {
     $match:{numZonasH:{$gt:3}}   
    },
    {$project:{Pais:"$_id",zonasHorarias:"$zonasHorarias",_id:0}}
]
)  