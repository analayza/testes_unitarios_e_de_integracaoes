# Projeto Aeroporto e Aviões

Aula de teste de software com NodeJs/Typescript e cobertura de código

## Iniciando Projeto e Instalando dependências do zero

Iniciando projeto
```bash
npm init -y
```

Instalando Typescript
```bash
npm install -D typescript @types/node
```

Iniciando Typescript
```bash
npx tsc --init
```

Instalando dependencias de Testes
```bash
npm install --save-dev @types/jest @types/mocha jest ts-jest
```

## Configuração de Testes

Crie o arquivo *jest.config.ts* preencha com:
```node
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts'],
    collectCoverage: true,
    coverageProvider: "v8",
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/index.ts',
        '!src/**/*.d.ts'
    ],
    setupFiles: [
        "dotenv/config"
    ],
};
```
Esta é a configuração usada no projeto atual

### Executando testes

Testes unitários
```bash
npm run test:unit
```

Testes Integração
```bash
npm run test:integration
```

Verificar cobertura
```bash
npm run test:coverage
```
Executar todos os testes
```bash
npm test
```

### Explicando coverage

Conforme a [Istanbul (nyc)](https://github.com/istanbuljs/nyc)

```
File    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
```

#### Stmts (Statements):

- Porcentagem de declarações/instruções executadas pelos testes.

- Exemplo: Se um arquivo tem 10 linhas de código e os testes executam 8, a cobertura é 80%.

#### Branch

- Porcentagem de ramificações (como if/else, switch) testadas.

- Exemplo: Um if tem dois caminhos (verdadeiro/falso). Se os testes cobrirem ambos, a cobertura é 100%.

#### Funcs (Functions)

- Porcentagem de funções/métodos chamados pelos testes.

- Exemplo: Se um arquivo tem 5 funções e os testes chamam 4, a cobertura é 80%.

#### Lines

- Porcentagem de linhas de código executadas (similar a Stmts, mas pode variar dependendo da ferramenta).

- Geralmente muito próxima de Stmts.

#### Uncovered

- Lista as linhas não cobertas pelos testes (ex: 10-12, 15 indica que essas linhas nunca foram executadas).


### Melhor cenário de cobertura é 100% (Perfeito)
### Cenário aceitavel de cobertura é 80% (WIP)