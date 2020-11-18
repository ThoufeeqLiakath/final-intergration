/// <reference types="Cypress" />
describe('First Test', () => {
  it('is working', () => {
    expect(true).to.equal(true);
  });
});
describe('Visit page', () => {
  it('Visit the app', () => {
    cy.visit('/');
  });
});
describe('Go to Register', function () {
  it('url should be register', function () {
    cy.visit('/');
    cy.get('#register').click();
    cy.url().should('include', 'register');
  })
});
describe('Enter register without any data', function () {
  it('url should be register', function () {
    cy.visit('/');
    cy.get('#register').click();
    cy.url().should('include', 'register');
  })
});
describe('Enter register with mismatching passwords', function () {
  it('url should be register', function () {
    cy.visit('/register');
    cy.get('#RegisterUserName').type('cypress');
    cy.get('#Registerpassword').type('cypress');
    cy.get('#RegisterconfirmPassword').type('cypres');
    cy.get('#RegisterFirstName').type('cypress');
    cy.get('#RegisterLastName').type('cypress');
    cy.get('#RegisterContact').type('123');
    cy.get('#RegisterEmail').type('ssds@erer');
    cy.get('#Register').click();
    cy.url().should('include', 'register');
    cy.get('#pwdMismatchErrorText').should('contain.text', 'Passwords not matching')
  })
});
describe('Enter register with invalid contact', function () {
  it('url should be register', function () {
    cy.visit('/register');
    cy.get('#RegisterUserName').type('cypress');
    cy.get('#Registerpassword').type('cypress');
    cy.get('#RegisterconfirmPassword').type('cypress');
    cy.get('#RegisterFirstName').type('cypress');
    cy.get('#RegisterLastName').type('cypress');
    cy.get('#RegisterContact').type('123');
    cy.get('#RegisterEmail').type('ssds@erer');
    cy.get('#Register').click();
    cy.url().should('include', 'register');
    cy.get('#contactErrorText').should('contain.text', 'Contact number is not valid')
  })
});
describe('Enter register with invalid email', function () {
  it('url should be register', function () {
    cy.visit('/register');
    cy.get('#RegisterUserName').type('cypress');
    cy.get('#Registerpassword').type('cypress');
    cy.get('#RegisterconfirmPassword').type('cypress');
    cy.get('#RegisterFirstName').type('cypress');
    cy.get('#RegisterLastName').type('cypress');
    cy.get('#RegisterContact').type('1234567891');
    cy.get('#RegisterEmail').type('ssds@erer');
    cy.get('#Register').click();
    cy.url().should('include', 'register');
    cy.get('#emailErrorText').should('contain.text', 'Email is not valid')
  })
});

describe('Enter valid register values', function () {
  it('url should be register', function () {
    cy.visit('/register');
    cy.get('#RegisterUserName').type('cypress');
    cy.get('#Registerpassword').type('cypress');
    cy.get('#RegisterconfirmPassword').type('cypress');
    cy.get('#RegisterFirstName').type('cypress');
    cy.get('#RegisterLastName').type('cypress');
    cy.get('#RegisterContact').type('1234567891');
    cy.get('#RegisterEmail').type('ssds@erer.com');
    cy.get('#Register').click();
    cy.url().should('include', 'login');

  })
});

describe('click on login without entering any value', function () {
  it('enter nothing - url should be login', function () {
    cy.visit('/');
    // cy.get('#UserName').type("sometext");
    // cy.get('#password').type("sometext");
    cy.get('#login').click();
    cy.url().should('include', 'login');
  })
});

describe('click on login without entering any value', function () {
  it('enter nothing - url should be login', function () {
    cy.visit('/');
    cy.get('#UserName').type("sometext");
    cy.get('#password').type("sometext");
    cy.get('#login').click();
    cy.url().should('include', 'login');
  })
});

describe('Enter proper creds', function () {
  it('enter proper creds - url should be dashboard', function () {
    cy.visit('/');
    cy.get('#UserName').type("cypress");
    cy.get('#password').type("cypress");
    cy.get('#login').click();
    cy.url().should('include', 'dashboard');
  })
});

describe('Go to readnow with proper creds', function () {
  it('enter proper creds - url should be readnow', function () {
    cy.visit('/');

    cy.get('#UserName').type("cypress");
    cy.get('#password').type("cypress");
    cy.get('#login').click();
    cy.get('#simplemenubutton').click();
    cy.wait(5000);
    cy.get('#readnow').click();
    cy.url().should('include', 'favourites');
  })
});

describe('Go to readnow with wrong creds', function () {
  it('enter invalid creds - url should be login', function () {
    localStorage.clear();
    cy.visit('/');
    // cy.get("#signout");
    // cy.visit('/');
    cy.get('#UserName').type("cypress");
    cy.get('#password').type("passwyuut");
    cy.get('#login').click();
    // cy.visit('/readnow');
    cy.url().should('include', 'login');
  })
});


describe('Go to dashboard with proper creds', function () {
  it('enter proper creds - url should be dashboard', function () {
    cy.visit('/');

    cy.get('#UserName').type("cypress");
    cy.get('#password').type("cypress");
    cy.get('#login').click();
    cy.get('#simplemenubutton').click();
    cy.wait(5000);
    cy.get('#dashboard').click();
    cy.url().should('include', 'dashboard');
  })
});


describe('Click filter button', function () {
  it('Filter poup should display', function () {
    cy.visit('/');

    cy.get('#UserName').type("cypress");
    cy.get('#password').type("cypress");
    cy.get('#login').click();
    cy.get('#simplemenubutton').click();
    cy.wait(5000);
    cy.get('#filter').click();
    let display = cy.get("#filterdialog");
    expect(display).to.not.equal(null);
  });
});

describe('Filter should search for apple', function () {
  it('Filter poup should close', function () {
    cy.visit('/');

    cy.get('#UserName').type("cypress");
    cy.get('#password').type("cypress");
    cy.get('#login').click();
    cy.get('#simplemenubutton').click();
    cy.get('#filter').click();
    // cy.get('#keywords').type("");  
    cy.get('#keywords').type("pple");
    cy.get('#save').click();
    cy.get("div.App").should('include.text', 'The best Apple Arcade games');
    // let display=cy.get("#filterdialog");
    // expect(display).to.equal(null);       
  });

  // .should('have.length', 4)
});
describe('Filter should search for apple - page2', function () {
  it('Filter poup should close', function () {
    cy.visit('/');

    cy.get('#UserName').type("cypress");
    cy.get('#password').type("cypress");
    cy.get('#login').click();
    cy.get('#simplemenubutton').click();
    cy.get('#filter').click();
    // cy.get('#keywords').type("");  
    cy.get('#keywords').type("pple");
    cy.get('#pagenumber').clear();
    cy.get("#pagenumber").type("2");
    cy.get('#save').click();
    cy.get("div.App").should('include.text', `How to Extend the Life of Your MacBook's Battery`);
    // let display=cy.get("#filterdialog");
    // expect(display).to.equal(null);       
  });
});

describe('Filter should search for country wise', function () {
  it('Filter poup should close', function () {
    cy.visit('/');

    cy.get('#UserName').type("cypress");
    cy.get('#password').type("cypress");
    cy.get('#login').click();
    cy.get('#simplemenubutton').click();
    cy.get('#filter').click();
    // cy.get('#keywords').type("");  
    cy.get('#EndPointFilter').select('Top');
    cy.get('#demo-dialog-select').select('ca');
    cy.get('#keywords').type("apple");
    cy.get('#pagenumber').clear();
    cy.get("#pagenumber").type("1");
    cy.get('#save').click();
    cy.get("div.App").should('include.text', `Apple, Google begin rolling out betas with exposure notification API - MobileSyrup`);
    // let display=cy.get("#filterdialog");
    // expect(display).to.equal(null);       
  });
});
// describe('Filter should search page size', function() {
//   it('Filter poup should close', function() {
//     cy.visit('/');

//     cy.get('#UserName').type("cypress");
//     cy.get('#password').type("cypress");
//     cy.get('#login').click();
//     cy.get('#filter').click();
//     // cy.get('#keywords').type("");  
//     cy.get('#keywords').type("pple");   
//     // cy.get('#pagenumber').clear();   
//     // cy.get("#pagenumber").type(2);
//     cy.get('#save').click();
//     cy.get('[role="slider"]')
//     .first()
//     .invoke('val', 25)
//     .trigger('change', { data: '25' })
//     cy.get("h3").should('have.length',55);
//     // let display=cy.get("#filterdialog");
//     // expect(display).to.equal(null);       
//   });
// });

describe('Add favourites', function () {
  it('Add favourites', function () {
    cy.visit('/');
    cy.get('#UserName').type("cypress");
    cy.get('#password').type("cypress");
    cy.get('#login').click();
    cy.wait(5000);
    cy.get(".favouriteBtn").first().click();
    cy.wait(5000);
    let display = cy.get("#reminderpopupmodal");
    expect(display).to.not.equal(null);
  })
});


describe('Add favourites cancel', function () {
  it('Add favourites cancel', function () {
    cy.visit('/');
    cy.get('#UserName').type("cypress");
    cy.get('#password').type("cypress");
    cy.get('#login').click();
    cy.wait(5000);
    cy.get(".favouriteBtn").first().click();
    cy.wait(5000);
    cy.get("#reminderCancel").click();
    cy.get("div.App").should('not.include.text', `Do you want to add reminder to`);
  })
});

describe('Add favourites No', function () {
  it('Add favourites No', function () {
    cy.visit('/');
    cy.get('#UserName').type("cypress");
    cy.get('#password').type("cypress");
    cy.get('#login').click();
    cy.wait(5000);
    cy.get(".favouriteBtn").first().click();
    cy.wait(5000);
    cy.get("#reminderNo").click();
    cy.wait(5000);
    cy.url().should('include', 'favourites');
    cy.get("div.App").should('include.text', `Use a Squeeze Bottle as a DIY Bidet`);
  })
});


describe('Delete News', function () {
  it('Delete News', function () {
    cy.visit('/');
    cy.get('#UserName').type("cypress");
    cy.get('#password').type("cypress");
    cy.get('#login').click();
    cy.wait(5000);
    cy.get('#simplemenubutton').click();
    cy.wait(5000);
    cy.get('#readnow').click();
    cy.wait(5000);
    cy.get('.deleteNews').first().click();
    cy.get("div.App").should('not.include.text', `Use a Squeeze Bottle as a DIY Bidet`);
  })
});

describe('Add favourites Yes', function () {
  it('Add favourites Yes', function () {
    cy.visit('/');
    cy.get('#UserName').type("cypress");
    cy.get('#password').type("cypress");
    cy.get('#login').click();
    cy.wait(5000);
    cy.get(".favouriteBtn").first().click();
    cy.wait(5000);
    cy.get("#reminderYes").click();
    cy.wait(2000);
    cy.get('.react-datetime-picker__calendar-button').first().click();
    cy.get('.react-calendar__tile--now').first().click();
    cy.get("#saveReminder").click();
    cy.wait(5000);
    cy.url().should('include', 'favourites');
    cy.get("div.App").should('include.text', `Use a Squeeze Bottle as a DIY Bidet`);
  })
});

describe('Update Reminder', function () {
  it('Update Reminder', function () {
    cy.visit('/');
    cy.get('#UserName').type("cypress");
    cy.get('#password').type("cypress");
    cy.get('#login').click();
    cy.wait(5000);
    cy.get('#simplemenubutton').click();
    cy.wait(5000);
    cy.get('#readnow').click();
    cy.wait(5000);    
    cy.get('.react-datetime-picker__calendar-button').first().click();
    cy.get('.react-calendar__tile--now').first().click();
    cy.get('.updateReminder').first().click();
    cy.wait(5000);
    cy.url().should('include', 'favourites');    
  })
});


describe('Delete Reminder', function () {
  it('Delete Reminder', function () {
    cy.visit('/');
    cy.get('#UserName').type("cypress");
    cy.get('#password').type("cypress");
    cy.get('#login').click();
    cy.wait(5000);
    cy.get('#simplemenubutton').click();
    cy.wait(5000);
    cy.get('#readnow').click();
    cy.wait(5000);    
    cy.get('.deleteReminder').first().click();
    cy.wait(5000);
    cy.url().should('include', 'favourites');
    cy.get("div.App").should('not.include.text', `deleteReminder`);
  })
});

describe('Delete News', function () {
  it('Delete News', function () {
    cy.visit('/');
    cy.get('#UserName').type("cypress");
    cy.get('#password').type("cypress");
    cy.get('#login').click();
    cy.wait(5000);
    cy.get('#simplemenubutton').click();
    cy.wait(5000);
    cy.get('#readnow').click();
    cy.wait(5000);
    cy.get('.deleteNews').first().click();
    cy.get("div.App").should('not.include.text', `Use a Squeeze Bottle as a DIY Bidet`);
  })
});
