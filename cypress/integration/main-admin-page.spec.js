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

  it('Doens not contain not known violation for ', function() {
    // check if we on the correct page with correct state
    cy.get('h1').should('to.contain', 'Welcome to the bakerydemo Wagtail CMS');

    cy.window().then(function(win){
      const axe = require('axe-core');
      // console.log(win.document)
      return axe.run(win.document).then(function(results) {
        win.console.log('results', results);

        // expect().to.be.ok() is not working
        assert.isOk(results.passes.find(rule => rule.id === "aria-hidden-body"));
        assert.isOk(results.passes.find(rule => rule.id === "landmark-no-duplicate-banner"));
        assert.isOk(results.passes.find(rule => rule.id === "landmark-no-duplicate-contentinfo"));
        assert.isOk(results.passes.find(rule => rule.id === "region"));

        expect(results.violations.length).to.eqls(3);

        assert.isOk(results.violations.find(rule => rule.id === "landmark-one-main"));
      })
    })
  });
});
