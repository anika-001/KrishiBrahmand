import * as LocalStrategy from 'passport-local';
import { account } from '../DatabaseSchemaModels/Account'
import { UsersModel } from '../ViewModels/UsersModel';
//import {authenticate} from './Authenticate';

class PassportConfig {
    public strategy() {
        return new LocalStrategy.Strategy({
            usernameField: 'email',
            passReqToCallback: true,
          },

            // Custom authenticate function

            function (req, username, password, done) {
                // authenticate user
                UsersModel.authenticate(username, password, done);
            });
    }

    public serialize() {
        // Custom function

        return function (user: any, done: any) {
            if (user) done(null, user);
        }
    }

    public deserialize() {
        // Custom Function

        return function (id: string, done: any) {
            account.findById(id, function(err: Error, user: any) {
                done(err, user);
              });
          }
    }

}

export let passport_config = new PassportConfig();