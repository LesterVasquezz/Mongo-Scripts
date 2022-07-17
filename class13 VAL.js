/*niveles de validacion
estricto: todos los que ya estan insertados 
moderado: se aplica a las nuevas inserciones
off: todas las validaciones se ignoran 
*/

db.runCommand(
{
    collMod:"contactos",
    validationLevel:"moderate",
    validationAction:"error",
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
                 promedio:{
                     bsonType:"decimal",
                     minimum:0.0,
                     maximum:10.0
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

db.runCommand(
{
    collMod:"alumnos",
    validationLevel:"moderate",
    validationAction:"error",
    validator:{
        $jsonSchema:{
            bsonType: "object",
            required:["nombre","ap_paterno","sexo"],
    properties:{ 
        nombre:{bsonType:"string"},
        ap_paterno:{bsonType:"string"},
        sexo:{bsonType:"string",enum:["F","M"]}
        
        }
            }
        
        }
    
})

db.getCollectionInfos({name:"alumnos"})   

db.alumnos.insert({
   "team":"observant Badgers",
    "score":2000.0,
    nombre:"viviana",
    ap_paterno:"Lopez",
    sexo:"F"
}
)

db.runCommand(
{
    collMod:"alumnos",
    validationLevel:"strict",
    validationAction:"error",
    validator:{
        $jsonSchema:{
            bsonType: "object",
            required:["nombre","ap_paterno","sexo"],
    properties:{ 
        nombre:{bsonType:"string"},
        ap_paterno:{bsonType:"string"},
        sexo:{bsonType:"string",enum:["F","M"]}
        
        }
            }
        
        }
})

db.runCommand(//quitar validador
{
    collMod:"alumnos",
    validationLevel:"off",
    validator:{},

})

db.alumnos.validate()