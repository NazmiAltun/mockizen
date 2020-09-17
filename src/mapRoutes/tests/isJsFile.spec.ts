import { expect } from 'chai';
import isJsFile from '../isJsFile';

describe('Check if Js File', () => {
  ['/test.js', '/file.js?cache=true'].forEach(route => {
    it('should return true if path is js file', () => {
      expect(isJsFile(route)).to.be.true;
    });
  });
});
