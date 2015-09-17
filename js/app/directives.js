// Diretivas

//Diretiva do menu
angularApp.directive('navMenu', function ( ) {
    return {
        restrict: 'A',
        controller: 'navMenuController',
        templateUrl: './js/app/directive/navMenu.html'
    };
});

//Controle da diretiva navMenu
angularApp.controller("navMenuController", function ( $scope, $route ) {
    //Ativar o menu
    $(".button-collapse").sideNav();

    //método para ativar o menu da página atual
    $scope.isTabActive = function ( tabName ) {
        if ( tabName == $route.current.controller ) return "active";
    };

});