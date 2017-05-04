import EntityInterface from '../src/EntityInterface';
import Model from '../src/Model';

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
    year: {
      type: 'Number',
      maxLength: 10,
      nullable: false,
    },
  },
};

const data = {
  name: 'Chevrolet',
  type: 'Camaro',
  year: 2011,
};

/**
 * @test {Entity}
 */
describe('Entity functionality', () => {
  const model = new Model(options);
  let entity = model.create(data);

  it('Creates new Entity', () => {
    entity = model.create(data);

    expect(entity)
      .toBeInstanceOf(EntityInterface);

    expect(entity.name)
      .toBe(data.name);

    expect(entity.year)
      .toBe(data.year);
  });

  it('Creates new Entity with data overflow', () => {
    expect(model.create({
      notExists: null,
    }).notExists)
      .toBeUndefined();
  });

  it('Changes Entity data and checks changed state', () => {
    expect(entity.isChanged())
      .toBeFalsy();

    entity.year = 2010;

    expect(entity.isChanged())
      .toBeTruthy();

    entity.year = entity.year;

    expect(entity.isChanged())
      .toBeTruthy();

    entity.year = data.year;

    expect(entity.isChanged())
      .toBeFalsy();
  });
});

