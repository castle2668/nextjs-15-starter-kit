# Next.js 15 Starter Kit

_This is my preferred version, you may also have other technical options_.

Welcome to the Next.js 15 Starter Kit repository! This starter template integrates Next.js 15, React 18, Material UI v6, and TypeScript 5, providing essential tools and configurations for rapid development.

## 🚀 What's Included

- Next.js 15
- React 18 (Will upgrade to React 19 when stable)
- Material UI v6
- Tailwind CSS
- TypeScript 5
- Redux Toolkit
- ESLint 8 (Will upgrade to ESLint 9 when React 19 is stable)
- Prettier 3
- Light & Dark Mode
- Next.js Bundle Analyzer
- Git Hooks (Husky + lint-staged + commitlint)

## 🛠️ ESLint Plugins

- [@prettier/eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)

## ✨ Prettier Plugins

- [@trivago/prettier-plugin-sort-imports](https://github.com/trivago/prettier-plugin-sort-imports)

## VS Code Extensions (Recommended)

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
- [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)

## 🏁 Getting Started

### Prerequisites

- Node.js: Version 18.20.5 or higher

### Installation

1. Clone the Repository
2. Install Dependencies

   ```bash
   npm install
   ```

3. Run Development Server

   ```bash
   npm run dev
   ```

4. Build for Production

   ```bash
   npm run dev          # Development environment
   npm run build        # Build project
   npm run start        # Production environment
   npm run lint         # Code linting
   npm run format       # Code formatting
   ```

## 🐳 Environment Setup

1. Copy `.env.example` to `.env`

   ```bash
   cp .env.example .env
   ```

2. Modify the configurations in `.env` according to your needs

## 🛞 Automation Tools

Project code quality is enforced using:

- [Husky](https://typicode.github.io/husky/): Executes scripts automatically during Git commits
- [lint-staged](https://github.com/okonet/lint-staged): Runs checks only on staged files
- [commitlint](https://commitlint.js.org/): Ensures commit messages follow Conventional Commits specification

### Automated Checks on Commit

- Code Files (.js/.ts):
  - ESLint validation
  - Prettier formatting
- Other Files: Prettier formatting

### Commit Message Convention

We recommend following [Conventional Commits](https://www.conventionalcommits.org/) specification, enforced by [commitlint](https://commitlint.js.org/).

Format: `<type>: <description>`

Common types:

| Type     | Purpose               | Example                                |
| -------- | --------------------- | -------------------------------------- |
| feat     | New features          | `feat: add user authentication system` |
| fix      | Bug fixes             | `fix: resolve cart calculation error`  |
| docs     | Documentation         | `docs: update API documentation`       |
| style    | Code style/formatting | `style: apply consistent code style`   |
| refactor | Code refactoring      | `refactor: optimize database queries`  |
| test     | Testing               | `test: add unit tests for auth module` |
| chore    | Maintenance           | `chore: update dependencies`           |
| perf     | Performance           | `perf: improve search performance`     |
| ci       | CI/CD changes         | `ci: configure GitHub Actions`         |
| build    | Build system          | `build: update webpack config`         |

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/castle2668/nextjs-15-starter-kit/blob/main/LICENSE) file for details.
