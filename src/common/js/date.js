export function formatDate(date, fmt) {
    let o = {
        'Y+': date.getFullYear(),
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let temp = o[k];
            if (k === 'Y+') {
                fmt = fmt.replace(RegExp.$1, temp);
            }
            fmt = fmt.replace(RegExp.$1, pad(temp, 2));
        }
    }
    return fmt;
}

function pad(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}
