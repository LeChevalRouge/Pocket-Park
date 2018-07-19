/* Autor: Luis Bahamonde */

angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services', 'jett.ionic.filter.bar', 'ion-gallery', 'jett.ionic.scroll.sista', 'ngIOS9UIWebViewPatch', 'ion-affix'])
.run(function(){
    Pro.init('EFB48B43', {
        appVersion: '2.0.1'
    });
})

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {

    setTimeout(function () {
        navigator.splashscreen.hide();
    }, 2000);

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
        //StatusBar.styleDefault();
        StatusBar.styleLightContent();
    }
    var notificationOpenedCallback = function(jsonData) {
      alert("Notification opened:\n" + JSON.stringify(jsonData));
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    // TODO: Update with your OneSignal AppId before running.
    window.plugins.OneSignal
      .startInit("f42e6ef0-97e4-4460-82a2-a9b4f903377d")
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();

  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicFilterBarConfigProvider, $ionicConfigProvider) {

        $ionicFilterBarConfigProvider.theme('light');
        $ionicFilterBarConfigProvider.clear('ion-close');
        $ionicFilterBarConfigProvider.search('ion-search');
        $ionicFilterBarConfigProvider.backdrop(true);
        $ionicFilterBarConfigProvider.transition('vertical');
        $ionicFilterBarConfigProvider.placeholder('Search...');

        $ionicConfigProvider.backButton.previousTitleText(false);
        $ionicConfigProvider.backButton.text('');



    $stateProvider

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })
    .state('tab.wk', {
    url: '/welcome',
    views: {
     "menuContent": {
        templateUrl: 'templates/wk.html',
        controller: 'AccueilCtrl'
     }
    }
  })
  .state('tab.agenda', {
    url: '/agenda',
    views: {
     'menuContent':{
        templateUrl: 'templates/tab-agenda.html',
        controller: 'AgendaController'
    }
    }
  })
  .state('tab.attraction-dlp', {
    url: '/attraction/:park/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/attraction.html',
        controller: 'AttractionDlpController'
      }
    }
  })
  .state('tab.vlille', {
    url: '/vlille',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-agenda.html',
        controller: 'WdsController'
      }
    }
  })
  .state('tab.wc', {
    url: '/wc',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-agenda.html',
        controller: 'AsterixCtrl'
      }
    }
  })
  .state('tab.efteling', {
    url: '/efteling',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-agenda.html',
        controller: 'EftelingCtrl'
      }
    }
  })
   .state('tab.europapark', {
    url: '/europapark',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-agenda.html',
        controller: 'EuropaparkController'
      }
    }
  })
  .state('tab.fotos', {
      url: '/fotos',
      views: {
        'tab-fotos': {
          templateUrl: 'templates/tab-fotos.html',
          controller: 'FotosController'
        }
      }
    })
    .state('tab.fotos-detail', {
      url: '/fotos/:fotosId',
      views: {
        'tab-fotos': {
          templateUrl: 'templates/fotos-detail.html',
          controller: 'AlbunesController'
        }
      }
    })
    .state('tab.favoritos', {
        url: '/favoritos',
        views: {
            'tab-favoritos': {
                templateUrl: 'templates/tab-love.html',
                controller: 'FavoritosController'
            }
        }
    })
  .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AjustesController'
            }
        }
  });

  /*Si ninguno de los siguientes estados esta activo reenviar a /tab/agenda */
  $urlRouterProvider.otherwise('/tab/welcome');

});
