module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts'],
    collectCoverage: true,                  // Ativa a coleta de cobertura
    coverageProvider: "v8",                 // Motor do JS/Chrome/Node
    coverageDirectory: 'coverage',          // Pasta onde os relatórios serão gerados
    coverageReporters: ['text', 'lcov'],    // Formatos de saída (texto no terminal e LCOV para HTML), existem outras opções "json-summary", "clover"
    collectCoverageFrom: [                  // Quais arquivos incluir na análise
        'src/**/*.ts',
        '!src/**/Validation.ts',                      // Excluir arquivos não relevantes
        '!src/index.ts',                      // Excluir arquivos não relevantes
        '!src/**/*.d.ts'                      // Excluir tipos TypeScript
    ],
    //setupFiles: [
        //"dotenv/config"
    //],
};