import chai from 'chai';
import chaiHttp from 'chai-http';

import { mapStatusCodeOnlyRoute } from './mapStatusCodeOnlyRoute';
import app from '../server';

chai.use(chaiHttp);
chai.should();

describe('Map Status Code Only Route', () => {
  it('Maps correctly', done => {
    mapStatusCodeOnlyRoute(app, 'get', '/success', 200);
    chai
      .request(app)
      .get('/success')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
});
