import Model from '../../src/Model';
import RestConnector from '../../src/connectors/RestConnector';
import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

describe('Creating RestConnector instance', () => {
  it('Gets RestConnector', () => {
    expect(Model.connectors.Rest)
      .toBeInstanceOf(RestConnector.constructor);
  });

  it('Creates instance', () => {
    const connector = new Model.connectors.Rest();

    expect(connector)
      .toBeInstanceOf(RestConnector);
  });
});

describe('Setting RestConnector instance', () => {
  const connector = new Model.connectors.Rest();
});
