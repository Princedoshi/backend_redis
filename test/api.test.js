// api.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('API Tests', () => {
  
  describe('GET /notes', () => {
    it('should get all notes', async () => {
      const res = await chai.request(app).get('/notes');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
    });
  });

  describe('GET /notes/:id', () => {
    it('should get a specific note by ID', async () => {
      const noteId = 'your_note_id_here'; 
      const res = await chai.request(app).get(`/notes/${noteId}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
    });
  });
});


(async () => {
  try {
    // Run the tests
    await mocha.run();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
