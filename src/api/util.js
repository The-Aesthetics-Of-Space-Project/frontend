export function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}.${month}.${day} (${getDayOfWeek(today)})`;
}

export function getDayOfWeek(date) {
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    return daysOfWeek[date.getDay()];
}