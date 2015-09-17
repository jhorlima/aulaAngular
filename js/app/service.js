//Model

//Model da rota Inicio
angularApp.service( 'InicioService', function( $http ) {

});

//Model da rota Tarefas
angularApp.service( 'TarefasService', function( $http ) {

    this.getTarefa = function(){
        return { nome: undefined, data: undefined, itens: [] };
    };

    this.getItem = function(){
        return { nome: undefined, data: undefined, concluido: false };
    };

    this.getListaTarefas = function( success, error ) {
        $http.get( './dados/tarefas.json' )
             .success( success )
             .error( error );
    };

    this.getListaTarefasLocal = function(){
        if( localStorage.getItem('tarefas') )
           return JSON.parse( localStorage.getItem('tarefas') );
        return [];
    };

    this.postListaTarefasLocal = function( listaTarefas ){
        localStorage.setItem( 'tarefas', JSON.stringify( listaTarefas ) );
    };

    this.postNovaTarefa = function( listaTarefas, tarefa ){

        tarefa.data = new Date().getTime();
        listaTarefas.push( tarefa );
        delete tarefa.acao;
        delete tarefa.submit;
        Materialize.toast('Uma nova tarefa foi adicionada!', 4000);

    };

    this.postAtualizarTarefa = function( listaTarefas, tarefa ){

        tarefa.data = new Date().getTime();
        delete tarefa.acao;
        delete tarefa.submit;
        Materialize.toast('A Tarefa foi atualizada!', 4000);

    };

    this.postApagarTarefa = function( listaTarefas, tarefa ){

        listaTarefas.splice( listaTarefas.indexOf( tarefa ), 1);
        Materialize.toast('A Tarefa foi excluida!', 4000);
    };

    this.postNovoItem = function( tarefa, item ){
        tarefa.itens.push( item );
        delete tarefa.itemNovo;
        Materialize.toast('Um novo item foi adicionado!', 4000);
    };

    this.apagarItem = function( tarefa, item ){
        tarefa.itens.splice( tarefa.itens.indexOf( item ), 1);
        Materialize.toast('Um item foi excluido!', 4000);
    };

});

//Model da rota Notas
angularApp.service( 'NotasService', function( $http ) {

    this.getNota = function(){
        return { nome: undefined, data: undefined, conteudo: undefined };
    };

    this.getListaNotas = function( success, error ) {
        $http.get( './dados/notas.json' )
            .success( success )
            .error( error );
    };

    this.getListaNotaLocal = function(){
        if( localStorage.getItem('notas') )
            return JSON.parse( localStorage.getItem('notas') );
        return [];
    };

    this.postListaNotaLocal = function( listaNotas ){
        localStorage.setItem( 'notas', JSON.stringify( listaNotas ) );
    };

    this.postNovaNota = function( listaNotas, nota ){

        nota.data = new Date().getTime();
        listaNotas.push( nota );
        delete nota.acao;
        delete nota.submit;
        Materialize.toast('Uma nova nota foi adicionada!', 4000);

    };

    this.postAtualizarNota = function( listaNotas, nota ){

        nota.data = new Date().getTime();
        delete nota.acao;
        delete nota.submit;
        Materialize.toast('A Nota foi atualizada!', 4000);

    };

    this.postApagarNota = function( listaNotas, nota ){

        listaNotas.splice( listaNotas.indexOf( nota ), 1);
        Materialize.toast('A Tarefa foi excluida!', 4000);
    };
});