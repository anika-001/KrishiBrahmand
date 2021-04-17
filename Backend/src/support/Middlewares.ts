import * as passport from 'passport';
import * as express from 'express';

class Middlewares{
    public passportauthenticatemiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
        passport.authenticate('local', (error, user, info) => {
            //authenticate user using passport local strategy
            if (error == "User not found with given username" || error == "Invalid password" || error == "Please verify email") return res.status(200).send({ "statusCode": 1, "message": error });
            if (error) return res.status(500).send({ "statusCode": 2, "message": error });

            //if successful, login user
            req.login(user, function (error) {
                if (error) return res.status(500).send({ "statusCode": 2, "message": error });
                next();
            });
        })(req, res, next);
    }
}

export let middleware = new Middlewares();