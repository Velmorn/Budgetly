 export const calculateEndDate = (startDateStr, period, count) => {
    const startDate = new Date(startDateStr);
    const endDate = new Date(startDate);

    switch (period) {
        case 'DAILY':
            endDate.setDate(startDate.getDate() + count);
            break;
        case 'WEEKLY':
            endDate.setDate(startDate.getDate() + 7 * count);
            break;
        case 'MONTHLY':
            endDate.setMonth(startDate.getMonth() + count);
            break;
        case 'YEARLY':
            endDate.setFullYear(startDate.getFullYear() + count);
            break;
        default:
            break;
    }

    return endDate;
};