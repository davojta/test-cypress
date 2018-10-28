const pa11y = require('pa11y');

pa11y('https://wagtail.io/').then((results) => {
  console.log('results', results);
});
