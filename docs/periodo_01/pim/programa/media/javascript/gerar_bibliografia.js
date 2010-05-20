GeraLink = {};

//Tipos de citacao
GeraLink.CITACAO_DIRETA = 1;
GeraLink.CITACAO_INDIRETA = 2;

//Tipos de autor
GeraLink.TITULO_TRABALHO = 1;
GeraLink.TITULO_PUBLICACAO = 2;

//Obter elemento onde sera gravada a lista de bibliograficas
GeraLink.bibliografia = document.getElementById('bibliografia');
//Manter referencia a lista de bibliografias obtidas
GeraLink.listaLink = Referencia.bibliografia;

/**
 * Funcao auxiliar para gerar uma citacao de acordo com o tipo
 * @param objetoReferencia {Oject}: um objeto referencia
 * @param tipo {int}: o tipo da citacao a ser criada, ver tipos de citacao
 * @return {String}: a string da citacao ja formatada
 */
GeraLink.gerarCitacao = function (objetoReferencia, tipo) {
    //TODO
    return false;
};

/**
 * Gera uma citacao direta a partir de uma referencia bibliografica
 * @param objetoReferencia {Object}: um objeto referencia
 * @return {String}: a string da citacao ja formatada
 */
GeraLink.gerarCitacaoDireta = function (objetoReferencia) {
    return GeraLink.gerarCitacao(objetoReferencia, GeraLink.CITACAO_DIRETA);
};

/**
 * Gera uma citacao indireta a partir de uma referencia bibliografica
 * @param objetoReferencia {Object}: um objeto referencia
 * @return {String}: a string da citacao ja formatada
 */
GeraLink.gerarCitacaoIndireta = function (objetoReferencia) {
    return GeraLink.gerarCitacao(objetoReferencia, GeraLink.CITACAO_INDIRETA);
}

/**
 * Gera um autor de acordo com o disponivel pelo objeto de referencia
 * @param objetoReferencia {Object}: um objeto referencia
 * @return {String}: a string com o nome de autor(es)
 */
GeraLink.gerarAutor = function (objetoReferencia) {
    var autorTrabalho = '',
        listAutor = [],
        tipoAutor = 0,
        arAutor = [];
    // preparando autor
    if (objetoReferencia['autor']) {
        tipoAutor = 1;
        listAutor = objetoReferencia['autor'];
    } else if (objetoReferencia['organizacao']) {
        tipoAutor = 2;
        listAutor = objetoReferencia['organizacao'];
    } else if (objetoReferencia['governo']) {
        tipoAutor = 3;
        listAutor = objetoReferencia['governo'];
    }
    // gerando a lista de autores
    switch (tipoAutor) {
    case 1: //Autor
        if (listAutor.length > 3) {
            autorTrabalho = listAutor[0]['sobrenome'].toUpperCase();
            autorTrabalho += ', ' + listAutor[0].nome;
            autorTrabalho += '; et al.';
            arAutor.push(autorTrabalho);
        } else {
            for (var idx in listAutor) {
                autorTrabalho = listAutor[idx]['sobrenome'].toUpperCase();
                autorTrabalho += ', ' + listAutor[idx]['nome'];
                arAutor.push(autorTrabalho);
            }
        }
        break;
    case 2: //Organizacao
        for (autor in listaAutor) {
            autorTrabalho += autor['nome'].toUpperCase();
            arAutor.push(autorTrabalho);
        }
        break;
    case 3: //Governo
        //TODO
        break;
    }
    return arAutor.join('; ');
};

/**
 * Gerar a imprenta, ou seja, dados de editora e publicacao
 * @param objetoReferencia {Object}: um objeto referencia
 * @return {String}: a string com a imprenta formatada 
 */
GeraLink.gerarImprenta = function (objetoReferencia) {
    var imprenta, publicacao;
    if (objetoReferencia['publicacao'] != null) {
        publicacao = objetoReferencia['publicacao'];
        imprenta = publicacao['local'];
        if (publicacao['editora']) {
            imprenta += ': ' + publicacao['editora'];
        }
        imprenta += ', ' + publicacao['ano'];
    }
    return imprenta;
};

/**
 * Gerar titulo e subtitulo do trabalho ou publicacao de acordo com o criterio
 * @param objetoReferencia {Object}: um objeto referencia
 * @param criterio (Integer): criterio para onde obter o titulo e subtitulo
 * @return {String} || {HTMLElement}: a string ou link com o titulo
 */
GeraLink.gerarTitulo = function (objetoReferencia, criterio) {
    var titulo, hasSite, lnkTitulo;

    hasSite = objetoReferencia['site'] != null;

    if (criterio === GeraLink.TITULO_PUBLICACAO) {
        objetoReferencia = objetoReferencia['publicacao'];
    }

    titulo = objetoReferencia['titulo'];
    if (objetoReferencia['subtitulo']) {
        titulo += ': ' + objetoReferencia['subtitulo'];
    }

    if (hasSite) {
        lnkTitulo = document.createElement('a');
        lnkTitulo.href = objetoReferencia['site'];
        lnkTitulo.appendChild(document.createTextNode(titulo));
        return lnkTitulo;
    }

    return titulo;
};

/**
 * Gerar dados complementares da referencia
 * @param objetoReferencia {Object}: um objeto referencia
 * @return {String}: dados complementares da referencia
 */
GeraLink.gerarDadoComplementar = function (objetoReferencia) {
    //TODO
};

/**
 * Gerar dados de descricao fisica da referencia online
 * @param objetoReferencia {Obect}
 * @return {String}: descricao fisica da referencia
 */
GeraLink.gerarDescricaoFisica = function (objetoReferencia) {
    //TODO
};

/**
 * Gera a referencia e citacao de um objeto de referencia
 * @param objetoReferencia {Object}: um objeto referencia
 */
GeraLink.gerarReferencia = function (objetoReferencia) {
    var doc = document
        , hasSite = objetoReferencia['site'] != null
        , autorTrabalho, autorPublicacao, tituloTrabalho, tituloPublicacao, imprenta, publicacaoDetalhe
        , autorTrabalhoSpan = doc.createElement('span')
        , autorPublicacaoSpan = doc.createElement('span')
        , tituloTrabalhoSpan = doc.createElement('span')
        , tituloPublicacaoSpan = doc.createElement('span')
        , imprentaSpan = doc.createElement('span')
        , publicacaoDetalheSpan = doc.createElement('span');

    autorTrabalho = GeraLink.gerarAutor(objetoReferencia);
    imprenta = GeraLink.gerarImprenta(objetoReferencia);
    tituloTrabalho = GeraLink.gerarTitulo(objetoReferencia, GeraLink.TITULO_TRABALHO);

    //log
    console.log(autorTrabalho);
    console.log(imprenta);
    console.log(tituloTrabalho);
    //fim log

    autorTrabalhoSpan.appendChild(doc.createTextNode(autorTrabalho));
    imprentaSpan.appendChild(doc.createTextNode(imprenta));
    if (hasSite) {
        tituloTrabalhoSpan.appendChild(tituloTrabalho);
    } else {
        tituloTrabalhoSpan.appendChild(doc.createTextNode(tituloTrabalho));
    }

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

GeraLink.test = function () {
    tempReferencia = [
        {'titulo': 'Essências de metodologia científica'
            , 'subtitulo': 'Aplicada à educação'
            , 'autor': [{'nome': 'Anderson', 'sobrenome': 'Espírito Santo'}]
            , 'publicacao': {
                'local': 'Londrina'
                , 'editora': 'Universidade Estadual'
                , 'ano': 1987
            }
            , 'tipo': Referencia.TIPO_LIVRO}
        , {'titulo': 'Brazilian stones meteorites'
            , 'autor': [
                {'nome': 'C. B.', 'sobrenome': 'Gomes'}
                , {'nome': 'K', 'sobrenome': 'Keil'}]
            , 'publicacao': {
                'local': 'Albuquerque'
                , 'editora': 'University of New Mexico'
                , 'ano': 1980
            }
            , 'tipo': Referencia.TIPO_LIVRO}
        , {'titulo': 'Incorporação do tempo em SGDB orientado a objetos'
            , 'autor': [{'nome': 'R', 'sobrenome': 'Kronstrand'}]
            , 'publicacao': {
                'congresso': 'Simpósio Brasileiro de Banco de Dados'
                , 'edicao': 3
                , 'nome': 'Resumos do 3º Simpósio Brasileiro de Banco de Dados'
                , 'local': 'Londrina'
                , 'editora': 'IAPAR'
                , 'ano': 1994
                , 'pagina_inicial': 34}
            , 'tipo': Referencia.TIPO_CONGRESSO}
        , {'titulo': 'Molecular biology of transgenic animals'
            , 'autor': [
                {'nome': 'A L', 'sobrenome': 'Boyd'}
                , {'nome': 'D', 'sobrenome': 'Samid'}]
            , 'publicacao': {
                'titulo': 'Journal of Animal Science'
                , 'volume': 71
                , 'numero': 3
                , 'ano': 1993
                , 'pagina_inicial': 1
                , 'pagina_final': 9}
            , 'tipo': Referencia.TIPO_ARTIGO}
    ];
    for (var idx in tempReferencia) {
        GeraLink.gerarReferencia(tempReferencia[idx]);
    }
};
