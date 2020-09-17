import { expect } from 'chai';
import validateExtension from '../validateExtension';

describe('Check if Js File', () => {
  [
    { file: '/test.js', expectedExtension: '.js' },
    { file: '/file.js?cache=true', expectedExtension: '.js' },
    { file: '/test.json', expectedExtension: '.json' },
    { file: '/file.json?cache=true', expectedExtension: '.json' },
  ].forEach(fileExtensionPair => {
    it('should return true if path is js file', () => {
      expect(validateExtension(fileExtensionPair.file, fileExtensionPair.expectedExtension)).to.be.true;
    });
  });
});
