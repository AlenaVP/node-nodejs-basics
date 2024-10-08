const parseArgs = () => {
    const args = process.argv.slice(2);
    const formattedArgs = [];
    for (let i = 0; i < args.length; i+=2) {
        const propName = args[i].replace('--', '');
        const propValue = args[i + 1];
        formattedArgs.push(`${propName} is ${propValue}`);
    }
    console.log(formattedArgs.join(', '));
};

parseArgs();