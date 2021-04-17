import * as request from 'request';
class RestService {

    options = {
        host: 'http://localhost:5000',
        path: '/'
    }

    public posttolog(message: String, sessionID: String) {
        var log = "Date: " + Date() + "\nSessionID: " + sessionID + "\nmessage: " + message + "\n";
        var body = "message=" + log;
        // request.post({
        //     headers: {'content-type' : 'application/x-www-form-urlencoded'},
        //     url:     'http://localhost:5000/logger',
        //     body:    body
        //   }, function(error, response, body){
        //     console.log(error);
        //   });
    }

    public makedbentry(body: any) {
        request.post({
            headers: {'content-type' : 'application/x-www-form-urlencoded'},
            url:     'http://localhost:5001/v1/products/product',
            body:    body
          }, function(error, response, body){
            console.log(error);
          });
    }

}

export let rs = new RestService();