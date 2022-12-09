const websitelist = {
    "eurogamer": ["https://www.eurogamer.net/genshin-impact-codes-livestream-active-working-how-to-redeem-9026", "#content_above > div.page_content > article > div > div > ul:nth-child(13)"],
    "pocketactics": ["https://www.pockettactics.com/genshin-impact/codes", "#site_wrap > article > div.entry-content > ul:nth-child(10)"]
}
const request = require("request-promise");
const cheerio = require("cheerio");
const { getRandom } = require('random-useragent');

exports.genshin = async function (req, res) {
    const webaparam = req.query.web.toString().toLocaleLowerCase()
    if (!websitelist[webaparam]) return res.status(404).send({ message: `Specified web didn't found got ${req.query.web || "Nothing"}` });
    var genshin = websitelist[webaparam][0];
    if (genshin) {
        const result = await request({
            url: genshin,
            headers: {
                'User-Agent': getRandom()
            }
        });
        const $ = cheerio.load(result);

        $(websitelist[webaparam][1]).each((index, element) => {
            const data = $($(element)).text().toString().trim().trimEnd().split(/:|\n|^$/)
            switch (webaparam) {
                case "eurogamer":
                    let codelist = data.map(el => el.trim()).reduce((res, val, i) => {
                        if (i % 2 !== 0)
                            res.push(`${data[--i]
                                }_${val}`);

                        return res;
                    }, []);
                    res.send({
                        data: {
                            code: codelist,
                            developer: "Gamersindo1223",
                            hostedin: "Cyclic",
                            Website: {
                                name: req.query.web,
                                url: genshin
                            }
                        }
                    })
                    break;
                case "pocketactics":
                    res.send({
                        data: {
                            code: data,
                            developer: "Gamersindo1223",
                            hostedin: "Cyclic",
                            Website: {
                                name: req.query.web,
                                url: genshin
                            }
                        }
                    })
                    break;
            }


        });
    }

};