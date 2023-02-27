# react-express-lerna
monorepo project React App / Express

#create new project
- yarn create vite
- cd name_project 
- yarn
- yarn create @eslint/config
- yarn add -D eslint-config-prettier prettier
- add workspace plugins Eslint and Prettier - Code formatter
- add settings.json in .vscode
```json 
{
    "editor.formatOnSave": true,
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
}
```

# Database
>install mysql, create dbname and change name in packages/server/.env
- run command sequelize `npx sequelize-cli db:migrate`

[![Sequelize](assets/project.png)](https://sequelize.org/docs/v6/getting-started/)