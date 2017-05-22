import Model from '../src/Model';

const Users = {
  first: {
    firstName: 'John',
    lastName: 'Doe',
  },
  second: {
    firstName: 'Holy',
    lastName: 'See',
  },
};

const Roles = {
  first: {
    name: 'User',
  },
  second: {
    name: 'Administrator',
  },
};

describe('BaseModel instancing', () => {
  it('Throws error on instancing BaseModel', () => {
    expect(() => new Model())
      .toThrow('Cannot instantiate: BaseModel');
  });
});

describe('Model creating', () => {
  let User = null;

  it('Gets new Model class that extends BaseModel', () => {
    User = Model.create('User');

    expect(typeof User)
      .toBe('function');

    expect(User.prototype)
      .toBeInstanceOf(Model);
  });
});

describe('BaseModel static connectors', () => {
  it('Returns connectors as literal object', () => {
    expect(typeof Model.connectors)
      .toBe('object');

    expect(Model.connectors.constructor)
      .toBe({}.constructor);
  });
});

describe('Model instancing', () => {
  const User = Model.create('User');
  let user = null;

  it('Creates instance of Model without data', () => {
    user = new User();

    expect(user)
      .toBeInstanceOf(Model);
  });

  it('Checks that user is instance of User model', () => {
    expect(user)
      .toBeInstanceOf(User);
  });

  it('Creates instance of User without data', () => {
    expect(new User())
      .toBeInstanceOf(Model);
  });
});

describe('Model instance $name property', () => {
  const User = Model.create('User');
  const user = new User();

  it('Gets user.$name with value "User"', () => {
    expect(user.$name)
      .toBeDefined();

    expect(user.$name)
      .toBe('User');
  });
});

describe('Model fields getters ans setters', () => {
  const User = Model.create('User');
  const user = new User({
    firstName: 'John',
    lastName: 'Doe',
  });

  it('Gets user.firstName with value "John"', () => {
    expect(user.firstName)
      .toBeDefined();

    expect(user.firstName)
      .toBe('John');
  });

  it('Gets user.lastName with value "Doe"', () => {
    expect(user.lastName)
      .toBeDefined();

    expect(user.lastName)
      .toBe('Doe');
  });

  it('Assigns "Holy" value to user.firstName', () => {
    expect(user.firstName = 'Holy')
      .toBe('Holy');
  });

  it('Assigns "See" value to user.lastName', () => {
    expect(user.lastName = 'See')
      .toBe('See');
  });
});

describe('Model instance $fieldNames property', () => {
  const User = Model.create('User');
  const user = new User({
    firstName: 'John',
    lastName: 'Doe',
  });

  it('Gets user.$fieldNames as array', () => {
    expect(user.$fieldNames)
      .toBeDefined();

    expect(Array.isArray(user.$fieldNames))
      .toBeTruthy();
  });

  it('Gets user.$fieldNames array that contains "firstName" and "lastName"', () => {
    expect(user.$fieldNames)
      .toEqual(['firstName', 'lastName']);
  });
});

describe('Model instance $fields property', () => {
  const User = Model.create('User');
  const user = new User({
    firstName: 'John',
    lastName: 'Doe',
  });

  it('Gets user.$fields object', () => {
    expect(user.$fields)
      .toBeDefined();

    expect(typeof user.$fields)
      .toBe('object');
  });

  it('Gets user.$fields with keys "firstName" and "lastName"', () => {
    expect(Reflect.ownKeys(user.$fields))
      .toEqual(['firstName', 'lastName']);
  });

  it('Gets user.$fields with values {firstname: "John", lastName: "Doe"}', () => {
    expect(user.$fields.firstName)
      .toBe(Users.first.firstName);

    expect(user.$fields.lastName)
      .toBe(Users.first.lastName);
  });

  it('Gets user.$fields with {firstname: "Holy", lastName: "See"}', () => {
    user.firstName = 'Holy';
    user.lastName = 'See';

    expect(user.$fields.firstName)
      .toBe('Holy');

    expect(user.$fields.lastName)
      .toBe('See');
  });
});

describe('Model instance $changes property', () => {
  const User = Model.create('User');
  const user = new User({
    firstName: 'John',
    lastName: 'Doe',
  });

  it('Gets user.$changes of unchanged user as null', () => {
    expect(user.$changes)
      .toBeDefined();

    expect(user.$changes)
      .toBeNull();
  });

  it('Gets user.$changes with {firstName: "Holy", lastName: "See"}', () => {
    user.firstName = 'Holy';
    user.lastName = 'See';

    expect(user.$changes)
      .not.toBeNull();

    expect(typeof user.$changes)
      .toBe('object');

    expect(user.$changes)
      .toEqual({
        firstName: 'Holy',
        lastName: 'See',
      });
  });

  it('Gets user.$changes with null value after revert changes', () => {
    user.firstName = 'John';
    user.lastName = 'Doe';

    expect(user.$changes)
      .toBeNull();
  });

  it('Gets user.$changes with null value after assign same values', () => {
    expect(user.$changes)
      .toBeNull();

    const firstName = user.firstName;
    const lastName = user.lastName;

    user.firstName = firstName;
    user.lastName = lastName;

    expect(user.$changes)
      .toBeNull();
  });
});

describe('Model instance isChanged method', () => {
  const User = Model.create('User');
  const user = new User({
    firstName: 'John',
    lastName: 'Doe',
  });

  it('Checks that user.isChanged method is defined', () => {
    expect(user.isChanged)
      .toBeDefined();

    expect(user.isChanged())
      .toBeFalsy();
  });

  it('Gets true from user.isChanged after change field value', () => {
    user.firstName = 'Holy';

    expect(user.isChanged())
      .toBeTruthy();
  });

  it('Gets false from user.isChanged after revert changes', () => {
    user.firstName = 'John';

    expect(user.isChanged())
      .toBeFalsy();
  });
});

describe('Model instance $original property', () => {
  const User = Model.create('User');
  const user = new User({
    firstName: 'John',
    lastName: 'Doe',
  });

  it('Gets literal object from user.$original', () => {
    expect(user.$original)
      .not.toBeNull();

    expect(typeof user.$original)
      .toBe('object');
  });

  it('Gets literal object with firstName and lastName from user.$original', () => {
    expect(user.$original)
      .toEqual({
        firstName: 'John',
        lastName: 'Doe',
      });
  });
});

describe('Model instance rollback method', () => {
  const User = Model.create('User');
  const user = new User({
    firstName: 'John',
    lastName: 'Doe',
  });

  it('Returns false from user.isChanged after rollback changes', () => {
    user.firstName = 'Holy';
    user.lastName = 'See';

    expect(user.isChanged())
      .toBeTruthy();

    user.rollback();

    expect(user.isChanged())
      .toBeFalsy();
  });
});

describe('Model static $entries property', () => {
  const User = Model.create('User');
  const user1 = new User({
    firstName: 'John',
    lastName: 'Doe',
  });

  const user2 = new User({
    firstName: 'Holy',
    lastName: 'See',
  });

  it('Returns array from User.$entries', () => {
    expect(User.$entries)
      .toBeDefined();

    expect(Array.isArray(User.$entries))
      .toBeTruthy();
  });

  it('Gets array with two items from User.$entries', () => {
    expect(User.$entries.length)
      .toBe(2);
  });
});
