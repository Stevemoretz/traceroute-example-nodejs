const { exec } = require('child_process')

module.exports.exec = (command,callback,onExit) => {
    const process = exec(command)

    let result = '';

    process.stdout.on('data', callback)

    process.stderr.on('data', (data) => {
        console.log('stderr: ' + data.toString())
    })

    process.on('exit',onExit)
}
