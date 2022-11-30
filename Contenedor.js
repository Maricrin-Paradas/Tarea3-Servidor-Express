const fs = require('fs');

class Contenedor {
    constructor(filename) {
        this.filename = filename;
    }

    file = async data => {
        try {
            await fs.promises.writeFile(
                this.filename, JSON.stringify(data, null, 2)
            );
        }catch(err){
            console.log(`error: ${err}`);
        }
    }

    getAll = async () => {
        try {
            const productos = await fs.promises.readFile(this.filename, 'utf-8');
            return JSON.parse(productos);
        }catch(err){
            if(err.message.includes('no existe')) return [];
            console.log(`error: ${err.message}`);
        }
    }

    save = async object => {
        let productos = await this.getAll();
        console.log('productos', productos)
        try{
            let newId;
            productos.length === 0
                ? (newId = 1)
                : (newId = productos[productos.length-1].id +1);
            let newObject = {...object, id: newId};
            productos.push(newObject);
            await this.file(productos);
            return newObject.id;
        }catch(err) {
            console.log(`error: ${err}`);
        }

    }

    getById = async id => {
        let productos = await this.getAll();
        try {
            const object = productos.find( elemento => elemento.id === id );
            return object ? object : null;
        }catch(err) {
            console.log(`error: ${err}`);
        }

    }
    deleteById = async id => {
        let productos = await this.getAll();
        try{
            productos = productos.filter ( producto => producto.id != id );
            await this.file(productos);
            return 'Eliminado el id ' + id
        }catch(err) {
            console.log(`error: ${err}`);
        }

    }

    deleteAll = async() => {
      this.file([])
   }
}

const products = new Contenedor ('productos.txt')

//const trial = async () => {
  //  let save = await products.save({
    //    title: 'Cosa',
	//	price: 546.67,
	//	thumbnail:
	//		'https://algo',
  //  });
  // let getAll = await products.getAll()
   //let getById = await products.getById(2)
  // let deleteById = await products.deleteById(1)
  // let deleteAll = await products.deleteAll()
//    console.log('salvando ', save);
  //  console.log('obteniendo ', getAll);
 //   console.log('obteniendo por Id ', getById);
 // console.log('eliminando por ID ', deleteById);
 //console.log('eliminando todo', deleteAll);
//};

//trial();

module.exports = Contenedor; 