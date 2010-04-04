GeraLink = {};

GeraLink.CITACAO_DIRETA = 1;
GeraLink.CITACAO_INDIRETA = 2;

GeraLink.bibliografia = document.getElementById('bibliografia');
GeraLink.listaLink = Referencia.bibliografia;

GeraLink.gerarCitacao = function (objetoReferencia, tipo) {
    return false;
};

GeraLink.gerarCitacaoDireta = function (objetoReferencia) {
    return GeraLink.gerarCitacao(objetoReferencia, GeraLink.CITACAO_DIRETA);
};

GeraLink.gerarCitacaoIndireta = function (objetoReferencia) {
    return GeraLink.gerarCitacao(objetoReferencia, GeraLink.CITACAO_INDIRETA);
}

GeraLink.gerarReferencia = function (objetoReferencia) {
    var autorTrabalho, autorPublicacao, tituloTrabalho, tituloPublicacao, publicacaoDetalhe,
        autorTrabalhoSpan, autorPublicacaoSpan, tituloTrabalhoSpan, tituloPublicacaoSpan, publicacaoDetalheSpan;
    switch (objetoReferencia['tipo']) {
        case Referencia.TIPO_ARTIGO:
            break;
        case Referencia.TIPO_CONGRESSO:
            break;
        case Referencia.TIPO_LIVRO:
            break;
        case Referencia.TIPO_ONLINE:
            break;
        case Referencia.TIPO_FOLHETO:
            break;
        case Referencia.TIPO_REVISTA:
            break;
    }
    return false;
};

GeraLink.criarListLink = function () {
    var target = GeraLink.bibliografia,
        listLink = GeraLink.listaLink,
        doc = document,
        targetList = doc.createElement('ul'),
        targetItem, linkItem, objectItem, typeItem;
    for (var i = 0; objectItem = listLink[i]; i++) {
        targetItem = doc.createElement('li');

        linkItem = doc.createElement('a');
        linkItem.href = objectItem['site'];
        linkItem.appendChild(
                doc.createTextNode(objectItem['titulo'] === '' ?
                        'Sem titulo' :
                        objectItem['titulo']));

        typeItem = doc.createElement('span');
        typeItem.className = 'referenceType';
        typeItem.appendChild(doc.createTextNode(' (' + objectItem['tipo'] + ')'));

        targetItem.appendChild(linkItem);
        targetItem.appendChild(typeItem);
        targetList.appendChild(targetItem);
    }
    target.appendChild(targetList);
};

GeraLink.init = function () {
    GeraLink.criarListLink();
};
