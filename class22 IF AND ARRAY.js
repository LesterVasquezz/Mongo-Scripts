use colegio

db.alumnos.aggregate([
    {$match: {
            evaluaciones: {$exists: 1}
        }
    },
    {$project: {
            _id: 0,
            nombre: {$concat: ["$nombre", " ", "$ap_paterno", " ", "$ap_materno"]},
            primerEval: {$arrayElemAt: ["$evaluaciones", 0]},
            tercerEval: {$arrayElemAt: ["$evaluaciones", 2]},
            ultimaEval: {$arrayElemAt: ["$evaluaciones", -1]},
        }
    }
])

db.alumnos.aggregate([
    {$project: {
            _id: 0,
            nombre: {$concat: ["$nombre", " ", "$ap_paterno", " ", "$ap_materno"]},
            numeroEvaluaciones: {
                $cond: {
                    if: {$isArray: "$evaluaciones"},
                    then: {$size: "$evaluaciones"},
                    else: 0
                }
            }
        },
    },
    {$group: {
            _id: "$numeroEvaluaciones",
            numeroAlumnos: {$sum: 1}
        }
    },
    {$project: {
            _id: 0,
            numeroEvaluaciones: "$_id",
            numeroAlumnos: 1
        }
    },
    {$sort: {numeroAlumnos: -1}}
])

db.alumnos.aggregate([
    {$match: {
            $and: [
                {evaluaciones: {$exists: 1}},
                {$expr: {
                    $eq: [
                        {$size: "$evaluaciones"},
                        3
                        ]
                    }
                }
            ]
        }
    }
])

db.alumnos.aggregate([
    {$match: {$and: [
                {evaluaciones: {$exists: 1}},
                {$expr: {
                    $gt: [
                        {$size: "$evaluaciones"},
                        5
                    ]
                  }
                }
            ]
        }
    },
    {$project: {
            _id: 0,
            nombre: {$concat: ["$nombre", " ", "$ap_paterno", " ", "$ap_materno"]},
            tresPrimEval: {$slice: ["$evaluaciones", 0, 3]},
            tresSegEval: {$slice: ["$evaluaciones", 3, 3]},
            tresTercEval: {$slice: ["$evaluaciones", 6, 3]},
        }
    }
])













