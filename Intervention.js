var app =angular.module("TpInterventions",['ngRoute','ui.bootstrap']);
app.config(function($routeProvider,$locationProvider){
    $routeProvider
        .when('/',{templateUrl:'template/list.html',controller:'InterventCtrl'})
        .when('/intervention/',{templateUrl:'template/intervention.html'})
        .when('/intervention/:id',{templateUrl:'template/intervention.html',controller:'InterventCtrl'})    
        .otherwise({redirectTo:'/'});
})



app.service('PostService',function(){
    alert("on charge")
    // On recupere les données
    that=this
    that.interventions = [
        {
        "id": "1",    
        "libelle": "Pb 1",
        "statut": "Terminé",
        "nameStaff": "Althea Ochoa",
        "address": "317 Nassau Street, Greenbackville, Palau, 6128",
        "description": "Aliqua nostrud fugiat aute pariatur qui. Commodo aliqua esse dolor ex occaecat nulla sint culpa. Voluptate non dolor magna veniam pariatur laboris commodo nisi in amet eu adipisicing esse. Ipsum id cupidatat nisi et aute enim amet amet fugiat.\r\n",
        "dateIntervention": "2020-09-27"
        },
        {
        "id": "2",    
        "libelle": "Pb 2",
        "statut": "Terminé",
        "nameStaff": "Edith Bush",
        "address": "331 Melrose Street, Jessie, Minnesota, 6730",
        "description": "Mollit et cupidatat quis enim enim labore ipsum laboris. Incididunt ullamco irure fugiat et irure Lorem qui in irure et fugiat eu laborum in. Nostrud non nostrud dolore et veniam nulla commodo. Laboris ut do elit tempor consequat occaecat est reprehenderit ullamco. Exercitation quis duis elit enim incididunt excepteur laborum officia officia.\r\n",
        "dateIntervention": "2018-06-03"
        },
        {
        "id": "3",
        "libelle": "Pb 3",
        "statut": "Terminé",
        "nameStaff": "Hebert Bowen",
        "address": "621 Turner Place, Belva, Delaware, 7552",
        "description": "Ipsum id ullamco irure in ipsum mollit excepteur veniam culpa magna veniam consectetur reprehenderit consequat. Nulla pariatur aliqua elit excepteur enim officia cupidatat. Et dolore adipisicing sunt sit deserunt anim dolor exercitation excepteur deserunt voluptate amet pariatur.\r\n",
        "dateIntervention": "2015-12-12"
        },
        {
        "id": "4",
        "libelle": "Pb 4",
        "statut": "Terminé",
        "nameStaff": "Jewel Foreman",
        "address": "706 Suydam Place, Libertytown, New Jersey, 727",
        "description": "Lorem tempor ad sit aliqua in quis in quis ad. Labore eiusmod velit reprehenderit qui exercitation sint nostrud fugiat minim sint et. Nisi incididunt occaecat magna magna. Fugiat non consectetur proident duis consectetur sunt adipisicing consequat.\r\n",
        "dateIntervention": "2014-09-21"
        },
        {
        "id": "5",
        "libelle": "Pb 5",
        "statut": "Terminé",
        "nameStaff": "Richardson Bond",
        "address": "209 Hampton Avenue, Yogaville, Missouri, 6379",
        "description": "Aliqua ipsum exercitation qui commodo sint proident veniam fugiat magna labore eu. Excepteur ad anim sunt sint pariatur sunt consectetur anim duis eiusmod tempor fugiat. Aliquip veniam magna adipisicing ut duis officia magna. Nulla excepteur anim cillum sunt magna anim dolore eiusmod aute magna nostrud non ex. Anim quis nulla consequat id commodo voluptate cillum ex. Do voluptate cupidatat non velit mollit deserunt magna excepteur pariatur consectetur ex cillum exercitation amet. Nulla excepteur cupidatat aliqua id nulla elit excepteur quis et.\r\n",
        "dateIntervention": "2014-04-12"
        }
    ];


    // On renvoie une intervention précice
    that.getPost=function(id){
       
        var intervention={};
        angular.forEach(that.interventions, function(value,key){
            if (value.id == id){
                intervention=value
            }
            
        });
        
        return intervention;
    };

    // On renvoie toutes les données
    that.getPosts=function(){
        return that.interventions;
    }

    
    
    
})



// Controller listes des interventions
app.controller('InterventCtrl',function($scope,PostService,$modal,$routeParams){    
    // Chargement des données dans le scope
    $scope.interventions=PostService.getPosts();
   
    
    $scope.clickMe = function(p) {
        $scope.selected = p;       
    }
    
    $scope.clickMe = function(p) {
        
        $modal.open({
            templateUrl: 'template/intervention.html',
            backdrop: true,
            windowClass: 'modal',
            controller: function($scope, $modalInstance, $log) {
              $scope.selected = p;
              var interv = PostService.getPost(p.id);  
              $scope.p = interv   
              
              console.log($scope.p.id)
              if ($scope.p.id==undefined){
                $scope.p.text = "Nouvelle Intervention "
               } else {
                    $scope.p.text = "Détail Intervention : n° "+$scope.p.id+" ("+$scope.p.statut+")"
                }   
                

              $scope.submit = function() {
                
                    //check field libelle
                    if (!$scope.p.libelle) { 
                        alert("Le titre de l'intervention est obligatoire")
                        return;
                    }    
                    //check field date
                    
                    if ($scope.p.dateIntervention) { 
                        var regex = /^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$/;
                        var checkDate = regex.test($scope.p.dateIntervention);
                            
                        if (!checkDate) {
                            alert("La date n'est pas au bon format JJ-MM-AAAA")
                            return;
                        }
                    }
                    // Gestion du  Statut
                              
                    if ($scope.p.id!='' && $scope.p.libelle !='' && $scope.p.nameStaff!='' && $scope.p.address!='' && $scope.p.description!='' && $scope.p.dateIntervention!='' ) {             
                       
                        stateStatus="Validé"
                         var today = (new Date().toISOString().slice(0, 10))
                         
                        if ($scope.p.dateIntervention<today) {
                            stateStatus="Terminé"
                        }
                    }else{
                        stateStatus="Brouillon"  
                    }
                    
                    // Ajout de l'intervention
                    if ( $scope.interv.id == undefined) {            
                        $scope.interventions.push({id: 99,libelle :$scope.p.libelle,statut: stateStatus,nameStaff :$scope.p.nameStaff,address :$scope.p.address,description :$scope.p.description,dateIntervention :$scope.p.dateIntervention});
                    } else {
                        // Modification de l'intervention
                        angular.forEach(that.interventions, function(value,key){
                            
                            if (value.id == $scope.interv.id){
                                $scope.interventions[key].libelle = $scope.p.libelle
                                $scope.interventions[key].statut = stateStatus
                                $scope.interventions[key].nameStaff = $scope.p.nameStaff
                                $scope.interventions[key].address = $scope.p.address
                                $scope.interventions[key].description = $scope.p.description
                                $scope.interventions[key].dateIntervention = $scope.p.dateIntervention  
                                alert("Modification effectuée")                                     
                            }            
                        });
                
                    }            
                   
                
               
                $modalInstance.dismiss('quit');
                
                alert("oooooo")  
              }
              
              $scope.quit = function() {
                $modalInstance.dismiss('quit');
                
                 
              };

              // Suppression de l'intervention
            $scope.remove = function() {   
                alert($scope.p.id)   
                angular.forEach(that.interventions, function(value,key){
                if (value.id == $scope.p.id){
                      $scope.interventions.splice(key, 1);  
                      
                    alert("Suppresion effectuée")    
                               
                }            
            });
      }



            },
            resolve: {
              user: function() {
                return $scope.selected;
              }
            }
          });
          
        };
        $scope.isSelected = function(p) {
            return $scope.selected === p;
          }
    
})

