# Tecnologias Utilizadas

| Tecnologias Utilizadas |
|------------------------|
| Node                   |
| Express                |
| Sequelize              |
| JavaScript             |
| Bootstrap              |
| HandleBars             |

###### OBS (O banco de dados utilizado no projeto foi o postgress sql, caso queira mudar veja a documentação do sequelize e modifique os arquivos necessarios.)


#### Instalação
# OBS( Certifique-se de executar os comandos no diretório do projeto )
Execute no console
```
npm install
```
para que seja instalado todos os modulos necessários do projeto

Após , configure o acesso do database no diretório  /config/dbConnection.js. linhas 3 a 13.
```
const db_name = 'Nome do database'
const user = ''
const passw = ''
const ip = 'seu ip de acesso' EX( '127.0.0.1' )
global.sequelize = new Sequelize(db_name, user, passw, {
    host: ip,
    dialect: 'postgres', //Tipo do Database , verifique na documentação do sequelize
    define: {
        freezeTableName: true 
    }
});
```


Caso seja a primeira vez executando o servidor descomente as linhas 170 a 202 do arquivo /config/dbConnection.js, após executar a main, comente-as novamente, caso não comente as tabelas elas serão recriadas em todas as execuções.

Execute a main até que o erro pare de ocorrer (OBS: normalmente executamos 3x pois não corrigimos um erro que ocorre apenas na associação das tabelas :> ).

#### Configuração bootstrap
Execute no console, pois o bootstrap será instalado diretamente na máquina local e para isso os arquivos precisam ser compilados com o sass .
##### instalando
```
npm install sass
```
##### compilando com sass
```
sass --watch node_modules/bootstrap/scss:node_modules/bootstrap/compiler
```

Os prototipos e modelagem do banco de dados estão no diretório /Modelos e Prototipos