const fs = require('fs');

const migrateName = process.argv[2];

if (!migrateName) {
    console.error('Por favor, forneça um nome de arquivo como argumento.');
    process.exit(1);
}

const dataActualMilliseconds = Date.now();

const fileName = `./src/database/migrations/${dataActualMilliseconds}_${migrateName.toLowerCase()}.ts`;

const conteudo = `export class ${migrateName} {

    private static fileName = "${dataActualMilliseconds}_${migrateName.toLowerCase()}";

    static handle() {

    }

    static getFileName() {

        return this.fileName;

    }
}
`;


fs.writeFile(fileName, conteudo, (err) => {
    if (err) {
        console.error('Ocorreu um erro ao criar o arquivo:', err);
        return;
    }
    console.log(`O arquivo '${fileName}' foi criado com sucesso.`);
});