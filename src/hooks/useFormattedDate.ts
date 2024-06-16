export const useFormattedDate = () => {
  const formattedDateTime = (timestamp: any) => {
    if (!timestamp || !timestamp.seconds) {
      return 'Invalid Date';
    }

    const secondsInMillis = timestamp.seconds * 1000;
    const nanosecondsInMillis = timestamp.nanoseconds / 1e6;
    const totalMilliseconds = secondsInMillis + nanosecondsInMillis;

    const dateObject = new Date(totalMilliseconds);

    const day = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObject.getFullYear();

    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  return { formattedDateTime };
};
