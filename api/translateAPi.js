import md5 from 'md5';

const appid = "20231006001838120";
const secretKey = "9EWBBvcZxtsjOeONc_gs";

export const translateApi = async (q, from = "auto", to = "en") => {
    // 随机数
    const salt = Date.now();
    // 签名
    let sign = md5(`${appid}${q}${salt}${secretKey}`); // md5 将内容加密
    const url = `http://api.fanyi.baidu.com/api/trans/vip/translate?q=${q}&from=${from}&to=${to}&appid=${appid}&salt=${salt}&sign=${sign}`;
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
            .then((res) => {
                if (res.trans_result.length) {
                    resolve(res.trans_result[0].dst);
                } else {
                    reject("翻译有误");
                }
            });
    })
}