export function getCurrentDate () {
    const current = new Date();
    var month = ("0" + (current.getMonth() + 1)).slice(-2);
    var day = ("0" + current.getDate()).slice(-2);
    return `${day}-${month}-${current.getFullYear()}`;
}