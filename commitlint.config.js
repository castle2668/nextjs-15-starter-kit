module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Header 規則
    'type-enum': [
      2, // 強制錯誤等級
      'always',
      [
        'Build',
        'Chore',
        'CI',
        'Deprecate',
        'Docs',
        'Feat',
        'Fix',
        'Perf',
        'Refactor',
        'Release',
        'Test',
        'Revert',
        'Style',
      ],
    ],
    'type-case': [2, 'never'],
    'scope-enum': [
      2,
      'always',
      [
        'API',
        'Config',
        'Framework',
        'Function',
        'Git',
        'Infra',
        'Lang',
        'Module',
        'Theme',
        'Vendor',
        'Views',
      ],
    ],
    'scope-case': [2, 'never'],
    'subject-case': [2, 'always', ['sentence-case']],
    'subject-empty': [2, 'never'], // Subject 不得為空
    'header-max-length': [2, 'always', 72], // Header 最長 72 字元
    // Body 規則
    'body-leading-blank': [2, 'always'], // Body 前需空一行
    'body-full-stop': [2, 'always', '.'], // 每行條列式以「.」結尾
    'custom-body-line-format': [2, 'always'], // Local Plugins: 每行條列式以數字開頭，結尾以 "." 並符合格式 "1. xxxx."
    // Footer 規則
    'footer-leading-blank': [2, 'always'], // Footer 前需空一行
    'footer-max-line-length': [2, 'always', 100], // Footer 最長 100 字元
    'breaking-change': [2, 'always'], // Local Plugins: 重大變更的 Header 中必須包含驚嘆號 "!"
  },
  plugins: [
    {
      rules: {
        'custom-body-line-format': parsed => {
          // 檢查 Body 條列式格式，只有在 Body 存在時才檢查
          if (parsed.body) {
            // 檢查每行是否符合條列式格式
            const lines = parsed.body
              .split('\n')
              .filter(line => line.trim() !== '')
            const bodyLineRegex = /^\d+\.\s.*\.$/
            return lines.every(line => bodyLineRegex.test(line))
              ? [true]
              : [
                  false,
                  '每行條列式應以數字開頭，結尾以 "." 並符合格式 "1. xxxx."',
                ]
          }
          // Body 為空時不做任何處理
          return [true]
        },
        'breaking-change': parsed => {
          const { header, footer } = parsed
          const hasBreakingChange = /BREAKING CHANGE:/.test(footer) // Footer 中包含 BREAKING CHANGE:
          const hasExclamation = /!:\s/.test(header) // Header 中包含 !
          if (hasBreakingChange && !hasExclamation) {
            return [false, '重大變更的 Header 中必須包含驚嘆號 "!".']
          }
          if (!hasBreakingChange && hasExclamation) {
            return [false, '只有在重大變更時才應使用驚嘆號 "!".']
          }
          return [true]
        },
      },
    },
  ],
}
