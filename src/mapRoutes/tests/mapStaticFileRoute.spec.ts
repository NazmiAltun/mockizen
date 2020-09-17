import chai from 'chai';
import path from 'path';
import chaiHttp from 'chai-http';
import mapStaticFileRoute from '../mapStaticFileRoute';
import { app } from '../../server';

chai.use(chaiHttp);
chai.should();

['/wtf.jpg', '/200.htm', '/200.html'].forEach(route => {
  describe('Map Status Code Only Route', () => {
    beforeEach(() => {
      const dir = path.resolve(process.cwd(), './src/mapRoutes/tests/mocks/');
      mapStaticFileRoute(app, 'get', dir, route, route);
    });
    it('Maps correctly', done => {
      chai
        .request(app)
        .get(route)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(200);
          done();
        });
    });
  });
});
