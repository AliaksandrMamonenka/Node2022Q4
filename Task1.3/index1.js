process.stdin.on('data', (data) => process.stdout.write([...data.toString()].reverse().join('')));
