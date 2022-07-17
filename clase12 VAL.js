db.createCollection(
    "contactos",{// nombre coleccion
        validator:{
        $jsonSchema:{
            bsonType:"object",
            required:["nombre","telefono"],
            properties:{
                telefono:{
                    bsonType:"string",
                    description:"ES NECESARIO INGRESAR UN TEL"
                    },
                email:{
                    bsonType:"string",
                    pattern:"@fes\.mx$",
                    description:"email no cumple con patron"
                    },
                etiqueta:{
                    enum:["alumno","profesor","directivo"], //valores aceptados
                    description:"etiqueta acepta ciertos valores"
                    },
                anio_ingreso:{
                    bsonType:"int",
                    minimum:2000,
                    maximum:2021
                    },
                 direccion:{
                    bsonType:"object",
                    required:["cp","ciudad"],
                    properties:{
                        calle:{bsonType:"string"},
                        numero:{bsonType:"string"},
                        colonia:{bsonType:"string"},
                        ciudad:{bsonType:"string",description:"ciudad requerida"},
                        cp:{bsonType:"int",description:"cp requerido"},
                        }
                    }   
                }
            }
       }
    }
)
db.contactos.find()
db.contactos.insert({//invalido
    nombre:"juan",
    apellidos:"lopez"    
    })
    
db.contactos.insert({//invalido
    nombre:"juan",
    telefono:11111    
    })
    
db.contactos.insert({//valido
    nombre:"juan",
    telefono:"123456789"    
    })
    
db.contactos.insert({//valido
    nombre:"Maria",
    telefono:"123456789",
    celular:559999955
    }) 
    
db.contactos.find()
    
db.contactos.insert({//valido
    nombre:"Abraham",
    telefono:"123456789",
    email:"abraham@fes.mx"
    })  
db.contactos.insert({//valido
    nombre:"Vania",
    telefono:"55415588",
    email:"vania@fes.mx",
    etiqueta:"alumno"
    })    
    
db.contactos.insert({//valido
    nombre:"Luis Gerardo",
    telefono:"55419888",
    email:"luisgerardo@fes.mx",
    etiqueta:"alumno",
    anio_ingreso:NumberInt(2018) // convertir porque lo manda como float
    })   
db.contactos.insert({//valido
    nombre:"Monica",
    telefono:"55411118",
    email:"monica@fes.mx",
    etiqueta:"alumno",
    anio_ingreso:NumberInt(2020), // convertir porque lo manda como float
    direccion:{calle:"Av Rancho seco",cp:NumberInt(06400), 
        numero:"S/N",
        colonia:"impulsora",
        ciudad:"neza"}
    })   
    
db.contactos.insert({//valido
    nombre:"Rodrigo",
    telefono:"55410018",
    email:"rodrigo@fes.mx",
    etiqueta:"alumno",
    anio_ingreso:NumberInt(2020), // convertir porque lo manda como float
    direccion:{calle:"Av Rancho seco",cp:NumberInt(06400), 
        ciudad:"neza",
        numero:"S/N",
        colonia:"impulsora",
        estado:"mexico"}
        
    })   
 db.getCollectionInfos({name:"contactos"})   
 
 db.contactos.insert({//valido
    nombre:"Ricardo",
    telefono:"55333018",
    email:"ricardo@fes.mx",
    etiqueta:"alumno",
    anio_ingreso:NumberInt(2020), // convertir porque lo manda como float
    direccion:{calle:"Av Rancho seco",cp:NumberInt(06400), 
        ciudad:"neza",
        numero:"S/N",
        colonia:"impulsora",
        estado:"mexico"},
    promedio:NumberDecimal(10.0)
        
    })   
db.alumnos.insert({
   "team":"observant Badgers",
    "score":2000.0,
    nombre:"viviana"
}
    )



