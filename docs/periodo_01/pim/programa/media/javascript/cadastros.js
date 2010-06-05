var CADASTRO_TURMA = 1
    , CADASTRO_ALUNO = 2
    , CADASTRO_AVALIACAO = 3
    ;
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
