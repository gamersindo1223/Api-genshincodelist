const request = require("request-promise");
const cheerio = require("cheerio");
const path = require("path");
const {getRandom} = require('random-useragent');
async function main() {
    let options = {
        url: 'https://www.pockettactics.com/genshin-impact/codes',
        headers: {
            'User-Agent': getRandom()
        }
    };
    const result = await request(options);
    const $ = cheerio.load(result);
    $("#site_wrap > article > div.entry-content > ul:nth-child(10)").each((index, element) => {
        const data = $($(element)).text().toString().trim().trimEnd().split(/:|\n|^$/)
        let codelist = data.map(el => el.trim()).reduce((res, val, i) => {
            if (i % 2 !== 0) 
                res.push(`${
                    data[-- i]
                }_${val}`);
            
            return res;
        }, []);
    });
}
main();
