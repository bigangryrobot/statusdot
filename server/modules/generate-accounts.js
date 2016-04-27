let administrators = [
  {
    name: { first: 'Admin', last: 'McAdmin' },
    email: 'admin@admin.com',
    password: 'password',
    roles: ["employee"] 
  },
  {
    name: { first: 'Joe', last: 'Buff' },
    email: 'joe@hdbuff.com',
    password: 'password',
    roles: ["employee"] 
  },
  {
    name: { first: 'Jane', last: 'Doe' },
    email: 'jane@yahoo.com',
    password: 'password',
    roles: ["employee"] 
  },
  {
    name: { first: 'Dan', last: 'Smith' },
    email: 'dan@example.net',
    password: 'password',
    roles: ["manager"] 
  }
];

let generateAccounts = () => {  
  let fakeUserCount = 5,
      usersExist    = _checkIfAccountsExist( administrators.length + fakeUserCount );

  if ( !usersExist ) {
    _createUsers( administrators );
    _createUsers( _generateFakeUsers( fakeUserCount ) );
  }
};

let _checkIfAccountsExist = ( count ) => {
  let userCount = Meteor.users.find().count();
  return userCount < count ? false : true;
};

let _createUsers = ( users ) => {
  for ( let i = 0; i < users.length; i++ ) {
    let user       = users[ i ],
        userExists = _checkIfUserExists( user.email );

    if ( !userExists ) {
      _createUser( user );
    }

    createdUser = Meteor.users.findOne( { "emails.address": user.email }, { fields: { "_id": 1 } } );
    Roles.setUserRoles( createdUser, user.roles );    
  }
};

let _checkIfUserExists = ( email ) => {
  return Meteor.users.findOne( { 'emails.address': email } );
};

let _createUser = ( user ) => {
  Accounts.createUser({
    email: user.email,
    password: user.password,
    profile: {
      name: user.name
    }
  });
};

let _generateFakeUsers = ( count ) => {
  let users = [];

  for ( let i = 0; i < count; i++ ) {
    users.push({
      name: { first: faker.name.firstName(), last: faker.name.lastName() },
      email: faker.internet.email(),
      password: faker.internet.password(10, 20),
      roles: ["employee"] 
    });
  }

  return users;
};

Modules.server.generateAccounts = generateAccounts;