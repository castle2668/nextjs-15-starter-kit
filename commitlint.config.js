module.exports = {
  // 標題格式檢查
  parserPreset: {
    parserOpts: {
      // 檢查格式為：
      // 一般變更：Type(Scope): Subject
      // 重大變更：Type(Scope)!: Subject
      headerPattern: /^([A-Z]\w*)(?:\(([A-Z]\w*)\))(?:!)?:\s(.+)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
  // 主要規則
  rules: {
    'header-max-length': [2, 'always', 100],
    // Type 必須大寫開頭
    'type-case': [2, 'always', 'pascal-case'],
    'type-empty': [2, 'never'],
    // Type 必須是這些字：Feat, Fix, Docs 等
    'type-enum': [
      2,
      'always',
      ['Feat', 'Fix', 'Docs', 'Style', 'Refactor', 'Test', 'Chore'],
    ],
    // Scope 必須大寫開頭
    'scope-case': [2, 'always', 'pascal-case'],
    'subject-case': [2, 'always', 'sentence-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'body-leading-blank': [2, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [2, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    // Body 格式檢查
    'body-format': [
      2,
      'always',
      {
        pattern: /^[0-9]+\. .+\.$/,
      },
    ],
    // Footer 格式檢查
    'footer-format': [
      2,
      'always',
      {
        pattern: /^(BREAKING CHANGE: )?.+\.$/,
      },
    ],
  },
}

// Example:
// Feat(User)!: Add login function

// 1. Add password validation.
// 2. Create JWT token.

// BREAKING CHANGE: Change auth method to JWT.
