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
        , tabela
    }
};
var RegistroTable = new Class({
    Implements: [Options]
    , options: {
        tabela_registro: $('registro')
        , formulario: $('cadastro')
        , registros: $.jStorage.get('registro')
        , tipo: CADASTRO_TURMA
    }
    , initialize: function (options) {
        this.setOptions(options);
    }
    , adicionarControle: function () {
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
    , path = []
    , arquivo = ''
    ;

    path = endereco.pathname.split('/');
    arquivo = path[path.length - 1];
    arquivo = arquivo.substring(0, arquivo.indexOf('.'));

    return arquivo;
}

window.addEvent('domready', function () {
    var frm_flt_turma = $('filtro_turma')       //form de filtro de turma
        , frm_cad_turma = $('turma_cadastro')   //form de cadastro de turma
        , tbl_reg_turma = $('turma_registro')   //tabela de registro de turma
        , cadastro_classe = $.jStorage.get('classes')   //registro de classes
    ;

    frm_cad_turma.addEvent('submit', function () {
        alert('tentou salvar mas nao pode!!!');
        return false;
    });
});
