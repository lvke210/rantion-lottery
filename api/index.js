const url = "http://47.107.254.110:28088/";
// 获取部门
export async function getDepartment() {
    const xurl = `${url}/api/lottery/department`;
    let requestOptions = {
        method: "GET",
        redirect: "follow",
    };
    return await fetchData(xurl, requestOptions);
}
//获取验证码
export async function getCode(phone) {
    const raw = {
        phone,
    };
    const xurl = `${url}/api/lottery/digits`;
    let requestOptions = {
        method: "POST",
        body: JSON.stringify(raw),
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
    };
    return await fetchData(xurl, requestOptions);
}

// 点击签到
export async function signIn(info) {
    const xurl = `${url}/api/lottery/signIn`;
    let requestOptions = {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
    };
    return await fetchData(xurl, requestOptions);
}
//员工信息
export async function getSignList() {
    const xurl = `${url}/api/lottery/employee?limit=1000`; //&signed=1   已签到的人
    let requestOptions = {
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
    };
    return await fetchData(xurl, requestOptions);
}

//奖项信息
export async function getPrize() {
    const xurl = `${url}/api/lottery/prize?`;
    let requestOptions = {
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
    };
    return await fetchData(xurl, requestOptions);
}
//奖品信息
export async function getGift(id) {
    const xurl = `${url}/api/lottery/gift?id=${id}`;

    let requestOptions = {
        method: "get",

        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
    };
    return await fetchData(xurl, requestOptions);
}

//抽奖
export async function giftRoll(gift_id, limit) {
    const xurl = `${url}/api/lottery/giftRoll?`;
    const raw = {
        gift_id,
        limit,
    };
    let requestOptions = {
        method: "Post",
        body: JSON.stringify(raw),
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
    };
    return await fetchData(xurl, requestOptions);
}

async function fetchData(url, requestOptions) {
    return await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            // this.columns = result.data;
            return result;
        })
        .catch((error) => console.log("error", error));
}
