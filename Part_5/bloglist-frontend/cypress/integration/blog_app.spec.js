describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Login");
  });
});

describe("Login", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Dan",
      username: "dankur",
      password: "Phil4:13",
    };
    cy.request("POST", "http://localhost:3001/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("succeeds with correct credentials", function () {
    cy.contains("Login").click();
    cy.get("#username").type("dankur");
    cy.get("#password").type("Phil4:13");
    cy.get("#login-button").click();
    cy.contains("Dan Logged In");
  });

  it("fails with wrong credentials", function () {
    cy.contains("Login").click();
    cy.get("#username").type("dan");
    cy.get("#password").type("nba");
    cy.get("#login-button").click();

    cy.get(".error")
      .should("contain", "Wrong Username or Password")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");

    cy.get("html").should("not.contain", "dan logged in");
  });
});
