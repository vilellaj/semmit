const inquirer = require('inquirer');

(async () => {
    const questions = [
        {
            type: 'list',
            name: 'type',
            message: 'What\'s the type of this commit?',
            choices: ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore'],
        },
        {
            name: 'scope',
            message: 'What\'s the scope of this commit? (optional)',
            default: ''
        },
        {
            name: 'message',
            message: 'What\'s the message of this commit',
            default: 'Commit message'
        },
    ]

    const answers = await inquirer
        .prompt(questions)
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                console.error('Error:', error);
            }
        });

    const message = `"${answers.type}:(${answers.scope}) ${answers.message}"`;

    const answersResult = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'runCommand',
            message: `This is your message: ${message}. Do you want to run git commit command?`,
            default: true
        },
    ])

    if(answersResult.runCommand) {
        console.info(`Runnig git commit -m `)
    } else {
        console.info(`git commit -m ${message}`)
    }
})();