window.addEvent('domready', function () {
    var frm_flt_turma = $('filtro_turma')       //form de filtro de turma
        , frm_cad_turma = $('turma_cadastro')   //form de cadastro de turma
        , tbl_reg_turma = $('turma_registro')   //tabela de registro de turma
    ;
    frm_cad_turma.addEvent('submit', function () {
        alert('tentou salvar mas nao pode!!!');
        return false;
    });
});
