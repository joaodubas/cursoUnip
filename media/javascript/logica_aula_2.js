//--- AUXILIARES --------------------------------------------------
/**
 * Retorna o objeto evento contendo detalhes a respeito do evento
 * disparado
 * @param {Object || undefined} e: o objeto evento disponivel
 * @return {Object}: o objeto contendo os detalhes do evento
 */
function getEvent(e) {
    e = window.event || e;
    return e;
}
/**
 * Retorna o elemento responsavel por disparar o evento
 * @param {Object} e: o objeto evento
 * @return {HTMLElement}: o elemento que disparou o evento
 */
function getTarget(e) {
    var target = e.srcElement || e.target;
    return target;
}
/**
 * Define um array que servira de acumulador no objeto window
 * @param {String} propriedade: nome da array a conter os dados
 */
function setAcumulador(propriedade) {
    var wdw = window;
    if (wdw[propriedade] == null) {
        wdw[propriedade] = [];
    }
}
/**
 * Verifica se o valor passado e um numero inteiro positivo
 * @param {Object} valor: o valor a ser validado
 * @return {Object}: objeto contendo o valor (caso valido) e o
 * status da validacao
 */
function validateInteiroPositivo(valor) {
    var numero = Number(valor).valueOf(),
        numero_validacao = {};
    if (isNaN(numero)) {
        numero_validacao.valido = false;
        numero_validacao.mensagem = 'Digite um n&uacute;mero';
    } else if (numero < 0) {
        numero_validacao.valido = false;
        numero_validacao.mensagem = 'Digite um n&uacute;mero maior que zero';
    } else {
        numero_validacao.valido = true;
        numero_validacao.valor = numero;
    }
    return numero_validacao;
}
/**
 * Verifica se o elemento contem a classe especifica
 * @param target {HTMLElement}: elemento a ser avaliado
 * @param nome_class {String}: a classe sendo procurada
 * @return {Boolean} indicando se class foi ou nao encontrada
 */
function hasClass(target, nome_classe) {
    var target_class = target.className,
        regexp_class = new RegExp('(^| )' + nome_classe + '( |$)');
        bl_has_class = false;
    if (regexp_class.test(target_class)) {
        bl_has_class = true;
    }
    return bl_has_class;
}
/**
 * Adiciona uma classe ao elemento, caso ja nao exista
 * @param target {HTMLElement}: elemento a ser avaliado
 * @param nome_class {String}: a classe sendo adicionada
 */
function addClass(target, class_name) {
    if (!hasClass(target, class_name)) {
        if (target.className == '') {
            target.className = class_name;
        } else {
            target.className += ' ' + class_name;
        }
    }
}
/**
 * Remove uma classe do elemento, caso este possua
 * @param target {HTMLElement}: elemento a ser avaliado
 * @param nome_class {String}: a classe sendo removida
 */
function removeClass(target, class_name) {
    var regexp_class = new RegExp('(^| )' + class_name + '( |$)');
    if (hasClass(target, class_name)) {
        target.className = target.className.replace(regexp_class, '');
    }
}
/**
 * Altera uma classe do elemento para outra
 * @param target {HTMLElement}: elemento a ser avaliado
 * @param class_to_remove {String}: classe a ser removida
 * @param class_to_add {String}: classe a ser adicionada
 */
function changeClass(target, class_to_remove, class_to_add) {
    removeClass(target, class_to_remove);
    addClass(target, class_to_add);
}

//--- CONTROLES ---------------------------------------------------
function formatLog(dados) {
    var log = {};
    if (dados.length === 3) {
        log.origem = 'aluno';
        log.nome = dados[0];
        log.idade = dados[1];
        log.numero_aluno = dados[2];
    } else {
        log.origem = 'media';
        log.idade = dados[0];
        log.numero_aluno = dados[1];
    }
    return log;
}
/**
 * Controla a acao dos botoes do formulario
 * @param {Object} e: o objeto evento
 */
function controlCadastro(e) {
    var wdw = window,
        doc = document,
        e = getEvent(e),
        btn_target = getTarget(e),
        quadro_formulario, quadro_resposta,
        btn_value = '', ipt_nome = '', ipt_idade = '',
        vl_idade = {}, nr_idade = 0,
        soma_idade = 0, total_aluno = 0, media_idade = 0,
        log = {};
    if (btn_target.nodeName.toLowerCase() === 'button') {
        quadro_formulario = doc.getElementById('formulario');
        quadro_resposta = doc.getElementById('resposta');
        setAcumulador('_arr_idade');
        btn_value = btn_target.value;
        ipt_nome = doc.getElementById('ipt_nome');
        ipt_idade = doc.getElementById('ipt_idade');
        if (btn_value === 'inserir') {
            vl_idade = validateInteiroPositivo(ipt_idade.value);
            if (vl_idade.valido) {
                nr_idade = vl_idade.valor;
                wdw._arr_idade.push(nr_idade);
                log = formatLog([ipt_nome.value, ipt_idade.value, wdw._arr_idade.length]);
                setLog(log);
            } else {
                alert(vl_idade.mensagem);
                ipt_idade.value = '';
                ipt_idade.focus();
                return false;
            }
        } else if (btn_value === 'media') {
            if (wdw._arr_idade.length > 0) {
                addClass(quadro_formulario, 'hidden');
                removeClass(quadro_resposta, 'hidden');
                total_aluno = wdw._arr_idade.length;
                for (var i = 0; i < total_aluno; i++) {
                    soma_idade += wdw._arr_idade[i];
                }
                media_idade = soma_idade / total_aluno;
                log = formatLog([media_idade, total_aluno]);
                setLog(log);
            }
        } else if (btn_value === 'inserir') {
            wdw._arr_idade = [];
            addClass(quadro_resposta, 'hidden');
            removeClass(quadro_resposta, 'hidden');
        }
        ipt_nome.value = ipt_idade.value = '';
        return false;
    }
}
/**
 * Apresenta um log em tela da acao realizada
 */
function setLog(obj_dado) {
    var doc = document,
        log = doc.getElementById('log'),
        log_child = log.getElementsByTagName('ul').length,
        log_list,
        list_node, text_node = '';
    if (log_child === 0) {
        log.appendChild(doc.createElement('ul'));
    }
    log_list = log.getElementsByTagName('ul')[0];
    list_node = doc.createElement('li');
    if (obj_dado.origem === 'aluno') {
        text_node = doc.createTextNode(obj_dado.nome + ' (' + obj_dado.idade + '): ' + obj_dado.numero_aluno);
    } else {
        text_node = doc.createTextNode('Media: ' + obj_dado.media + '. Em turma de ' + obj_dado.numero_aluno + ' alunos');
    }
    list_node.appendChild(text_node);
    log_list.appendChild(list_node);
}

/**
 * Inicializa o aplicativo
 */
function init() {
    document.getElementById('formulario').onclick = function (e) {
        controlCadastro(e);
    };
    /*
    document.getElementById('frm_aluno').onsubmit = function (e) {
        e = getEvent(e);
        if (typeof event.preventDefault !== 'undefined') {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
        return false;
    };
    */
}
