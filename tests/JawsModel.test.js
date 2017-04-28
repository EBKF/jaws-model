import Model, { isEntity } from '../src/JawsModel';

const options = {
  name: 'Device',
  schema: {
    name: {
      type: 'String',
      maxLength: 100,
      nullable: true,
    },
    type: {
      type: 'String',
      default: null,
    },
    description: {
      type: 'String',
      maxLength: 255,
      nullable: false,
    },
  },
};

test('Is object an entity', () => {
  const TestModel = new Model(options);
  const test = TestModel.create({
    name: 'Chevrolet',
    type: 'Camaro',
    description: 'Year 2011',
  });

  expect(isEntity(test))
    .toBe(true);
});
