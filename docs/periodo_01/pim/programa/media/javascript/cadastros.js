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
            var id = this.getProperty('id');
            if (this.hasClass('editar')) {
                self.editarRegistro(this);
            } else if (this.hasClass('apagar')) {
                self.removerRegistro(this);
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
        var id = 0
            , form_field = null
            , registro = new Hash()
            , tipo = this.options.tipo.tipo
            , propriedade_container = ''
        ;
        switch (tipo) {
            case 0:
                id = this.options.registros.length;
                propriedade_container = 'alunos';
                break;
            case 1:
                id = this.options.registros[$('sel_turma').value]
                    .alunos.length;
                propriedade_container = 'avaliacoes';
                break;
            case 2:
                id = this.options.registros[$('sel_turma').value]
                    .alunos[$('sel_aluno').value]
                    .avaliacoes.length;
                break;
        }
        this.options.tipo.mapa.each(function (value, index) {
            form_field = $(value);
            if (index == 0) {
                registro.set(form_field.name, id);
            } else {
                registro.set(form_field.name, form_field.value);
            }
            form_field.value = '';
        });
        if (tipo < 3) {
            registro.set(propriedade_container, []);
        } else {
        }
        this.options.registros.push(registro);
        $.jStorage.set('classes', this.options.registros);
        this.registro_atual = registro;
        this.inserirLinhaBrowser();

        return false;
    }
    , atualizarRegistro: function () {
        return false;
    }
    , removerRegistro: function (target) {
        var id_lista = target.getProperty('id').split('|')
            , targetParent = target.getParent('tr').dispose()
            , listaObjetos = []
            , objeto = {}
            , id = 0
            , id_objeto = ''
        ;
        switch (id_lista.length) {
            case 2: //TURMA
                listaObjetos = this.options.registros;
                id_objeto = 'nr_id_turma';
                break;
            case 3: //ALUNO
                listaObjetos = this.options.registros[id_lista[1]]
                    .alunos;
                id_objeto = 'nr_id_aluno';
                break;
            case 4: //AVALIACAO
                listaObjetos = this.options.registros[id_lista[1]]
                    .alunos[id_lista[2]]
                    .avaliacoes;
                id_objeto = 'nr_id_avaliacao';
                break;
        }
        id = id_lista.getLast().toInt();
        objeto = listaObjetos[id];
        listaObjetos.erase(objeto);
        listaObjetos.each(function (value, key) {
            if (key >= id) {
                value[id_objeto] -= 1;
            }
        });
        $.jStorage.set('classes', this.options.registros);
        this.popularBrowser();
        return false;
    }
    , editarRegistro: function (target) {
        return false;
    }
    , popularBrowser: function () {
        var self = this
            , ha_sem_registro = false
            , registro = this.options.registros
            , numero_celulas = $(this.tabela).tHead.rows[0].cells.length + 1
            , tipo = this.options.tipo.tipo
            , nome_turma = nome_aluno = ''
        ;
        this.tabela.empty();
        if ($defined(registro[0])) {
            registro.each(function (turma) {
                if (tipo == 0) {
                    self.registro_atual = turma;
                    self.inserirLinhaBrowser();
                } else if ($defined(turma.alunos)) {
                    nome_turma = turma.nm_turma;
                    self.tabela.push([{content: nome_turma
                        , properties: {
                            colspan: numero_celulas
                        }
                    }]);
                    turma.alunos.each(function (aluno) {
                        if (tipo == 1) {
                            self.registro_atual = aluno;
                            self.inserirLinhaBrowser();
                        } else if ($defined(aluno.avaliacoes)) {
                            nome_aluno = aluno.nm_aluno;
                            self.tabela.push([{content: nome_aluno
                                , properties: {
                                    colspan: numero_celulas
                                }
                            }]);
                            aluno.avaliacoes.each(function (avaliacao) {
                                self.registro_atual = avaliacao;
                                self.inserirLinhaBrowser();
                            });
                        } else {
                            self.inserirSemRegistro(numero_celulas, ha_sem_registro);
                            ha_sem_registro = true;
                        }
                    });
                } else {
                    self.inserirSemRegistro(numero_celulas, ha_sem_registro);
                    ha_sem_registro = true;
                }
            });
        } else {
            self.inserirSemRegistro(numero_celulas, false);
        }
        return false;
    }
    , inserirSemRegistro: function (numero_celulas, ha_sem_registro) {
        if (!ha_sem_registro) {
            new Element('th', {
                'scope': 'row'
                , 'html': 'Nenhum Registro'
                , 'colspan': numero_celulas
            }).inject(new Element('tr').inject(this.tabela_corpo))
        }
        return false;
    }
    , inserirLinhaBrowser: function () {
        registro = this.registro_atual;
        tipo_cadastro = this.options.tipo.tipo;
        switch (tipo_cadastro) {
            case 0:
                this.inserirLinhaTurma(registro);
                break;
            case 1:
                this.inserirLinhaAluno(registro);
                break;
            case 2:
                this.inserirLinhaAvaliacao(registro);
                break;
        }
        return false;
    }
    , inserirLinhaTurma: function (registro) {
        var periodos = ['Matutino', 'Vespertino', 'Noturno', 'Integral']
            , id_turma = registro.nr_id_turma
            , nome_turma = registro.nm_turma
            , periodo_turma = periodos[registro.cd_periodo - 1]
            , numero_alunos = $chk(registro.alunos) ? registro.alunos.length : 0
        ;
        this.tabela.push([
            this.criarLinkControle(1, 'editar|' + id_turma, String(id_turma))
            , nome_turma
            , periodo_turma
            , String(numero_alunos)
            , this.criarLinkControle(1, 'editar|' + id_turma)
            , this.criarLinkControle(2, 'apagar|' + id_turma)
        ]);
        return false;
    }
    , inserirLinhaAluno: function () {
        return false;
    }
    , inserirLinhaAvaliacao: function () {
        return false;
    }
    , criarLinkControle: function (tipo_link, id_link, texto_link) {
        if (!$chk(texto_link)) {
            texto_link = tipo_link == 1 ? 'Editar' : 'Apagar';
        }
        elemento = new Element('a', {
            'href': '#'
            , 'id': id_link
            , 'class': tipo_link == 1 ? 'editar' : 'apagar'
            , 'html': texto_link
        });
        return elemento;
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

