import chai from 'chai';
import path from 'path';
import chaiHttp from 'chai-http';
import mapStaticFileRoute from '../mapStaticFileRoute';
import { app } from '../../server';

chai.use(chaiHttp);
chai.should();

describe('Map Status Code Only Route', () => {
  const dir = path.resolve(process.cwd(), './src/mapRoutes/tests/mocks/');

  ['/wtf.jpg', '/200.htm', '/200.html', '/sample.json'].forEach(route => {
    mapStaticFileRoute(app, 'get', dir, route, route);
    it('Maps correctly', done => {
      chai
        .request(app)
        .get(route)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(200);
          if (route.endsWith('.html') || route.endsWith('.htm')) {
            res.should.be.html;
          }
          if (route.endsWith('.json')) {
            res.should.be.json;
          }
          done();
        });
    });
  });
});
