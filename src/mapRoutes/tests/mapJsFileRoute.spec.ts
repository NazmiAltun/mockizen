import chai from 'chai';
import path from 'path';
import chaiHttp from 'chai-http';
import mapJsFileRoute from '../mapJsFileRoute';
import { app } from '../../server';

chai.use(chaiHttp);
chai.should();

describe('Map Js File Route', () => {
  const dir = path.resolve(process.cwd(), './src/mapRoutes/tests/mocks/');

  ['/delayed.js'].forEach(route => {
    mapJsFileRoute(app, 'get', dir, route, route);
    it('Maps correctly', done => {
      chai
        .request(app)
        .get(route)
        .end((err, res) => {
          console.log('request ended');
          if (err) {
            console.log(err);
            done(err);
          }
          res.should.have.status(200);
          done();
        });
    });
  });
});
