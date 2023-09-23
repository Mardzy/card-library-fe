/**
 * Converts year range to list of product years
 * @param start
 * @param stop
 * @param step
 */
export const getProductYearRange = (
    start: number,
    stop: number,
    step: number
) => {
    const years = Array.from(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step
    );
    return years
        .map((y) => {
            const lastTwoDigits = Number(String(y).slice(-2));

            const getLastTwoDigitsAsString = (num: number): string => {
                const increment = num + 1;
                const numPlusOneToString = String(increment);

                if (numPlusOneToString.length === 3) {
                    return '00';
                } else if (numPlusOneToString.length == 1) {
                    return `0${numPlusOneToString}`;
                } else {
                    return numPlusOneToString;
                }
            };

            return `${y}-${getLastTwoDigitsAsString(lastTwoDigits)}`;
        })
        .sort((a, b) => b.localeCompare(a));
};
