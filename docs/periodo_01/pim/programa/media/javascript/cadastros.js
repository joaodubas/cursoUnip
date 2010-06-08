//CONTEM AS CARACTERISTICAS DE INTERESSE PARA AS PAGINAS DE CADASTRO
var CADASTRO =
{
    cadastro_turma:
    {
        formulario: 'turma_cadastro'
        , filtro: 'turma_filtro'
        , tabela: 'turma_registro'
        , mapa: ['hd_id_turma'
            , 'ipt_nome_turma'
            , 'sel_periodo_turma'
        ]
        , tipo: 0
    }
    , cadastro_aluno:
    {
        formulario: 'aluno_cadastro'
        , filtro: 'aluno_filtro'
        , tabela: 'aluno_registro'
        , mapa: ['hd_id_aluno'
            , 'ipt_nome_aluno'
            , 'ipt_masculino'
            , 'ipt_feminino'
            , 'ipt_dt_nascimento'
            , 'sel_turma'
        ]
        , tipo: 1
    }
    , cadastro_avaliacao:
    {
        formulario: 'avaliacao_cadastro'
        , filtro: 'avaliacao_filtro'
        , tabela: 'avaliacao_registro'
        , mapa: ['hd_id_avaliacao'
            , 'sel_turma'
            , 'sel_aluno'
            , 'ipt_data_avaliacao'
            , 'ipt_massa'
            , 'ipt_estatura'
            , 'ipt_cintura'
            , 'ipt_quadril'
        ]
        , tipo: 2
    }
};

//CLASSE QUE IMPLEMENTA OS CONTROLES PARA CADASTROS
var RegistroTable = new Class({
    Implements: [Options]
    , options: {
        tipo: CADASTRO['cadastro_turma']
        , registros: []
    }
    , tabela: null
    , tabela_corpo: null
    , filtro: null
    , formulario: null
    , modal: null
    , botao_adicionar: null
    , registro_atual: null
    , initialize: function (options) {
        this.setOptions(options);
        this.tabela = new HtmlTable($$('.browser')[0]);
        this.tabela_corpo = $(this.options.tipo['tabela']);
        this.filtro = $(this.options.tipo['filtro']);
        this.formulario = $(this.options.tipo['formulario']);
        this.modal = this.formulario.getParent();
        this.modal.addClass('esconder');
        this.botao_adicionar = $$('.btn_add_registro');
        this.popularBrowser();
        this.adicionarControle();
    }
    , adicionarControle: function () {
        var self = this
            , modalSize = null
            , viewPort = null
            , topPos = 0
            ;
        //adiciona os eventos submit e reset ao formulario principal
        this.formulario.addEvents({
            'submit': function (event) {
                event.preventDefault();
                self.modal.removeClass('exibir');
                self.modal.addClass('esconder');
                if ($chk($(self.options.tipo.mapa[0]).value)) {
                    self.atualizarRegistro();
                } else {
                    self.adicionarRegistro();
                }
                return false;
            }
            , 'reset': function (event) {
                self.modal.removeClass('exibir');
                self.modal.addClass('esconder');
            }
        });
        //adiciona os eventos de edicao e delecao de regitro aos links da tabela
        this.tabela_corpo.addEvent('click:relay(a)', function (event, element) {
            event.preventDefault();
            if (this.hasClass('editar')) {
                self.editarRegistro();
            } else if (this.hasClass('apagar')) {
                self.removerRegistro();
            }
            return false;
        });
        //faz com que o botao acione o formulario
        this.botao_adicionar.addEvent('click', function (event) {
            event.preventDefault();
            if (!self.modal.hasClass('exibir')) {
                self.modal.removeClass('esconder');
                self.modal.addClass('exibir');
                modalSize = self.modal.getSize();
                viewPort = window.getSize();
                topPos = (viewPort.y - modalSize.y) / 2;
                self.modal.setStyle('top', topPos);
            }
            return false;
        });
        return false;
    }
    , adicionarRegistro: function () {
        var id = this.options.registros.length
            , form_field = null
            , registro = new Hash();
        ;
        this.options.tipo.mapa.each(function (value, index) {
            form_field = $(value);
            if (index == 0) {
                registro.set(form_field.name, id);
            } else {
                registro.set(form_field.name, form_field.value);
            }
            form_field.value = '';
        });
        this.options.registros.push(registro);
        $.jStorage.set('classes', this.options.registros);
        alert($.jStorage.get('classes'));
        return false;
    }
    , atualizarRegistro: function () {
        return false;
    }
    , removerRegistro: function () {
        return false;
    }
    , editarRegistro: function () {
        return false;
    }
    , popularBrowser: function () {
        var registro = this.options.registros
            , numero_celulas = $(this.tabela).tHead.rows[0].cells.length + 1
            , tipo = this.options.tipo.tipo
        ;
        if ($defined(registro[0])) {
            registro.each(function (turma) {
                if (tipo == 0) {
                    this.tabela.push([]);
                } else {
                    this.table.push([]);
                    turma.alunos.each(function (aluno) {
                        if (tipo == 1) {
                            this.tabela.push([]);
                        } else {
                            this.tabela.push([]);
                            aluno.avaliacoes.each(function (avaliacao) {
                                this.tabela.push([]);
                            });
                        }
                    });
                }
            });
        } else {
            new Element('th', {
                'scope': 'row'
                , 'html': 'Nenhum Registro'
                , 'colspan': numero_celulas
            }).inject(new Element('tr').inject(this.tabela_corpo))
        }
        return false;
    }
    , inserirLinhaBrowser: function () {
        return false;
    }
});

/**
 * Obtem o nome da pagina atual
 * @returns {String} o nome do arquivo sem sua extensao
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
        , cadastro_classe = $.jStorage.get('classes', [])   //registro de classes
        , tipo_cadastro = CADASTRO[nome_cadastro]           //tipo de cadastro
        , controleForm = new RegistroTable({
            tipo: tipo_cadastro
            , registros: cadastro_classe
        })
    ;
});

registros = [
    {'nm_turma': 'Classe de teste'
        , 'cd_periodo': 1
        , 'alunos': [
            {'nm_aluno': 'Joao Paulo Dubas'
                , 'cd_genero': 1
                , 'dt_nascimento': '15/12/1978'
                , 'avaliacoes': [
                    {'dt_avaliacao': '08/12/2008'
                        , 'nr_massa': 84
                        , 'nr_estatura': 168
                        , 'nr_cct': 95
                        , 'nr_cqd': 105
                    }
                    , {'dt_avaliacao': '08/06/2009'
                        , 'nr_massa': 87
                        , 'nr_estatura': 168
                        , 'nr_cct': 98
                        , 'nr_cqd': 109
                    }
                    , {'dt_avaliacao': '08/12/2009'
                        , 'nr_massa': 85
                        , 'nr_estatura': 167.5
                        , 'nr_cct': 96
                        , 'nr_cqd': 110
                    }
                    , {'dt_avaliacao': '08/06/2009'
                        , 'nr_massa': 84
                        , 'nr_estatura': 168
                        , 'nr_cct': 94
                        , 'nr_cqd': 106
                    }
                ]
            }
            , {'nm_aluno': 'Claudio Eduardo Dubas'
                , 'cd_genero': 1
                , 'dt_nascimento': '13/02/1980'
                , 'avaliacoes': [
                    {'dt_avaliacao': '08/12/2008'
                        , 'nr_massa': 84
                        , 'nr_estatura': 168
                        , 'nr_cct': 95
                        , 'nr_cqd': 105
                    }
                    , {'dt_avaliacao': '08/06/2009'
                        , 'nr_massa': 87
                        , 'nr_estatura': 168
                        , 'nr_cct': 98
                        , 'nr_cqd': 109
                    }
                    , {'dt_avaliacao': '08/12/2009'
                        , 'nr_massa': 85
                        , 'nr_estatura': 167.5
                        , 'nr_cct': 96
                        , 'nr_cqd': 110
                    }
                    , {'dt_avaliacao': '08/06/2009'
                        , 'nr_massa': 84
                        , 'nr_estatura': 168
                        , 'nr_cct': 94
                        , 'nr_cqd': 106
                    }
                ]
            }
        ]
    }
];
