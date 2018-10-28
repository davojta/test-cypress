describe('Wagtail Accesibility test', function() {
  beforeEach(() => {

    cy.visit('http://127.0.0.1:8000/');
    cy.clearCookie('sessionid');

    cy.visit('http://127.0.0.1:8000/admin');

    cy.get('#id_username')
      .clear()
      .type('admin');

    cy.get('#id_password')
      .type('changeme');

    cy.get('button').contains('Sign in').click();
  });

  it('Doens not contain not known violation from axe for first page', function() {
    // check if we on the correct page with correct state
    cy.get('h1').should('to.contain', 'Welcome to the bakerydemo Wagtail CMS');

    cy.window().then(function(win){
      const axe = require('axe-core');
      // console.log(win.document)

      win.eval(axe.source);

      return win.axe.run().then(function(results) {
        win.console.log('results', results);

        // expect().to.be.ok() is not working
        assert.isOk(results.passes.find(rule => rule.id === "aria-hidden-body"));
        assert.isOk(results.passes.find(rule => rule.id === "landmark-no-duplicate-banner"));
        assert.isOk(results.passes.find(rule => rule.id === "landmark-no-duplicate-contentinfo"));
        // assert.isOk(results.passes.find(rule => rule.id === "region"));

        expect(results.violations.length).to.eqls(4);

        assert.isOk(results.violations.find(rule => rule.id === "landmark-one-main"));
      })
    })
  });

  it('Doens not contain not known violation from axe for pages page', function() {
    // check if we on the correct page with correct state
    cy.get('h1').should('to.contain', 'Welcome to the bakerydemo Wagtail CMS');

    cy.get('.stats ').contains('Pages').click();

    cy.window().then(function(win){
      const axe = require('axe-core');

      win.eval(axe.source);
      // console.log(win.document)
      return win.axe.run(win.document).then(function(results) {
        win.console.log('results', results);
        console.log('results', results);

        // expect().to.be.ok() is not working
        assert.isOk(results.passes.find(rule => rule.id === "aria-hidden-body"));
        assert.isOk(results.passes.find(rule => rule.id === "landmark-no-duplicate-banner"));
        assert.isOk(results.passes.find(rule => rule.id === "landmark-no-duplicate-contentinfo"));
        // assert.isOk(results.passes.find(rule => rule.id === "region"));

        expect(results.violations.length).to.eqls(4);

        assert.isOk(results.violations.find(rule => rule.id === "landmark-one-main"));
      })
    })
  });
});
