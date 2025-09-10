//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
    ...tanstackConfig,
    {
        rules: {
            // desliga todas as frescuras de import
            'import/order': 'off',
            'import/first': 'off',
            'import/newline-after-import': 'off',
            'import/no-duplicates': 'off',
            'sort-imports': 'off',
        }
    }
]
