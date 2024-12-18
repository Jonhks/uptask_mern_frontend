export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const formater = new Intl.DateTimeFormat("es-Es", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return formater.format(date);
};
