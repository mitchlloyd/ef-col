/* globals QUnit */
import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

QUnit.assert.elementHasContent = function($element, content) {
  let actualContent = $element.text().trim();
  let match = actualContent.match(content);
  this.push(match, actualContent, content, `Element has content: "${content}"`);
};
