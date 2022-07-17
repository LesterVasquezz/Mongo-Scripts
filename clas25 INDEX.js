db.estudiantes.getIndexes()

db.estudiantes.createIndex(
{ciudad:1}
)
db.estudiantes.createIndex(
{nombre:1}
)
db.estudiantes.createIndex(
{ciudad:-1}
)

db.estudiantes.dropIndex(
{ciudad:-1}
)

db.estudiantes.find().sort({ciudad:1}).explain()

db.estudiantes.find({$query:{},$explain:1}).sort({ciudad:-1})

db.estudiantes.find().sort({nombre:1}).explain()

db.estudiantes.find({ciudad:"QUERETARO"}).explain()

db.estudiantes.find({ciudad:"QUERETARO"}).explain("executionStats")

//indices multimples 
db.estudiantes.createIndex(
{estado:1,ciudad:1}
)
db.estudiantes.find({estado:"QUERETARO"}).explain("executionStats")
db.estudiantes.find({$and:[{estado:"QUERETARO"},{ciudad:"QUERETARO"}]}).explain("executionStats")


//cursores 

db.estudiantes.find({$and:[{estado:"QUERETARO"},{ciudad:"QUERETARO"}]})

cursor=db.estudiantes.find({$and:[{estado:"QUERETARO"},{ciudad:"QUERETARO"}]})

cursor.batchSize()

cursor.hasNext()

while(cursor.hasNext())print(cursor.next())

estudiantesArray= cursor.toArray()

estudiantesArray[100]

estudiantesArray.forEach(function(md){print("alumno "+md.nombre+" "+md.ap_paterno+" "+md.ap_materno);})


if(estudiantesArray.length>0){printjson(estudiantesArray[0])}








