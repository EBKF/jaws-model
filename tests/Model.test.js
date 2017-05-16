import Model from '../src/Model';

const UserDefinition = {
  name: 'User',
  schema: {
    firstName: {
    },
    lastName: {
    },
  },
};

const RoleDefinition = {
  name: 'Role',
  schema: {
    name: {
    },
  },
};

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


/**
 * @test {Model}
 */
describe('Model class extending', () => {
  let UserModel = null;

  /**
   * @test {Model}
   */
  it('Gets new Model class', () => {
    UserModel = Model.extend(UserDefinition);

    expect(typeof UserModel)
      .toBe('function');
  });

  it('Checks if Test class is instance of Model', () => {
    expect(UserModel.prototype)
      .toBeInstanceOf(Model);
  });
});

describe('Model class connectors', () => {
  it('Checks if connectors property returns literal object', () => {
    expect(typeof Model.connectors)
      .toBe('object');

    expect(Model.connectors.constructor)
      .toBe({}.constructor);
  });
});

describe('Model instancing', () => {
  const UserModel = Model.extend(UserDefinition);
  let user = null;

  it('Creates new instance of Model', () => {
    user = new UserModel(Users.first);

    expect(user)
      .toBeInstanceOf(UserModel);
  });
});

describe('Model instance $name property', () => {
  const UserModel = Model.extend(UserDefinition);
  const user = new UserModel(Users.first);

  it('Checks if $name property exists', () => {
    expect(user.$name)
      .toBeDefined();
  });

  it('Checks if $name property has correct value', () => {
    expect(user.$name)
      .toBe(UserDefinition.name);
  });
});

describe('Model fields getters and setters', () => {
  const UserModel = Model.extend(UserDefinition);
  const user = new UserModel(Users.first);

  it('Checks if all fields getters are defined', () => {
    expect(user.firstName)
      .toBeDefined();

    expect(user.lastName)
      .toBeDefined();
  });

  it('Checks if all fields getters have correct values', () => {
    expect(user.firstName)
      .toBe(Users.first.firstName);

    expect(user.lastName)
      .toBe(Users.first.lastName);
  });

  it('Checks if all setters are working properly', () => {
    user.firstName = Users.second.firstName;
    user.lastName = Users.second.lastName;

    expect(user.firstName)
      .toBe(Users.second.firstName);

    expect(user.lastName)
      .toBe(Users.second.lastName);
  });
});

describe('Model instance $fieldNames property', () => {
  const UserModel = Model.extend(UserDefinition);
  const user = new UserModel(Users.first);

  it('Checks if $fieldNames property exists', () => {
    expect(user.$fieldNames)
      .toBeDefined();
  });

  it('Checks if $fieldNames property is array', () => {
    expect(Array.isArray(user.$fieldNames))
      .toBeTruthy();
  });

  it('Checks if $fieldNames have correct values', () => {
    expect(user.$fieldNames)
      .toEqual(['firstName', 'lastName']);
  });
});

describe('Model instance $fields property', () => {
  const UserModel = Model.extend(UserDefinition);
  const user = new UserModel(Users.first);

  it('Checks if $fields property exists', () => {
    expect(user.$fields)
      .toBeDefined();
  });

  it('Checks if $fields property is object', () => {
    expect(typeof user.$fields)
      .toBe('object');
  });

  it('Checks if $fields contains only own fields', () => {
    expect(Reflect.ownKeys(user.$fields))
      .toEqual(['firstName', 'lastName']);
  });

  it('Checks if $fields contains correct values', () => {
    expect(user.$fields.firstName)
      .toBe(Users.first.firstName);

    expect(user.$fields.lastName)
      .toBe(Users.first.lastName);
  });

  it('Checks if $fields contains correct values after change', () => {
    user.firstName = Users.second.firstName;
    user.lastName = Users.second.lastName;

    expect(user.$fields.firstName)
      .toBe(Users.second.firstName);

    expect(user.$fields.lastName)
      .toBe(Users.second.lastName);
  });
});

describe('Model instance undefined fields declarations', () => {
  const UserModel = Model.extend(UserDefinition);

  it('Ignores undefined fields declarations when creating new instance', () => {
    const user = new UserModel({
      undefined: true,
      ...Users.first,
    });

    expect(user.$fields)
      .not.toHaveProperty('undefined');
  });
});

describe('Model instance $changes property', () => {
  const UserModel = Model.extend(UserDefinition);
  const user = new UserModel(Users.first);

  it('Checks if $changes property exists and is null', () => {
    expect(user.$changes)
      .toBeDefined();

    expect(user.$changes)
      .toBeNull();
  });

  it('Checks if $changes is object with changed fields', () => {
    user.firstName = Users.second.firstName;
    user.lastName = Users.second.lastName;

    expect(user.$changes)
      .not.toBeNull();

    expect(typeof user.$changes)
      .toBe('object');

    expect(user.$changes)
      .toEqual({
        firstName: Users.second.firstName,
        lastName: Users.second.lastName,
      });
  });

  it('Checks if $changes is null after revert changes', () => {
    user.firstName = Users.first.firstName;
    user.lastName = Users.first.lastName;

    expect(user.$changes)
      .toBeNull();
  });

  it('Checks if $chanes is null after assignig same value as current', () => {
    expect(user.$changes)
      .toBeNull();

    user.firstName = user.firstName;
    user.lastName = user.lastName;

    expect(user.$changes)
      .toBeNull();
  });
});

describe('Model instace isChanged method', () => {
  const UserModel = Model.extend(UserDefinition);
  const user = new UserModel(Users.first);

  it('Checks if isChanged return false if none of fields is changed', () => {
    expect(user.isChanged)
      .toBeDefined();

    expect(user.isChanged())
      .toBeFalsy();
  });

  it('Checks if isChanged return true after some fields was changed', () => {
    user.firstName = Users.second.firstName;

    expect(user.isChanged())
      .toBeTruthy();
  });

  it('Checks if isChanged return false after revert changes', () => {
    user.firstName = Users.first.firstName;

    expect(user.isChanged())
      .toBeFalsy();
  });
});

describe('Model instance $original property', () => {
  const UserModel = Model.extend(UserDefinition);
  const user = new UserModel(Users.first);

  it('Checks if $original property exists and is object', () => {
    expect(user.$original)
      .not.toBeNull();

    expect(typeof user.$original)
      .toBe('object');
  });

  it('Checks if $original contains fields with proper values', () => {
    expect(user.$original)
      .toEqual({
        firstName: Users.first.firstName,
        lastName: Users.first.lastName,
      });
  });
});

describe('Model instance rollback method', () => {
  const UserModel = Model.extend(UserDefinition);
  const user = new UserModel(Users.first);

  it('Checks if rollback method reverts changes', () => {
    user.firstName = Users.second.firstName;
    user.lastName = Users.second.lastName;

    expect(user.isChanged())
      .toBeTruthy();

    user.rollback();

    expect(user.isChanged())
      .toBeFalsy();
  });
});
