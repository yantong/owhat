const fs = require('fs')
const ids = require('./ids.json')
const axios = require('axios')

let sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    })
};

let fun = (id) => {
    let time = new Date().getTime();
    let url = `https://appo4.owhat.cn/api?signx=ec41632239a75a833cb218c66bbd282a&client=%7B%22platform%22%3A%22mobile%22%2C%22version%22%3A%221.6.50L%22%2C%22deviceid%22%3A%224d5b1e6c-6134-3e92-1660-0b33af292fba%22%2C%22channel%22%3A%22owhat%22%2C%22deviceIdmd5%22%3A%229b5b1e982099b77d665b7430395310c3%22%2C%22deviceIdmd5salt%22%3A%22291dbc712066477f47b1fdadb17dab50%22%2C%22timesalt%22%3A1605408721265%2C%22client_id%22%3A3%7D&v=1.6.50L&cmd_s=userindex&cmd_m=personalhomepage&data=%7B%22userid%22%3A%22${id}%22%7D&client_id=3&version=1.6.50&client_timestamp=${time}`

    return axios.get(url).then((res) => {
        let data = res.data;

        if (data && data.data) {
            fs.appendFileSync('manInfo.json', JSON.stringify({ ...data.data, sharedto: undefined }) + ',');
        }
    });
};

fs.readFile('idIndex.txt', 'utf8', (err, data) => {
    if (err) throw err;
    let index = +data;

    (async () => {
        for (; index < ids.length; index++) {
            try {
                await fun(ids[index])
                fs.writeFileSync('idIndex.txt', (index + 1) + '')
                await sleep(200)
                console.log('index = ', index);
            } catch (error) {
                console.log('error == ', error);

                return
            }
        }
    })()

});
