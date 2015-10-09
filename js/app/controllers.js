//Controllers da Aplicação

//Controle da rota inicio
angularApp.controller( 'InicioController', function( $scope, $rootScope ) {

    $('.parallax').parallax();
    $rootScope.page.change( $rootScope.page, "Inicio" );

});

//Controle da rota tarefas
angularApp.controller( 'TarefasController', function( $scope, $rootScope, ModalService, TarefasService ) {

    $rootScope.page.change( $rootScope.page, "Tarefas" );

    $scope.busca = "";
    $scope.indexTemp = null;

    $scope.listaTarefas = TarefasService.getListaTarefasLocal();

    var adicionarTarefa = function( tarefa ){
        if( angular.isDefined( tarefa.nome ) )
            TarefasService.postNovaTarefa( $scope.listaTarefas, tarefa );
        $scope.salvarTarefas();
    };

    var atualizarTarefa = function( tarefa ){
        if( angular.isDefined( tarefa.nome ) )
            TarefasService.postAtualizarTarefa( $scope.listaTarefas, tarefa );
        $scope.salvarTarefas();
    };

    $scope.apagarTarefa = function( tarefa ){
        TarefasService.postApagarTarefa( $scope.listaTarefas, tarefa );
        $scope.salvarTarefas();
    };

    $scope.adicionarItem = function( tarefa ){
        var item  = TarefasService.getItem();
        item.nome = tarefa.itemNovo;
        item.data = new Date().getTime();

        if( angular.isDefined( item.nome ) )
            TarefasService.postNovoItem( tarefa, item );

        $scope.salvarTarefas();
    };

    $scope.apagarItem = function( tarefa, item ){
        TarefasService.apagarItem( tarefa, item );
        $scope.salvarTarefas();
    };

    $scope.obterModal = function( tarefa ){

        var dados  = angular.isUndefined( tarefa ) ? TarefasService.getTarefa() : tarefa;
        dados.acao = angular.isUndefined( tarefa ) ? "Adicionar" : "Atualizar";

        ModalService.showModal({

            templateUrl : 'formTarefa',
            controller  : "TarefasModalController",
            inputs      : { tarefa : dados }

        }).then( function( modal ) {
            modal.element = $('.modal');

            modal.element.openModal({ dismissible: false });
            modal.close.then( function( tarefa ) {

                if( tarefa.submit && tarefa.acao == "Adicionar" )
                    adicionarTarefa( tarefa );

                else if( tarefa.submit && tarefa.acao == "Atualizar" )
                    atualizarTarefa( tarefa );

                modal.element.closeModal();
            });

        });
    };

    $scope.salvarTarefas = function( ){
        TarefasService.postListaTarefasLocal( $scope.listaTarefas );
    };

    $scope.foiConcluida = function( item ){
        if( item.concluido ) return 'tarefaConcluida';
    };

    $scope.limparBusca  = function(){
        $scope.busca = '';
    };

});

//Controle da modal tarefas
angularApp.controller( 'TarefasModalController', function( $scope, tarefa, close ) {
    var tempTarefa = angular.copy( tarefa );
    $scope.tarefa  = tarefa;

    $scope.close = function( isSubmit ) {
        $scope.tarefa.nome = $scope.tarefa.nome == "" ? tempTarefa.nome : $scope.tarefa.nome ;
        $scope.tarefa.submit = angular.isUndefined( isSubmit ) ? false : true ;
        close( $scope.tarefa, 200 );
    };
});

//Controle da rota notas
angularApp.controller( 'NotasController', function( $scope, $rootScope, ModalService, NotasService ) {

    $rootScope.page.change( $rootScope.page, "Notas" );

    $scope.busca = "";
    $scope.indexTemp = null;

    $scope.listaNota = NotasService.getListaNotaLocal();

    var adicionarNota = function( nota ){
        if( angular.isDefined( nota.nome ) && angular.isDefined( nota.conteudo ) )
            NotasService.postNovaNota( $scope.listaNota, nota );
        $scope.salvarNota();
    };

    var atualizarNota = function( nota ){
        if( angular.isDefined( nota.nome ) && angular.isDefined( nota.conteudo ) )
            NotasService.postAtualizarNota( $scope.listaNota, nota );
        $scope.salvarNota();
    };

    $scope.apagarNota = function( nota ){
        NotasService.postApagarNota( $scope.listaNota, nota );
        $scope.salvarNota();
    };

    $scope.obterModal = function( nota ){

        var dados  = angular.isUndefined( nota ) ? NotasService.getNota() : nota;
        dados.acao = angular.isUndefined( nota ) ? "Adicionar" : "Atualizar";

        ModalService.showModal({

            templateUrl : 'formNotas',
            controller  : "NotasModalController",
            inputs      : { nota : dados }

        }).then( function( modal ) {
            modal.element = $('.modal');

            modal.element.openModal({ dismissible: false });
            modal.close.then( function( nota ) {

                if( nota.submit && nota.acao == "Adicionar" )
                    adicionarNota( nota );

                else if( nota.submit && nota.acao == "Atualizar" )
                    atualizarNota( nota );

                modal.element.closeModal();
            });

        });
    };

    $scope.salvarNota = function( ){
        NotasService.postListaNotaLocal( $scope.listaNota );
    };

    $scope.limparBusca  = function(){
        $scope.busca = '';
    };

});

//Controle da modal notas
angularApp.controller( 'NotasModalController', function( $scope, nota, close ) {
    var tempNota = angular.copy( nota );
    $scope.nota  = nota;

    $scope.close = function( isSubmit ) {
        $scope.nota.nome = $scope.nota.nome == "" ? tempNota.nome : $scope.nota.nome ;
        $scope.nota.conteudo = $scope.nota.conteudo == "" ? tempNota.conteudo : $scope.nota.conteudo ;
        $scope.nota.submit = angular.isUndefined( isSubmit ) ? false : true ;
        close( $scope.nota, 200 );
    };
});