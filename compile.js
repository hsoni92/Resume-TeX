const spawn = require('child_process').spawn;
const pdflatex = spawn('pdflatex', ['-output-directory', './', 'resume.tex']);

// Capture stdout (standard output)
pdflatex.stdout.on('data', (data) => {
    console.log('stdout: ' + data.toString());
});

// Capture stderr (standard error)
pdflatex.stderr.on('data', (data) => {
    console.error('stderr: ' + data.toString());
});

// Handle exit event
pdflatex.on('exit', function (code) {
    console.log('Child process exited with code ' + code);
});

// Handle errors during process spawning
pdflatex.on('error', (err) => {
    console.error('Failed to start subprocess:', err);
});
