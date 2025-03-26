// Convert to all strings and numbers without decimal points
const convertValue = (value: string | number): string | number => {
    if (typeof value === "number") {
        return Math.round(value); // Round numbers
    } else if (typeof value === "string") {
        // Check for a duration in the format PT#H#M#S
        const regex = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(\.\d+)?)S)?$/;
        const matches = value.match(regex);

        if (matches) {
            let hours = matches[1] ? parseInt(matches[1], 10) : 0;
            let minutes = matches[2] ? parseInt(matches[2], 10) : 0;
            let seconds = matches[3] ? parseFloat(matches[3]) : 0;
            // Convert to total number of seconds
            seconds = Math.round(seconds);
            minutes += Math.floor(seconds / 60);
            hours += Math.floor(minutes / 60);
            seconds = seconds % 60;
            minutes = minutes % 60;

            // Convert total time to seconds
            const totalSeconds = hours * 3600 + minutes * 60 + seconds;
            return convertSecondsToHHMM(totalSeconds);
        }
    }

    return value; // Return original if not a number or valid time string
};
const convertSecondsToHHMM = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
};

// Function to convert ISO8601 duration (PTxxHxxMxxS) to minutes
const convertDurationToMinutes = (duration: string): number => {
    const hoursMatch = duration.match(/(\d+)H/);
    const minutesMatch = duration.match(/(\d+)M/);
    const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
    const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
    return hours * 60 + minutes;
};

// Function to convert minutes to hh:mm format
const convertMinutesToHHMM = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
};

export default {
    convertValue,
    convertSecondsToHHMM,
    convertMinutesToHHMM,
    convertDurationToMinutes
}