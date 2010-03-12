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
function hasClass(target, nome_classe) {
    var target_class = target.className,
        regexp_class = new RegExp('(^| )' + nome_classe + '( |$)');
        bl_has_class = false;
    if (regexp_class.test(target_class)) {
        bl_has_class = true;
    }
    return bl_has_class;
}
function addClass(target, class_name) {
    if (hasClass(target, class_name)) {
        if (target.className == '') {
            target.className = class_name;
        } else {
            target.className += ' ' + class_name;
        }
    }
};
function removeClass(target, class_name) {
    var regexp_class = new RegExp('(^| )' + className + '( |$)');
    if (hasClass(target, class_name)) {
        target.className = target.className.replace(pattern, '');
    }
}
function changeClass(target, class_to_remove, class_to_add) {
    removeClass(target, class_to_remove);
    addClass(target, class_to_add);
}

//--- CONTROLES ---------------------------------------------------
/**
 * Controla a acao dos botoes do formulario
 * @param {Object} e: o objeto evento
 */
function controlCadastro(e) {
    var wdw = window,
        doc = document,
        e = getEvent(e),
        btn_target = getTarget(e),
        quadro_formulario, quadro_resposta;
        btn_value = '', ipt_nome = '', ipt_idade = '',
        vl_idade = {}, nr_idade = 0,
        soma_idade = 0, total_aluno = 0, media_idade = 0;
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
            } else {
                alert(vl_idade.mensagem);
                ipt_idade.value = '';
                ipt_idade.focus();
                return false;
            }
        } else if (btn_value === 'media') {
            if (wdw._arr_idade.length > 0) {
                addClass(quadro_formulario, 'hidden');
                removeClass(quadro_formulario, 'hidden');
                total_aluno = wdw._arr_idade.length;
                for (var i = 0; i < total_aluno; i++) {
                    soma_idade += wdw._arr_idade[i];
                }
                media_idade = soma_idade / total_aluno;
            }
        } else if (btn_value === '') {
        }
        ipt_nome.value = ipt_idade.value = '';
        return false;
    }
}
/**
 * Apresenta um log em tela da acao realizada
 */
function setLog(obj_dado) {
    var doc = document;
}

/**
 * Inicializa o aplicativo
 */
function init() {
    document.getElementById('formulario').onclick = controlCadastro;
    document.getElementById('frm_aluno').onsubmit = function () {
        return false;
    };
}
