describe('Wagtail Accesibility test', function() {

  it('test wagtail.io to compate with pa11ly results', () => {
    cy.visit('https://wagtail.io/');

    cy.window().then(function(win){
      const axe = require('axe-core');
      // console.log(win.document)
      // console.log('axe.source', axe.source);

      win.eval(axe.source);

      return win.axe.run().then(function(results) {
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
  })
});
