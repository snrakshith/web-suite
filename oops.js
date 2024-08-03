class User {
  constructor(name) {
    this.name = name;
  }

  logMe() {
    console.log(`Username${this.name}`);
  }
}

// const us = new User("raju");
// us.logMe();
class Admin extends User {
  constructor(name, email) {
    super(name);
    this.email = email;
  }

  static generateId() {
    console.log(`Emial id${this.email}`);
  }
}

const us = new Admin("raju", "sn.86@gmial.com");
us.logMe();
// us.generateId();
