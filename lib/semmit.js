const inquirer = require('inquirer');
const { exec } = require('child_process');

const handleError = (error) => {
    console.error('Error', error);
}

const runCommand = (message) => {
    exec(`git commit -m ${message}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.info(`${stdout}`);
        console.error(`${stderr}`);
    })
}

const start = async () => {
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
            validate: (input) => input !== ''
        }
    ]

    const answers = await inquirer
        .prompt(questions)
        .catch(handleError);

    const scope = answers.scope !== '' ? `(${answers.scope})` : '';
    const message = `"${answers.type}:${scope} ${answers.message}"`;

    const answersResult = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'runCommand',
            message: `This is your message: ${message}. Do you want to run git commit command?`,
            default: true
        }
    ])

    if (answersResult.runCommand) {
        console.info(`Runnig git commit command...`)
        runCommand(message);
    } else {
        console.info('Here is your commit message:');
        console.info(`git commit -m ${message}`)
    }
}

exports.start = start;