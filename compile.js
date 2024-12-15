const spawn = require('child_process').spawn;
const pdflatex = spawn('pdflatex', ['-output-directory', './', 'resume.tex']);

const fs = require('fs').promises;

// Source and destination paths
const sourcePath = './resume.pdf';
const destinationPath = './Himanshu-Soni-Resume.pdf';

// Copy file using async/await
async function copyFile() {
  try {
    await fs.copyFile(sourcePath, destinationPath);
    console.log(`copied named resume as ${destinationPath.replace('./', '')}`);
  } catch (err) {
    console.error('Error copying file:', err);
  }
}

// Capture stdout (standard output)
pdflatex.stdout.on('data', (data) => {
    // enable if verbose is needed
    // console.log('stdout: ' + data.toString());
});

// Capture stderr (standard error)
pdflatex.stderr.on('data', (data) => {
    console.error('stderr: ' + data.toString());
});

// Handle errors during process spawning
pdflatex.on('error', (err) => {
    console.error('Failed to start subprocess:', err);
});

// Handle exit event
pdflatex.on('exit', function (code) {
    if (code === 0) {
        console.log(`successfully generated ${sourcePath.replace('./', '')}`);
        copyFile();
    } else {
        console.log('Child process exited with code ' + code);
    }
});
