angular.module('starter.controllers', [])

.controller('AccueilCtrl', function($scope, $http, $timeout, $ionicLoading) {
    //$scope.navTitle='<img class="title-image" style="height: 27px;margin-top: 8px;" src="img/logoiclubs.png" />';
    $scope.navTitle="Accueil";
    
    $scope.reload = function () { 
    $scope.date= new Date();
    $scope.hour = new Date().getHours();
    //swal(new Date().getHours(););
    //$scope.date= "00:00";
    $http.get("https://pocket-park.herokuapp.com/api/msg-pa", { params: { "key1": "value1", "key2": "value2" } })
    .success(function(data) {
        //alert(data.records[0].fields.etat);
        $scope.msg=data;
        //alert($scope.hour);
        //alert(data[0].schedule.openingTime)
    })
    .error(function(data) {
        swal("Erreur", data, "error");
    });
    $http.get("https://pocket-park.herokuapp.com/api/dlp-time", { params: { "key1": "value1", "key2": "value2" } })
    .success(function(data) {
        //alert(data.records[0].fields.etat);
        $scope.parkings=data;
        $scope.dlp_opn=new Date(data[0].openingTime).getHours();
        $scope.dlp_cld=new Date(data[0].closingTime).getHours();
        //alert($scope.hour);
        //alert(data[0].schedule.openingTime)
    })
    .error(function(data) {
        swal("Erreur", data, "error");
    });
    $http.get("https://pocket-park.herokuapp.com/api/wds-time", { params: { "key1": "value1", "key2": "value2" } })
    .success(function(data) {
        //alert(data.records[0].fields.etat);
        $scope.wds=data;
        //alert(data[0].schedule.openingTime)
    })
    .error(function(data) {
        swal("Erreur", data, "error");
    });
  $http.get("https://pocket-park.herokuapp.com/api/asterix-time", { params: { "key1": "value1", "key2": "value2" } })
    .success(function(data) {
        //alert(data.records[0].fields.etat);
        $scope.asterix=data;
        $scope.ast_opn=new Date(data[0].openingTime).getHours();
        $scope.ast_cld=new Date(data[0].closingTime).getHours();
        //alert(data[0].schedule.openingTime)
    })
    .error(function(data) {
        swal("Erreur", data, "error");
    });
  $http.get("https://pocket-park.herokuapp.com/api/efteling-time", { params: { "key1": "value1", "key2": "value2" } })
    .success(function(data) {
        //alert(data.records[0].fields.etat);
        $scope.efteling=data;
        $scope.eft_opn=new Date(data[0].openingTime).getHours();
        $scope.eft_cld=new Date(data[0].closingTime).getHours();
        //alert(data[0].schedule.openingTime)
    })
    .error(function(data) {
        swal("Erreur", data, "error");
    });
  $http.get("https://pocket-park.herokuapp.com/api/europapark-time", { params: { "key1": "value1", "key2": "value2" } })
    .success(function(data) {
        //alert(data.records[0].fields.etat);
        $scope.europapark=data;
        $scope.epp_opn=new Date(data[0].openingTime).getHours();
        $scope.epp_cld=new Date(data[0].closingTime).getHours();
        //alert(data[0].schedule.openingTime)
    })
    .error(function(data) {
        swal("Erreur", data, "error");
    });
    $timeout(function(){
      $scope.reload();
    },30000)
  };
  $scope.reload();
})

.controller('AgendaController', function($scope, $http, $timeout, $ionicLoading) {
    //$scope.navTitle='<img class="title-image" style="height: 27px;margin-top: 8px;" src="img/logoiclubs.png" />';
    $scope.input = {}; 
    $scope.navTitle="Disneyland Paris - Disneyland Park";
    $scope.park="dlp";
    $scope.icon="https://upload.wikimedia.org/wikipedia/fr/0/03/Parc_Disneyland_Paris_logo.png";
    $scope.date = new Date();
    $http.get("https://pocket-park.herokuapp.com/api/dlp-mk", { params: { "key1": "value1", "key2": "value2" } })
    .success(function(data) {
        //alert(data.records[0].fields.etat);
        $scope.parkings=data;
        console.log(data[0].id);
        //alert(data[0].schedule.openingTime)
    })
    .error(function(data) {
        swal("Erreur", data, "error");
    });
    $scope.doRefresh = function() {
    $scope.navTitle="Chargement...";
    console.log('Refreshing!');
    $timeout( function() {
      //simulate async response
     $http.get("https://pocket-park.herokuapp.com/api/dlp-mk", { params: { "key1": "value1", "key2": "value2" } })
    .success(function(data) {
        //alert(data.records[0].fields.etat);
        $scope.parkings=data;
        $scope.navTitle="Disneyland Paris - Disneyland Park";
    })
    .error(function(data) {
        swal("Erreur", data, "error");
    });

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
      
  };
})

.controller('AttractionDlpController', function($scope, $http, $timeout, $ionicLoading, $stateParams, $filter, $ionicPopup) {
    //$scope.navTitle='<img class="title-image" style="height: 27px;margin-top: 8px;" src="img/logoiclubs.png" />';
    var park = $stateParams.park;
    if(park=="dlp"){
      $scope.back="https://upload.wikimedia.org/wikipedia/en/8/88/Sleeping_Beauty_Castle%2C_Disneyland%2C_Paris.jpg";
      $scope.reload = function () {
      console.log("Chargement")
      var param1 = $stateParams.id;
      $http.get("https://pocket-park.herokuapp.com/api/dlp-mk")
      .success(function(data) {
          var param1 = $stateParams.id;
          var object_by_id = $filter('filter')(data, {id: param1 })[0];
          $scope.parkings=object_by_id;
          $scope.navTitle=object_by_id.name;
          //alert(data[0].schedule.openingTime)
      })
      .error(function(data) {
          swal("Erreur", data, "error");
      });
      $http.get("https://pocketpark.fr/api/getinfo.php",  {params: { id: param1 }})
      .success(function(data) {
          $scope.infos=data;
          //alert(data);
          //alert(data[0].schedule.openingTime)
      })
      .error(function(data) {
          swal("Erreur", data, "error");
      });
      $timeout(function(){
        $scope.reload();
      },3000)
    };
    $scope.reload();
  } if (park=="wds"){
      $scope.back="data:image/jpeg;base64,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";
      $scope.reload = function () {
      console.log("Chargement")
      $http.get("https://pocket-park.herokuapp.com/api/dlp-wds")
      .success(function(data) {
          var param1 = $stateParams.id;
          var object_by_id = $filter('filter')(data, {id: param1 })[0];
          $scope.parkings=object_by_id;
          $scope.navTitle=object_by_id.name;
          
          //alert(data[0].schedule.openingTime)
      })
      .error(function(data) {
          swal("Erreur", data, "error");
      });
      $timeout(function(){
        $scope.reload();
      },3000)
    };
    $scope.reload();
  } if (park=="asterix"){
      $scope.back="https://c1.staticflickr.com/9/8183/8400909492_9c15e235b8_b.jpg";
      $scope.reload = function () {
      console.log("Chargement")
      $http.get("https://pocket-park.herokuapp.com/api/asterix")
      .success(function(data) {
          var param1 = $stateParams.id;
          var object_by_id = $filter('filter')(data, {id: param1 })[0];
          $scope.parkings=object_by_id;
          $scope.navTitle=object_by_id.name;
         
          //alert(data[0].schedule.openingTime)
      })
      .error(function(data) {
          swal("Erreur", data, "error");
           $scope.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
              title: 'Don\'t eat that!',
              template: data
            });

            alertPopup.then(function(res) {
              console.log('Thank you for not eating my delicious ice cream cone');
            });
          };
      });
      $timeout(function(){
        $scope.reload();
      },3000)
    };
    $scope.reload();
  }if (park=="euroappark"){
    $scope.back="data:image/jpeg;base64,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";
      $scope.reload = function () {
      console.log("Chargement")
      $http.get("https://pocket-park.herokuapp.com/api/europapark")
      .success(function(data) {
          var param1 = $stateParams.id;
          var object_by_id = $filter('filter')(data, {id: param1 })[0];
          $scope.parkings=object_by_id;
          $scope.navTitle=object_by_id.name;
          
          //alert(data[0].schedule.openingTime)
      })
      .error(function(data) {
          swal("Erreur", data, "error");
      });
      $timeout(function(){
        $scope.reload();
      },3000)
    };
    $scope.reload();
  }if (park=="efteling"){
    $scope.back="data:image/jpeg;base64,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";
      $scope.reload = function () {
      console.log("Chargement")
      $http.get("https://pocket-park.herokuapp.com/api/efteling")
      .success(function(data) {
          var param1 = $stateParams.id;
          var object_by_id = $filter('filter')(data, {id: param1 })[0];
          $scope.parkings=object_by_id;
          $scope.navTitle=object_by_id.name;
          
          //alert(data[0].schedule.openingTime)
      })
      .error(function(data) {
          swal("Erreur", data, "error");
      });
      $timeout(function(){
        $scope.reload();
      },3000)
    };
    $scope.reload();
  }
})

.controller('WdsController', function($scope, $http, $timeout) {
    //$scope.navTitle='<img class="title-image" style="height: 27px;margin-top: 8px;" src="img/logoiclubs.png" />';
    $scope.input = {}; 
    $scope.navTitle="Disneyland Paris - Walt Disney Studios";
    $scope.park="wds";
    $scope.icon="https://upload.wikimedia.org/wikipedia/fr/2/26/Parc_Walt_Disney_Studios_logo.png";
    $http.get("https://pocket-park.herokuapp.com/api/dlp-wds", { params: { "key1": "value1", "key2": "value2" } })
    .success(function(data) {
        //alert(data.records[0].fields.etat);
        $scope.parkings=data;
        //alert(data[0].schedule.openingTime)
    })
    .error(function(data) {
        swal("Erreur", data, "error");
    });
    $scope.doRefresh = function() {
    $scope.navTitle="Chargement...";
    console.log('Refreshing!');
    $timeout( function() {
      //simulate async response
     $http.get("https://pocket-park.herokuapp.com/api/dlp-wds", { params: { "key1": "value1", "key2": "value2" } })
    .success(function(data) {
        //alert(data.records[0].fields.etat);
        $scope.parkings=data;
        $scope.navTitle="Disneyland Paris - Walt Disney Studios";
    })
    .error(function(data) {
        swal("Erreur", data, "error");
    });

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
      
  };
})

.controller('EuropaparkController', function($scope, $http, $timeout) {
    //$scope.navTitle='<img class="title-image" style="height: 27px;margin-top: 8px;" src="img/logoiclubs.png" />';
    $scope.input = {}; 
    $scope.navTitle="EuropaPark";
    $scope.park="europapark";
    $scope.icon="https://s3-eu-west-1.amazonaws.com/colruytgroup.live/venues/square/europapark.png";
    $http.get("https://pocket-park.herokuapp.com/api/europapark", { params: { "key1": "value1", "key2": "value2" } })
    .success(function(data) {
        //alert(data.records[0].fields.etat);
        $scope.parkings=data;
        //alert(data[0].schedule.openingTime)
    })
    .error(function(data) {
        swal("Erreur", data, "error");
    });
    $scope.doRefresh = function() {
    $scope.navTitle="Chargement...";
    console.log('Refreshing!');
    $timeout( function() {
      //simulate async response
     $http.get("https://pocket-park.herokuapp.com/api/europapark", { params: { "key1": "value1", "key2": "value2" } })
    .success(function(data) {
        //alert(data.records[0].fields.etat);
        $scope.parkings=data;
        $scope.navTitle="EuropaPark";
    })
    .error(function(data) {
        swal("Erreur", data, "error");
    });

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
      
  };
})

//ASTERIX
.controller('AsterixCtrl', function($scope, $http, $timeout) {
    //$scope.navTitle='<img class="title-image" style="height: 27px;margin-top: 8px;" src="img/logoiclubs.png" />';
    $scope.input = {}; 
    $scope.navTitle="Parc Asterix";
    $scope.park="asterix";
    $scope.icon="http://guide-o-parc.com/site/galeries/parc_22.gif";
    $http.get("https://pocket-park.herokuapp.com/api/asterix", { params: { "key1": "value1", "key2": "value2" } })
    .success(function(data) {
        //alert(data.records[0].fields.etat);
        $scope.parkings=data;
        //alert(data[0].schedule.openingTime)
    })
    .error(function(data) {
        swal("Erreur", data, "error");
    });
    $scope.doRefresh = function() {
    $scope.navTitle="Chargement...";
    console.log('Refreshing!');
    $timeout( function() {
      //simulate async response
     $http.get("https://pocket-park.herokuapp.com/api/asterix", { params: { "key1": "value1", "key2": "value2" } })
    .success(function(data) {
        //alert(data.records[0].fields.etat);
        $scope.parkings=data;
        $scope.navTitle="Parc Asterix";
    })
    .error(function(data) {
        swal("Erreur", data, "error");
    });

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
      
  };
})

.controller('EftelingCtrl', function($scope, $http, $timeout) {
    //$scope.navTitle='<img class="title-image" style="height: 27px;margin-top: 8px;" src="img/logoiclubs.png" />';
    $scope.input = {}; 
    $scope.navTitle="Efteling";
    $scope.park="efteling";
    $scope.icon="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQHEhUQBxMVEhEXGRYXFxcYFR0XFxIVGxoYFxcSHx8kHyssGBooHhcWITEhJSkrLi4uGB8/ODMwNyguOisBCgoKDg0OGxAQGzAlICUuLS0tLTAtLS0tLS8tLS0tLS0wLS0tLS0tLS0tLS0tLS0tLy0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcBBAUDAgj/xABCEAACAQMDAgQDBgQDAw0AAAABAgADBBEFEiEGMQcTQVEiYXEUMkKBkbFSYqHBFVOyIzSCFjNDVGNyc5KTlNLw8f/EABoBAQACAwEAAAAAAAAAAAAAAAACAwEEBQb/xAAyEQEAAgIBAwMBBgUEAwAAAAAAAQIDEQQSITEFE0EyIlFhcaGxFCOBkeEVUsHRMzRC/9oADAMBAAIRAxEAPwC8YCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcvUNUGn1VWuCVcfDtGW3AgbceoORj8/yoyZei3f5TrSbR2dJG3AEjHy9vlL0Hlb3Irlgn4WKn6gA/wB5Ct4t4ZmNPYybDhX+sEOLZFKVGIG4kbQp/GvufbIHM1L59W6Nd1tce69TuIMdptKn1MhAQEBAQEBAQEBAQEBAQEBAQEBAQEBA1bmySvk1VBJxzj4uDkc+mDyJCa1nyzFpjw+crd7qblgV7gMVOD2bII4P9iPQzM16o1J3ju0NI0RbJnYl+WO342Hw8EZwfiOSe8oxYIpaVl8k2b6XwbzPNDIE7swwCMAkj5cy6ttzMK5h8HT6dwTUuEDMwH3hkqAOFHt6n6zE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";
    $http.get("https://pocket-park.herokuapp.com/api/efteling", { params: { "key1": "value1", "key2": "value2" } })
    .success(function(data) {
        //alert(data.records[0].fields.etat);
        $scope.parkings=data;
        //alert(data[0].schedule.openingTime)
    })
    .error(function(data) {
        swal("Erreur", data, "error");
    });
    $scope.doRefresh = function() {
    $scope.navTitle="Chargement...";
    console.log('Refreshing!');
    $timeout( function() {
      //simulate async response
     $http.get("https://pocket-park.herokuapp.com/api/efteling", { params: { "key1": "value1", "key2": "value2" } })
    .success(function(data) {
        //alert(data.records[0].fields.etat);
        $scope.parkings=data;
        $scope.navTitle="Efteling";
    })
    .error(function(data) {
        swal("Erreur", data, "error");
    });

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
      
  };
})

.controller('VlilleController', function($scope, $http, $timeout) {
    //$scope.navTitle='<img class="title-image" style="height: 27px;margin-top: 8px;" src="img/logoiclubs.png" />';
    $scope.navTitle="Pocket'Lille";
    $http.get("https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=vlille-realtime&rows=10000&sort=nbvelosdispo", { params: { "key1": "value1", "key2": "value2" } })
    .success(function(data) {
        //alert(data.records[0].fields.etat);
        $scope.vlilles=data.records;
    })
    .error(function(data) {
        swal("Erreur", data, "error");
    });
    $scope.doRefresh = function() {
    
    console.log('Refreshing!');
    $timeout( function() {
      //simulate async response
      $http.get("https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=vlille-realtime&rows=10000&sort=nbvelosdispo", { params: { "key1": "value1", "key2": "value2" } })
    .success(function(data) {
        //alert(data.records[0].fields.etat);
        $scope.vlilles=data.records;
    })
    .error(function(data) {
        swal("Erreur", data, "error");
    });

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
      
  };
})

.controller('FotosController', function($scope, Locales,$ionicFilterBar) {
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.locales = Locales.all();
        $scope.remove = function(local) {
            Locales.remove(local);
        };

        $scope.favorito = function(local){

        };

        $scope.showFilterBar = function () {
            filterBarInstance = $ionicFilterBar.show({
                items: $scope.locales,
                update: function (filteredItems, filterText) {
                    $scope.locales = filteredItems;
                    if (filterText) {
                        console.log(filterText);
                    }
                }
            });
        };

})

.controller('AlbunesController', function($scope, $stateParams, Locales) {
        var local_id = $stateParams.fotosId;
        $scope.local = Locales.get($stateParams.fotosId);

        $scope.items = [
            {
                src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_000.jpg',
                sub: ''
            },
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_001.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_002.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_003.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_004.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_005.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_006.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_007.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_008.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_009.jpg'},

            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_010.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_011.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_012.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_013.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_014.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_015.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_016.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_017.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_018.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_019.jpg'},

            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_020.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_021.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_022.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_023.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_024.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_025.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_026.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_027.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_028.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_029.jpg'},

            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_030.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_031.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_032.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_033.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_034.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_035.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_036.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_037.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_038.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_039.jpg'},

            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_040.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_041.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_042.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_043.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_044.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_045.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_046.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_047.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_048.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_049.jpg'},

            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_050.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_051.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_052.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_053.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_054.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_055.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_056.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_057.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_058.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_059.jpg'},

            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_060.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_061.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_062.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_063.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_064.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_065.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_066.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_067.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_068.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_069.jpg'},

            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_070.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_071.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_072.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_073.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_074.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_075.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_076.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_077.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_078.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_079.jpg'},

            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_080.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_081.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_082.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_083.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_084.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_085.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_086.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_087.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_088.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_089.jpg'},

            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_090.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_091.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_092.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_093.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_094.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_095.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_096.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_097.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_098.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_099.jpg'},
        ]


})

.controller('FavoritosController', function($scope) {})

.controller('AjustesController', function($scope) {
        $scope.settings = {
            enviarNotificaciones: true
        };
});
