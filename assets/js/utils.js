export const toKoreanDate = (dateString, padMonth = false) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const monthStr = padMonth ? month.toString().padStart(2, '0') : month.toString();
    return `${year}년 ${monthStr}월`
}

export const getDurationString = (startDateString, endDateString) => {
    return `${toKoreanDate(startDateString, true)} - ${toKoreanDate(endDateString, true)}`
}

export const getDateDifferenceInYearsMonths = (startDateString, endDateString) => {
    const date1 = new Date(startDateString);
    const date2 = new Date(endDateString);

    const endDate = date1 > date2 ? date1 : date2;
    const startDate = date1 > date2 ? date2 : date1;

    const totalMonths = ((endDate.getFullYear() - startDate.getFullYear()) * 12) + (endDate.getMonth() - startDate.getMonth());

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    return years === 0 ? `${months}개월` : years !== 0 && months === 0 ? `${years}년` : `${years}년 ${months}개월`
    
}