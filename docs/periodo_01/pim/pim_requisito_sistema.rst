Software para Cálculo IMC, RCQ, Índice de conicidade
====================================================

.. _proposito:

Propósito
---------

O software a ser desenvolvido deverá seguir as seguintes orientações:

* Permitir cadastrar uma turma

  + Nome da turma
  + Ciclo da turma
  + Período da turma {1: 'matutino', 2: 'vespertino', 3: 'noturno'}

* Permitir cadastrar uma avaliação de uma turma

  + Quantidade de alunos na turma

* Permitir cadastrar diversas avaliações de um aluno

  + Quantidade de avaliações do aluno

* A respeito do aluno serão cadastrados

  + Nome do aluno
  + Gênero do aluno {1: 'masculino', 2: 'feminino'}
  + Data de nascimento

* A respeito da avaliação serão cadastradas

  + Data da avaliação
  + Massa corporal (kg)
  + Estatura (cm)
  + Circunferência de cintura (cm)
  + Circunferência de quadril (cm)

Serão apresentados para o professor:

* Idade de cada aluno (em anos e em meses)
* IMC de cada aluno (massa corporal (kg) / estatura (m) ^ 2)
* Classificação em percetil do IMC pela idade
* RCQ de cada aluno (circunferência da cintura (cm) / circunferência do quadril (cm))
* Índice de conicidade de cada aluno (verificar formula)
* Classificação do RCQ e Índice de conicidade
* Representação gráfica da massa corporal, estatura e imc pela idade (isso só se fizermos de fato uma versão funcional)

No trabalho é interessante mostrar a ligação entre os assuntos envolvidos no desenvolvimento do aplicativo e as disciplinas que gostaríamos de envolver no processo de ensino (matemática, educação física, saúde).

.. _calculos:

Cálculos
--------

.. _imc:

Índice de Massa Corporal (IMC)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

IMC (kg/m^2): massa corporal (kg) / estatura (m) ^ 2

Classificação
+++++++++++++

**Montar Tabela**

.. _rcq:

Relação Cintura-Quadril (RCQ)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

RCQ: circunferência da cintura (cm) / circunferência do quadril (cm)

Classificação
+++++++++++++

**Montar Tabela**

.. _ic:

Índice de Conicidade
~~~~~~~~~~~~~~~~~~~~

IC: circunferência abdominal (m) / (0,109 * sqrt(massa corporal (kg) / estatura (m)))

.. _refs:

Referêcias bibliográficas
-------------------------

# **Citar material utilizado**