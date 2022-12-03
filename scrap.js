const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const filepaths = path.join(__dirname + "/tmp/codes.txt")
let options = {
    url: 'https://www.eurogamer.net/genshin-impact-codes-livestream-active-working-how-to-redeem-9026',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
    }
};
if (fs.existsSync(filepaths) === false) {
    fs.writeFile(filepaths, "", function (err) {
        if (err) throw new Error(err)
        return console.log("The codes list was made")
    })
}

if (!fs.existsSync('./tmp')) {
    fs.mkdirSync("./tmp");
}
async function main() {
    const result = await request(options);
    const $ = cheerio.load(result);
    
    $("#content_above > div.page_content > article > div > div > ul:nth-child(13)").each((index, element) => {
        const data = $($(element)).text().toString().trim().trimEnd().split(/:|\n|^$/g)
        setTimeout(() => {
            var file = fs.createWriteStream(filepaths);
            file.on('error', function (err) { /* error handling */ });
            data.forEach(function (files) {
                const removespace = files.toString().trim().trimEnd().replaceAll(/^\s+/g, function (match) {
                    return ``.repeat(match.length)
                })
                file.write(removespace + '\n');
            });
            file.end();
        }, 2000);

    });
}
setInterval(() => {
    main();
}, 30000);