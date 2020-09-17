import chai from 'chai';
import chaiHttp from 'chai-http';
import { mapStaticFileRoute } from '../mapStaticFileRoute';
import { app } from '../../server';

chai.use(chaiHttp);
chai.should();

['/wtf.jpg', '/200.htm', '/200.html'].forEach(route => {
  mapStaticFileRoute(app, 'get', 'tests/mocks', route);
  describe('Map Status Code Only Route', () => {
    it('Maps correctly', done => {
      chai
        .request(app)
        .get(route)
        .end(async (err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(200);
          done();
        });
    });
  });
});
