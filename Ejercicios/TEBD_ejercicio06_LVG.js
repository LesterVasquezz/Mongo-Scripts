//LESTER VASQUEZ GALVAN 

//ejercicio
//crear una nueva coleccion que contenga la ciudad, el nombre completo del alumno,
//el curp y el email llamado alumnosCiudad
//usando lookup generar un arreglo con los datos de los alumnos que coincidan por ciudad
//mostrar solo los campos ciudad y alumno ciudad 


//creamos la coleccion 
db.alumnos.aggregate([

{   
    $project:{
        _id:0,
        ciudad:"$ciudad", 
        nombre:{$concat:["$ap_paterno", " ", "$ap_materno", " ", "$nombre"]}, //concatenamos para nombre completo 
        curp:"$curp",
        email:"$email"
        
        }
},//fin project
{
    $merge:{into:"alumnosCiudad"}
}
])


//realizamos el lookup

db.alumnos.aggregate([
   {$group://agrupamos por ciudad
        {
            _id:{ciudad:"$ciudad"}
            }
        },
   {    //hacemos proyeccion
          $project:{_id:0, ciudad:"$_id.ciudad"}
   },
    {
        $lookup:{ //buscamos coincidencias de ciudades, donde cada ciudad contendra los datos de los alumnos que pertenezcan a dicha ciudad 
            from:"alumnosCiudad", 
            localField:"ciudad", 
            foreignField:"ciudad",
            as:"AlumnoCiudad" 
            }
    },

])





