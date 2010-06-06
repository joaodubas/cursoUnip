var CADASTRO =
{
    cadastro_turma:
    {
        formulario: 'turma_cadastro'
        , filtro: 'turma_filtro'
        , tabela: 'turma_registro'
        , mapa: ['ipt_nome_turma'
            , 'sel_periodo_turma'
        ]
    }
    , cadastro_aluno:
    {
        formulario: 'aluno_cadastro'
        , filtro: 'aluno_filtro'
        , tabela: 'aluno_registro'
        , mapa: ['ipt_nome_aluno'
            , 'ipt_masculino'
            , 'ipt_feminino'
            , 'ipt_dt_nascimento'
            , 'sel_turma'
        ]
    }
    , cadastro_avaliacao:
    {
        formulario: 'avaliacao_cadastro'
        , filtro: 'avaliacao_filtro'
        , tabela: 'avaliacao_registro'
        , mapa: ['sel_turma'
            , 'sel_aluno'
            , 'ipt_data_avaliacao'
            , 'ipt_massa'
            , 'ipt_estatura'
            , 'ipt_cintura'
            , 'ipt_quadril'
        ]
    }
};
var RegistroTable = new Class({
    Implements: [Options]
    , options: {
        tipo: CADASTRO['cadastro_turma']
        , registros: null
    }
    , tabela: null
    , tabela_corpo: null
    , filtro: null
    , formulario: null
    , modal: null
    , botao_adicionar: null
    , initialize: function (options) {
        this.setOptions(options);
        this.tabela = new HtmlTable($$('.browser')[0]);
        this.tabela_corpo = $(this.options.tipo['tabela']);
        this.filtro = $(this.options.tipo['filtro']);
        this.formulario = $(this.options.tipo['formulario']);
        this.modal = this.formulario.getParent();
        this.modal.addClass('esconder');
        this.botao_adicionar = $$('.btn_add_registro');
        this.adicionarControle();
    }
    , adicionarControle: function () {
        var modal = this.modal
            , modalSize = null
            , viewPort = null
            , topPos = 0
            ;
        //adiciona os eventos submit e reset ao formulario principal
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
        //adiciona os eventos de edicao e delecao de regitro aos links da tabela
        this.tabela_corpo.addEvent('click:relay(a)', function (event, element) {
            event.preventDefault();
            if (this.hasClass('editar')) {
                
            } else if (this.hasClass('apagar')) {
                
            }
            alert('Nao implementado! ' + this.className);
            return false;
        });
        this.botao_adicionar.addEvent('click', function (event) {
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
