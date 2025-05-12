export const getDisplayDeltaFromDate = (date: Date): string => {
    const diffInMilliseconds = new Date().getTime() - date.getTime();
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const parts: string[] = [];
    if (diffInDays > 0) {
        parts.push(`${diffInDays} days`);
    }
    if (diffInHours % 24 > 0) {
        parts.push(`${diffInHours % 24} hours`);
    }
    if (diffInMinutes % 60 > 0) {
        parts.push(`${diffInMinutes % 60} minutes`);
    }
    if (!(diffInMinutes % 60 > 0) && diffInSeconds % 60 > 0) {
        parts.push(`${diffInSeconds % 60} seconds`);
    }
    return `${parts.join(', ')} ago`;
};
