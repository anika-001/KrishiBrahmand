var content = {
    controller(name) {
        return `import * as express from 'express';

import { Validator } from '../support/Validator';
import { ${name}Model } from '../ViewModels/${name}Model';

class ${name}Cntrlr {

    public router: express.Router = express.Router();

    /**
    * The method constructor. Constructor
    *
    */
    public constructor() {
        ${name}Cntrlr.setRouterMiddleWare(this.router);
    }

    /**
    * The method setRouterMiddleWare. 
    *
    * @param router of type express.Router
    * @returns void
    */
    public static setRouterMiddleWare(router: express.Router): void {
    router.route('/')
    
    }
}

export let ${name.toLowerCase()}cntrlr = new ${name}Cntrlr();`},

    model(name){
        return `export class ${name}Model {
            
}
export let ${name.toLowerCase()}model = new ${name}Model();`
    },
}

var fs = require('fs')
const prompt = require('prompt-sync')({ sigint: true });
const mode = prompt("Enter 1 for creating a controller. ");
if (mode == "1") {
    var name = prompt("Please enter the controller name: ");
    name = name.charAt(0).toUpperCase() + name.slice(1);
    fs.appendFile("./src/controller/" + name + "Cntrlr.ts", content.controller(name), function (err) {
        if (err) throw err;
        fs.appendFile("./src/ViewModels/" + name + "Model.ts", content.model(name), function (err) {
            if (err) throw err;
            fs.readFile('./src/ServerAPI.ts', function(err, data) {
                var ind = data.indexOf("this.apiApp.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {");
                var datafin = data.slice(0, ind) + `this.apiApp.use('/v1/${name.toLowerCase()}', /${name.toLowerCase()}cntrlr.router);\n\t\t` + data.slice(ind, data.length)
                fs.appendFile("./src/data.txt", datafin, function (err) {
                    if (err) throw err;
                }); 
              });
            console.log('Saved!');
        });
    });

}

