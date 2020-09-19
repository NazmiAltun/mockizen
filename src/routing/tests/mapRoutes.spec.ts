import chai from 'chai';
import chaiHttp from 'chai-http';
import { before } from 'mocha';
import { app } from '../../server';
import mapRoutes from '../parseAndmapRoutes';

chai.use(chaiHttp);
chai.should();

describe('Map Routes', () => {
  before(async () => {
    await mapRoutes(app, './src/routing/tests/mocks/scenarios.json');
  });
  ['/all', '/200.htm', '/sucess.html', '/sample.json'].forEach(route => {
    it('should map get routes from scenarios.json file', done => {
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
    it('should map delete route', done => {
      chai
        .request(app)
        .delete('/all')
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(202);
          done();
        });
    });
  });
});
