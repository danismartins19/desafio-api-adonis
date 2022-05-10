# API ADONIS ( Alunos, Professores, Salas )

## Essa API foi feita utilizando Adonis.JS 5, Typescript, e SQLite

### Depois de clonar esse repositório, execute em seu terminal para instalar todas as dependências do projeto:

`npm install` ou `yarn`

<br>

## Executar migrations

### Como esse projeto está usando o banco de dados SQLite, não será necessário a instalação e configuração de um banco de dados local. Somente será necessário que voce execute o script para criar as migrations:

`node ace migration:run`

<hr>

### Depois de executar as migrations o projeto estará pronto para ser executado: 

<hr>

## SGBD para SQLite

### Caso queira visualizar os dados do banco de dados que serão gravados com o tempo, recomendo que instale o [Beekeeper](https://www.beekeeperstudio.io/) que é um SGDB open-source e gratuito para ser utilizado.
### Por padrão, o arquivo do banco de dados ficará em:<br>

`/tmp/db.sqlite3`

<hr>

## Para rodar a aplicação:
`npm run dev`

<hr>
<br>
<br>

## Rotas da Aplicação
<hr>

### Voce poderá encontrar um arquivo de configuração de rotas exportado do Insomnia, localizado na raiz do projeto, chamado de `Insomnia_Routes`

<hr>

## Alunos

POST - BASE/aluno/ --  BODY/JSON {"matricula" : number,
	"nome" : string,
	"email" : string,
	"data_nasc" : string DD/MM/YYYY}

GET - BASE/aluno/{matricula}

PUT - BASE/aluno/{matricula}  --  BODY/JSON {
	"nome" : string,
	"email" : string,
	"data_nasc" : string DD/MM/YYYY}

DELETE - BASE/aluno/{matricula}

GET - BASE/aluno/{matricula}/listarSalas - Retornará as salas em que o aluno está

<hr>

## Professor

POST - BASE/professor/ --  BODY/JSON {"matricula" : number,
	"nome" : string,
	"email" : string,
	"data_nasc" : string DD/MM/YYYY}

GET - BASE/professor/{matricula}

PUT - BASE/professor/{matricula}  --  BODY/JSON {
	"nome" : string,
	"email" : string,
	"data_nasc" : string DD/MM/YYYY}

DELETE - BASE/professor/{matricula}

<hr>

## Sala

POST - BASE/sala/ -- BODY/JSON {"numero": number, "capacidade": number, "disponivel": boolean, "professor": matriculaProfessor}

GET - BASE/sala/{numero}

PUT - BASE/sala/{numero} -- BODY/JSON { "capacidade": number, "disponivel": boolean}

DELETE - BASE/sala/{numero}

GET - BASE/sala/{numero}/verAlunos - Retornará todos os alunos da sala

POST - BASE/sala/{numero}/addAluno/{matricula} -- BODY/JSON {"professor": matriculaProfessor} - Para adicionar um aluno a sala

DELETE - BASE/sala/{numero}/delAluno/{matricula} - Para remover um aluno da sala
