import chai from 'chai';
import chaiHttp from 'chai-http';

import { mapStatusCodeOnlyRoute } from '../mapStatusCodeOnlyRoute';
import app from '../../server';

chai.use(chaiHttp);
chai.should();

['/success', '/200.json', '/200.js', '/200.htm', '/200.html'].forEach((route) => {
  mapStatusCodeOnlyRoute(app, 'get', route, 200);
  describe('Map Status Code Only Route', () => {
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

