const {exec} = require('./utilities.js')
var geoip = require('geoip-lite');

let result = ``;

const parseOutput = () => {
    console.log('Parsing the result...');
    const regex = /.*\[(.*?)\].*/gm;
    result.split("\n").filter((item) => regex.test(item)).map((item) => {
        var ip = item.replace(regex, '$1');
        var lookup = geoip.lookup(ip);
        let string = '(' + ip + ') : ';
        if (lookup) {
            string += lookup.timezone;
        } else {
            string += "Unknown";
        }
        string += "\n";
        process.stdout.write(string);
    });
}

exec('tracert www.google.com', (data) => {
    result += data.toString();
    process.stdout.write(data);
}, () => {
    parseOutput();
});