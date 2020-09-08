var express = require('express');
var appServer = express();
appServer.use(express.json()); 

appServer.listen (510, ()=>{
    console.log('port 510');
});
var list = [];
appServer.get('/',
    (req,res)=>{
        res.send('Hello dah');
    }
);
appServer.post('/addVideogame', 
    (req,res)=>{
        let newGameAux={};
        newGameAux.id = req.body.id;
        newGameAux.titulo = req.body.titulo;
        newGameAux.añoDeLanzamiento = req.body.añoDeLanzamiento;
        newGameAux.estudio = req.body.estudio;
        newGameAux.descripcion = req.body.descripcion;
        newGameAux.edadMinima = req.body.edadMinima;
        list.push(newGameAux);
        res.send('Game created: ' + newGameAux.titulo);
        console.log(list);
    }
);
appServer.delete('/deletegame/:id',
    (req, res)=>{
        let ida=  req.params.id;
        console.log('deleting: ', ida);
        for(var i = 0; i<list.length;i++){
            if(list[i].id==ida){
                list.splice(i,1);
            }
        }
        res.send('deleted')
        console.log(list);
    }
);
appServer.get('/show',
    (req,res)=>{
        res.json(list);
        console.log('Show list');
        console.log(list);
    }
);
appServer.get('/showbyId/:id',
    (req, res)=>{
        let auxId=  req.params.id;
        let auxP;

        for(var i = 0; i<list.length;i++){
            if(list[i].id==auxId){
                res.json(list[i]);
                auxP=i;
            }
        }
        res.send('send')
        console.log('found:')
        console.log(list[auxP]);
    }
);
appServer.get('/byName/:nombre',
    (req, res)=>{
        let auxName=req.params.nombre;
        let aux;
        console.log(req.params.nombre);
        for(var i = 0; i<list.length;i++){
            console.log(req.params.nombre);
            if(list[i].titulo==auxName){
                console.log(req.params.nombre);
                aux=i;
            }
        }
        res.json(list[aux]);
        console.log('Founded:');
        console.log(list[aux]);
    }
);
appServer.get('/recentShow/:date',
    (req, res)=>{
        let recent = [];
        let date=req.params.date;

        for(var i = 0; i<list.length;i++){
            
            console.log('nope' + date);
            if(list[i].añoDeLanzamiento<=date){
                console.log('yup' + date);
                recent.push(list[i]);
            }
        }
        res.json(recent);
        console.log('results:')
        console.log(recent);
    }
);

