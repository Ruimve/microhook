module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'ci', 'test', 'docs', 'perf', 'chore']
    ]
  }
}