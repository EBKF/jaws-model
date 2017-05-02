import Model from '../src/Model';
import { isEntity } from '../src/utils/tests';

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
      default: 'testtt',
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

  console.log(test.isChanged());

  test.name = 'Aaaaa';

  console.log(test.isChanged());
});
