#!/usr/bin/env python
#-*-coding: utf-8-*-

from datetime import datetime

#Dicionário de variáveis válidadas e suas mensagens de erro
VALIDAR = {
    'ano_entrada': 'Ano inválido'           \
    , 'mes_entrada': 'Mês inválido'         \
    , 'dia_entrada': 'Dia inválido'         \
    , 'hora_entrada': 'Hora inválida'       \
    , 'minuto_entrada': 'Minuto inválido'   \
    , 'temperatura_entrada': 'Temperatura inválida'
}

#Dicionário de características de produtos
PRODUTO = {
    'BR1': {
        'descricao': 'Broa de milho'    \
        , 'temperatura': {
            80: 120     \
            , 120: 50   \
            , 121: 30
        }
    }
    , 'BR2': {
        'descricao': 'Broa de fubá'     \
        , 'temperatura': {
            80: 80      \
            , 120: 40   \
            , 121: 20
        }
    }
    , 'PF1': {
        'descricao': 'Pão francês'      \
        , 'temperatura': {
            80: 100     \
            , 120: 70   \
            , 121: 20
        }
    }
    , 'PF2': {
        'descricao': 'Pão integral'     \
        , 'temperatura': {
            80: 110     \
            , 120: 70   \
            , 121: 20
        }
    }
    , 'PC1': {
        'descricao': 'Pão de cará'      \
        , 'temperatura': {
            80: 85      \
            , 120: 42   \
            , 121: 18
        }
    }
    , 'BO1': {
        'descricao': 'Bolo'             \
        , 'temperatura': {
            80: 90      \
            , 120: 60   \
            , 121: 30
        }
    }
}

def __validar(valor, *args):
    flag = False

    if 1 <= len(args) < 2:
        if valor >= args[0]:
            flag = True
    else:
        if args[0] <= valor <= args[1]:
            flag = True

    return flag

def __validar_ano(ano, validar):
    '''
    Válida o ano, verificando se este não é negativo
    '''
    if __validar(ano, 0):
        validar.append('ano_entrada')

    return validar

def __validar_mes(mes, validar):
    '''
    Válida o mês, verificando se este esta entre 1 e 12
    '''
    if 'ano_entrada' in validar:
        if __validar(mes, 1, 12):
            validar.append('mes_entrada')

    return validar

def __validar_dia(dia, dia_limite, validar):
    '''
    Válida o dia, verificando se este esta entre 1 e o dia limite
    '''
    if __validar(dia, 1, dia_limite):
        validar.append('dia_entrada')

    return validar

def __definir_dia_limite(mes, ano, validar):
    '''
    Define o último dia do mês
    '''
    mes_trinta_dias = [4, 6, 9, 11]
    dia_limite = 0

    if 'mes_entrada' in validar:
        if mes == 2:
            if (ano % 4) == 0:
                dia_limite = 29
            else:
                dia_limite = 28
        elif mes in mes_trinta_dias:
            dia_limite = 30
        else:
            dia_limite = 31

    return dia_limite

def __validar_hora(hora, validar):
    '''
    Válida a hora, verificando se este esta entre 0 e 23
    '''
    if __validar(hora, 0, 23):
        validar.append('hora_entrada')

    return validar

def __validar_minuto(minuto, validar):
    '''
    Válida o minuto, verificando se este esta entre 0 e 59
    '''
    if __validar(minuto, 0, 59):
        validar.append('minuto_entrada')

    return validar

def __validar_temperatura(temperatura, validar):
    '''
    válida a temperatura, verificando se esta é superior a 1
    '''
    if __validar(temperatura, 1):
        validar.append('temperatura_entrada')

    return validar

def __obter_tempo_saida(dic_temperatura, temperatura):
    '''
    '''
    if temperatura <= 80:
        temperatura = 80
    elif temperatura <= 120:
        temperatura = 120
    else:
        temperatura = 121

    return dic_temperatura.get(temperatura)

def __calcular_timestamp_retirada(**kwargs):
    dia_limite = kwargs.get('dia_limite')
    dia_saida = kwargs.get('dia')
    mes_saida = kwargs.get('mes')
    ano_saida = kwargs.get('ano')
    hora_saida = kwargs.get('hora')
    minuto_saida = kwargs.get('minuto')
    minuto_preparo = kwargs.get('minuto_preparo')
    validar = kwargs.get('validar')

    while minuto_preparo >= 0:
        if minuto_saida > 59:
            minuto_saida = 0
            hora_saida += 1

        if hora_saida > 23:
            hora_saida = 0
            dia_saida += 1

        if dia_saida > dia_limite:
            dia_saida = 1
            mes_saida += 1
            if mes_saida <= 12:
                dia_limite = __definir_dia_limite(mes_saida, ano_saida, validar)

        if mes_saida > 12:
            mes_saida = 1
            ano_saida += 1
            dia_limite = __definir_dia_limite(mes_saida, ano_saida, validar)

        minuto_preparo -= 1
        if minuto_preparo >= 0:
            minuto_saida += 1

    timestamp_saida = datetime(ano_saida, mes_saida, dia_saida,    \
            hora_saida, minuto_saida)
    return {
            'dia_entrada': kwargs.get('dia')            \
            , 'mes_entrada': kwargs.get('mes')          \
            , 'ano_entrada': kwargs.get('ano')          \
            , 'hora_entrada': kwargs.get('hora')        \
            , 'minuto_entrada': kwargs.get('minuto')    \
            , 'dia_saida': dia_saida                    \
            , 'mes_saida': mes_saida                    \
            , 'ano_saida': ano_saida                    \
            , 'hora_saida': hora_saida                  \
            , 'minuto_saida': minuto_saida}

def __definir_tela_retorno(dc_valores):
    '''
    '''
    retorno = ''
    tela = []
    tela.append(u'Código: %(codigo_produto)s\t\t\tDetalhes: %(descricao_produto)s')
    tela.append(u'Entrada do produto no forno\tTemperatura: %(temperatura)d°C')
    tela.append(u'Data: %(dia_entrada)02d/%(mes_entrada)02d/%(ano_entrada)04d')
    tela.append(u'Hora: %(hora_entrada)02d:%(minuto_entrada)02d')
    tela.append(u'Saida do produto no forno')
    tela.append(u'Data: %(dia_saida)02d/%(mes_saida)02d/%(ano_saida)04d')
    tela.append(u'Hora: %(hora_saida)02d:%(minuto_saida)02d')

    retorno = '\n'.join(tela)
    retorno = retorno % dc_valores

    return retorno

def obter_data_hora_retirada(**kwargs):
    '''
    Obtem a data e hora de retirada da fornada a partir dos detalhes do
    produto
    '''
    timestamp_hoje = datetime.today()
    timestamp_entrada = datetime.today()

    validar = []
    detalhes_fornada = {}

    codigo_produto = kwargs.get('codigo', 'BR1')
    detalhes_produto = PRODUTO.get(codigo_produto)
    descricao_produto = detalhes_produto.get('descricao')
    temperatura_produto = detalhes_produto.get('temperatura')

    temperatura_entrada = kwargs.get('temperatura', 80)

    dia_entrada = kwargs.get('dia', timestamp_hoje.day)
    mes_entrada = kwargs.get('mes', timestamp_hoje.month)
    ano_entrada = kwargs.get('ano', timestamp_hoje.year)

    hora_entrada = kwargs.get('hora', timestamp_hoje.hour)
    minuto_entrada = kwargs.get('minuto', timestamp_hoje.minute)

    minuto_saida = 0

    dia_limite = 0

    #validar ano
    validar = __validar_ano(ano_entrada, validar)

    #validar mês
    validar = __validar_mes(mes_entrada, validar)

    #calcular dia limite
    dia_limite = __definir_dia_limite(mes_entrada, ano_entrada, validar)

    #validar dia
    validar = __validar_dia(dia_entrada, dia_limite, validar)

    #validar hora
    validar = __validar_hora(hora_entrada, validar)

    #validar minuto
    validar = __validar_minuto(minuto_entrada, validar)

    #validar temperatura
    validar = __validar_temperatura(temperatura_entrada, validar)

    timestamp_entrada = datetime(ano_entrada, mes_entrada, dia_entrada,\
            hora_entrada, minuto_entrada)

    minuto_saida = __obter_tempo_saida(temperatura_produto, temperatura_entrada)

    detalhes_fornada = __calcular_timestamp_retirada(dia_limite = dia_limite    \
            , dia = dia_entrada             \
            , mes = mes_entrada             \
            , ano = ano_entrada             \
            , hora = hora_entrada           \
            , minuto = minuto_entrada       \
            , minuto_preparo = minuto_saida \
            , validar = validar)

    detalhes_fornada.setdefault('codigo_produto', codigo_produto)
    detalhes_fornada.setdefault('descricao_produto', descricao_produto)
    detalhes_fornada.setdefault('temperatura', temperatura_entrada)

    return __definir_tela_retorno(detalhes_fornada)

if __name__ == '__main__':
    validar = []
    msg_numero_invalido = u'Digite um número para %s'

    codigo_produto = ''
    novo_produto = 'sim'
    dia = mes = ano = hora = minuto = temperatura = dia_limite = -1

    while novo_produto == 'sim':
        while not PRODUTO.has_key(codigo_produto):
            codigo_produto = str(input(u'Codigo do produto: '))

        while 'temperatura_entrada' not in validar:
            try:
                temperatura = int(input(u'Temperatura de preparo: '))
                validar = __validar_temperatura(temperatura, validar)
            except ValueError:
                print msg_numero_invalido % 'a temperatura'
                continue

        while 'ano_entrada' not in validar          \
                and 'mes_entrada' not in validar    \
                and 'dia_entrada' not in validar:
            try:
                dia = int(input('Dia da entrada: '))
                mes = int(input(u'Mes da entrada: '))
                ano = int(input('Ano da entrada: '))

                validar = __validar_ano(ano, validar)
                validar = __validar_mes(mes, validar)
                dia_limite = __definir_dia_limite(mes, ano, validar)
                validar = __validar_dia(dia, dia_limite, validar)
            except ValueError:
                print msg_numero_invalido % 'a data'
                continue

        while 'hora_entrada' not in validar \
                and 'minuto_entrada' not in validar:
            try:
                hora = int(input(u'Hora de entrada: '))
                minuto = int(input(u'Minuto de entrada: '))

                validar = __validar_hora(hora, validar)
                validar = __validar_minuto(minuto, validar)
            except ValueError:
                print msg_numero_invalido % u'o horário'
                continue

        print obter_data_hora_retirada(codigo = codigo_produto  \
                , temperatura = temperatura \
                , dia = dia                 \
                , mes = mes                 \
                , ano = ano                 \
                , hora = hora               \
                , minuto = minuto)

        codigo_produto = ''
        validar = []
        novo_produto = str(input('Novo produto (sim ou nao) '))
