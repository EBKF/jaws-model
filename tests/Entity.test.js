import EntityInterface from '../src/EntityInterface';
import ModelInterface from '../src/ModelInterface';
import NotImplementedError from '../src/errors/NotImplementedError';
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
      default: 'test',
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

  it('Implements EntityInterface', () => {
    expect(() => entity.$original)
      .not.toThrow('Not implemented');

    expect(() => entity.$changes)
      .not.toThrow('Not implemented');

    expect(() => entity.$fieldNames)
      .not.toThrow('Not implemented');

    expect(() => entity.isChanged())
      .not.toThrow('Not implemented');

    expect(() => entity.getOriginalFor('name'))
      .not.toThrow('Not implemented');

    expect(() => entity.rollback())
      .not.toThrow('Not implemented');
  });

  /**
   * @test {Entity}
   */
  it('Creates new Entity with data overflow', () => {
    expect(model.create({ notExists: null }).notExists)
      .toBeUndefined();
  });

  /**
   * @test {Entity}
   */
  it('Gets original value of entity property', () => {
    expect(entity.$original)
      .toBeDefined();

    expect(entity.$original)
      .toHaveProperty('year');

    expect(entity.$original)
      .not.toHaveProperty('notExists');

    expect(entity.$original.year)
      .toBe(data.year);

    expect(entity.getOriginalFor('year'))
      .toBe(data.year);

    expect(() => {
      entity.getOriginalFor('notExists');
    })
      .toThrow();
  });

  /**
   * @test {Entity}
   */
  it('Changes Entity data and checks changed state', () => {
    expect(entity.isChanged())
      .toBeFalsy();

    entity.year += 1;

    expect(entity.isChanged())
      .toBeTruthy();

    entity.year = entity.year;

    expect(entity.isChanged())
      .toBeTruthy();

    entity.year = data.year;

    expect(entity.isChanged())
      .toBeFalsy();
  });

  /**
   * @test {Entity}
   */
  it('Reverts changes on modified entity', () => {
    entity.year = entity.$original.year + 1;

    expect(entity.isChanged())
      .toBeTruthy();

    entity.rollback();

    expect(entity.isChanged())
      .toBeFalsy();

    expect(entity.year)
      .not.toBe(entity.$original.year + 1);
  });

  /**
   * @test {Entity}
   */
  it('Gets field names of entity', () => {
    const names = Reflect.ownKeys(options.schema);

    expect(entity.$fieldNames)
      .toBeDefined();

    expect(entity.$fieldNames)
      .toEqual(expect.arrayContaining(names));
  });

  /**
   * @test {Entity}
   */
  it('Gets changes of modified entity', () => {
    const change = {
      name: 'Camarro',
      year: entity.$original.year + 1,
    };

    expect(entity.$changes)
      .toBeDefined();

    expect(entity.$changes)
      .toBeNull();

    entity.name = change.name;
    entity.year = change.year;

    expect(entity.$changes)
      .toMatchObject(change);

    entity.name = entity.$original.name;
    entity.year = entity.$original.year;

    expect(entity.$changes)
      .toBeNull();
  });

  /**
   * @test {Entity}
   */
  it('Rollbacks all changes of modified entity, returing it to original state', () => {
    const change = {
      name: 'Camarro',
      year: entity.$original.year + 2,
    };

    entity.name = change.name;
    entity.year = change.year;

    expect(entity.$changes)
      .toBeTruthy();

    entity.rollback();

    expect(entity.isChanged())
      .toBeFalsy();

    expect(entity.name === data.name);
    expect(entity.year === data.year);
  });

  /**
   * @test {Entity}
   */
  it('Gets parent Model of Entity', () => {
    expect(entity.$model)
      .toBeDefined();

    expect(entity.$model)
      .toBeInstanceOf(ModelInterface);

    expect(entity.$model)
      .toBeInstanceOf(model.constructor);
  });
});
