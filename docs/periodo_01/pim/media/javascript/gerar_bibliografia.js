GeraLink = {};

GeraLink.CITACAO_DIRETA = 1;
GeraLink.CITACAO_INDIRETA = 2;

GeraLink.bibliografia = document.getElementById('bibliografia');
GeraLink.listaLink = Referencia.bibliografia;

GeraLink.gerarCitacao = function (objetoReferencia, tipo) {
    //TO DO
    return false;
};

GeraLink.gerarCitacaoDireta = function (objetoReferencia) {
    return GeraLink.gerarCitacao(objetoReferencia, GeraLink.CITACAO_DIRETA);
};

GeraLink.gerarCitacaoIndireta = function (objetoReferencia) {
    return GeraLink.gerarCitacao(objetoReferencia, GeraLink.CITACAO_INDIRETA);
}

GeraLink.gerarAutor = function (objetoReferencia) {
    var autorTrabalho = '',
        listAutor = [],
        tipoAutor = 0,
        arAutor = [];
    // preparando autor
    if (objetoReferencia.autor) {
        tipoAutor = 1;
        listAutor = objetoReferencia.autor;
    } else if (objetoReferencia.organizacao) {
        tipoAutor = 2;
        listAutor = objetoReferencia.organizacao;
    } else if (objetoReferencia.governo) {
        tipoAutor = 3;
        listAutor = objetoReferencia.governo;
    }

    switch (tipoAutor) {
    case 1:
        if (listAutor.length > 3) {
            autorTrabalho = listAutor[0].sobrenome.toUpperCase();
            autorTrabalho += ', ' + listAutor[0].nome;
            autorTrabalho += '; et al.';
            arAutor.push(autorTrabalho);
        } else {
            for (autor in listAutor) {
                autorTrabalho = autor.sobrenome.toUpperCase();
                autorTrabalho += ', ' + autor.nome;
                arAutor.push(autorTrabalho);
            }
        }
        break;
    case 2:
        for (autor in listaAutor) {
            autorTrabalho += autor.nome.toUpperCase();
            arAutor.push(autorTrabalho);
        }
        break;
    case 3:
        //TO DO
        break;
    }
    return arAutor.join('; ');

};

GeraLink.gerarImprenta = function (objetoReferencia) {
    var imprenta, publicacao;
    if (objetoReferencia['publicacao'] != null) {
        publicacao = objetoReferencia['publicacao'];
        imprenta = publicacao['local'];
        imprenta += ': ' + publicacao['editora'];
        imprenta += ', ' + publicacao['ano'];
    }
    return imprenta;
};

GeraLink.gerarDescricaoFisicao = function (objetoReferencia) {
    //TO DO
};

GeraLink.gerarReferencia = function (objetoReferencia) {
    var autorTrabalho, autorPublicacao, tituloTrabalho, tituloPublicacao, imprenta, publicacaoDetalhe,
        autorTrabalhoSpan, autorPublicacaoSpan, tituloTrabalhoSpan, tituloPublicacaoSpan, imprentaSpan, publicacaoDetalheSpan;

    autorTrabalho = GeraLink.gerarAutor(objetoReferencia);
    imprenta = GeraLink.gerarImprenta(objetoReferencia);

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
