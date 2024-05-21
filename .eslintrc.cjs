module.exports = {
    root: true,
    env: { browser: true, es2020: true },

    // 커스텀 설정하지 않은 기타 권장 규칙들은 아래 문서에서 확인
    // https://eslint.org/docs/latest/rules/
    // https://typescript-eslint.io/rules/

    // ESLint의 기본 권장 규칙을 적용, TypeScript 권장 기본 규칙 적용, React Hooks의 권장 규칙 적용
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
    // dist 디렉토리와 .eslintrc.cjs 파일을 ESLint 검사에서 제외
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    // TypeScript 구문 분석기를 사용
    parser: '@typescript-eslint/parser',
    // 추가적인 ESLint 플러그인들을 설
    plugins: ['react-refresh', 'import', 'prefer-arrow'],
    // 특정 규칙 설정
    rules: {
        // React 컴포넌트만 export하도록 경고
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        // 타입 임포트를 일관되게 사용하도록 강제
        '@typescript-eslint/consistent-type-imports': 'error',
        // 함수 반환 타입을 명시하도록 강제
        '@typescript-eslint/explicit-function-return-type': 'error',
        // 네이밍의 일관성을 위한 규칙을 설정
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: [
                    'variableLike',
                    'classProperty',
                    'objectLiteralProperty',
                    'typeProperty',
                    'classMethod',
                    'objectLiteralMethod',
                    'typeMethod',
                    'accessor',
                ],
                format: ['camelCase'],
                leadingUnderscore: 'allow',
            },
            {
                selector: ['variable'],
                types: ['function'],
                format: ['camelCase', 'PascalCase'],
                leadingUnderscore: 'allow',
            },
            { selector: ['variable'], modifiers: ['global'], format: ['camelCase', 'PascalCase', 'UPPER_CASE'] },
            {
                selector: [
                    'classProperty',
                    'objectLiteralProperty',
                    'typeProperty',
                    'classMethod',
                    'objectLiteralMethod',
                    'typeMethod',
                    'accessor',
                    'enumMember',
                ],
                format: null,
                modifiers: ['requiresQuotes'],
            },
        ],
        // 현재 코드 베이스에 any를 사용하는 곳이 많기 때문에 추후에 활성화 -> 처럼 미리 규칙을 세팅하고, off 시켜도 가능
        '@typescript-eslint/no-explicit-any': 'off',
        // 외부 라이브러리에 전달되는 함수의 매개변수의 경우에 사용하지 않더라도 선언해야하는 경우에 불편함을 피하기 위해 비활성화
        '@typescript-eslint/no-unused-vars': 'off',
    },
};
