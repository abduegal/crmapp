var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (file.indexOf('spec') !== -1) {
      tests.push(file);
    }
  }
}

requirejs({
    paths : {
      angular : '../components/angular/angular',
      angularresource : '../components/angular-resource/angular-resource',
      angularMocks : '../components/angular-mocks/angular-mocks',
      json : '../components/json3/lib/json3',
      lodash: '../components/lodash/lodash',
      spinjs: '../components/spinjs/spin',
      jquery: '../components/jquery/jquery',
      bootstrap: '../components/jquery/bootstrap'
    },
    baseUrl : 'base/app/scripts',
    shim : {
      'angular' : {
        'exports' : 'angular'
      }
    },
    priority : [ "angular" ],

    // ask Require.js to load these files (all our tests)
    deps: tests,
    callback: window.__karma__.start

});