// Iniciar o modulo
var angularApp = angular.module( 'AulaAngular', [ 'ngRoute', 'angularModalService' ] );

 // Configuração das rotas
angularApp.config([ '$routeProvider', function( $routeProvider ) {

    $routeProvider.when( '/inicio' , { templateUrl: './js/app/view/inicio.html'  , controller: 'InicioController' })
                  .when( '/tarefas', { templateUrl: './js/app/view/tarefas.html' , controller: 'TarefasController'})
                  .when( '/notas'  , { templateUrl: './js/app/view/notas.html'   , controller: 'NotasController'  })
                  //rota principal
                  .otherwise({ redirectTo: '/inicio' });
  }

]);

// habilita CORS ( Carregar conteudo externo );
angularApp.config([ '$httpProvider', function( $httpProvider ) {
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common[ 'X-Requested-With' ];
    }
]);

// Inicialização
angularApp.run ( function( $rootScope ) {

    $rootScope.page = {
        title  : "Aula Angular",
        change : function( page, newTitle ){ page.title = newTitle + " | " + "Aula Angular"; }
    };

});