var CADASTRO =
{
    cadastro_turma:
    {
        formulario: 'turma_cadastro'
        , filtro: 'turma_filtro'
        , tabela: 'turma_registro'
    }
    , cadastro_aluno:
    {
        formulario: 'aluno_cadastro'
        , filtro: 'aluno_filtro'
        , tabela: 'aluno_registro'
    }
    , cadastro_avaliacao:
    {
        formulario: 'avaliacao_cadastro'
        , filtro: 'avaliacao_filtro'
        , tabela: 'avaliacao_registro'
    }
};
var RegistroTable = new Class({
    Implements: [Options]
    , options: {
        tipo: CADASTRO['cadastro_turma']
        , registros: null
    }
    , tabela: null
    , filtro: null
    , formulario: null
    , modal: null
    , adicionar: null
    , initialize: function (options) {
        this.setOptions(options);
        this.tabela = $(this.options.tipo['tabela']);
        this.filtro = $(this.options.tipo['filtro']);
        this.formulario = $(this.options.tipo['formulario']);
        this.modal = this.formulario.getParent();
        this.modal.addClass('esconder');
        this.adicionar = $$('.btn_add_registro');
        this.adicionarControle();
    }
    , adicionarControle: function () {
        var modal = this.modal
            , modalSize = null
            , viewPort = null
            , topPos = 0
            ;
        this.formulario.addEvents({
            'submit': function (event) {
                event.preventDefault();
                modal.removeClass('exibir');
                modal.addClass('esconder');
                return false;
            }
            , 'reset': function (event) {
                modal.removeClass('exibir');
                modal.addClass('esconder');
            }
        });
        this.tabela.addEvent('click:relay(a)', function (event, element) {
            event.preventDefault();
            alert('Nao implementado!');
            return false;
        });
        this.adicionar.addEvent('click', function (event) {
            event.preventDefault();
            if (!modal.hasClass('exibir')) {
                modal.removeClass('esconder');
                modal.addClass('exibir');
                modalSize = modal.getSize();
                viewPort = window.getSize();
                topPos = (viewPort.y - modalSize.y) / 2;
                modal.setStyle('top', topPos);
            }
            return false;
        });
        return false;
    }
    , adicionarRegistro: function () {
        return false;
    }
    , removerRegistro: function () {
        return false;
    }
    , editarRegistro: function () {
        return false;
    }
});

/**
 * Obtem o nome da pagina atual
 */
function getArquivo() {
    var endereco = window.location
    , arquivo = ''
    ;

    arquivo = endereco.pathname.split('/').getLast();
    arquivo = arquivo.substring(0, arquivo.indexOf('.'));

    return arquivo;
}

window.addEvent('domready', function () {
    var nome_cadastro = getArquivo()                        //nome pagina
        , cadastro_classe = $.jStorage.get('classes', null) //registro de classes
        , tipo_cadastro = CADASTRO[nome_cadastro]           //tipo de cadastro
        , controleForm = new RegistroTable({
            tipo: tipo_cadastro
            , registros: cadastro_classe
        })
    ;
});
