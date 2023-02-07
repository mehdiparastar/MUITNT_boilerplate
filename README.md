# MUITNT_boilerplate
MUI-Typescrypt-Nestjs-TypeORM

The recommended extensions for vscode:

❤️ kamikillerto.vscode-colorize
❤️ ms-azuretools.vscode-docker
❤️ mikestead.dotenv
❤️ dsznajder.es7-react-js-snippets
❤️ oderwat.indent-rainbow
❤️ Tyriar.lorem-ipsum
❤️ humao.rest-client
❤️ jock.svg
❤️ rangav.vscode-thunder-client
❤️ vscode-icons-team.vscode-icons
❤️ redhat.vscode-xml
❤️ yzhang.markdown-all-in-one
❤️ foxundermoon.shell-format


**Steps On Ubuntu at running the project:**

⭐ Make sure that you have installed docker and docker compose.

⭐ Inside of the "server" folder you should have as below:

    1) ".development.env" file with the content like as below:

        DB_NAME=dev_db
        COOKIE_KEY=mehdiparastar_dev
        MYSQL_DEV_USER=admin
        MYSQL_DEV_PASSWORD=admin
        JWT_ACCESS_SECRET=JWT_ACCESS_SECRET_DEV
        JWT_REFRESH_SECRET=JWT_REFRESH_SECRET_DEV
        OAUTH_GOOGLE_ID=572561624813-vqsgnhjlqeuo86mtl7jjd85cruhrsr13.apps.googleusercontent.com
        OAUTH_GOOGLE_SECRET=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
        OAUTH_GOOGLE_REDIRECT_URL=http://localhost:3001/auth/google/callback
        DONT_CLEAN_THIS_LINE=SHOULD_BE_LAST


    2) ".test.env" file with the content like as below:

        DB_NAME=test_db
        COOKIE_KEY=mehdiparastar_test
        MYSQL_TEST_USER=admin
        MYSQL_TEST_PASSWORD=admin
        JWT_ACCESS_SECRET=JWT_ACCESS_SECRET_TEST
        JWT_REFRESH_SECRET=JWT_REFRESH_SECRET_TEST
        OAUTH_GOOGLE_ID=572561624813-vqsgnhjlqeuo86mtl7jjd85cruhrsr13.apps.googleusercontent.com
        OAUTH_GOOGLE_SECRET=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
        OAUTH_GOOGLE_REDIRECT_URL=http://localhost:3001/auth/google/callback
        DONT_CLEAN_THIS_LINE=SHOULD_BE_LAST


    3) ".production.env" file with the content like as below:

        (in progress ...)



⭐ In the root directory of project run commands as below:

    For dev:
        $ sh RestartApp.linux.dev.sh
    
    For deploy: (in progress ...)
        $ sh RestartApp.linux.prod.sh

        
