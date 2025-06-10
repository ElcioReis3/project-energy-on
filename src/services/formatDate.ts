export const formatDateTime = (date: string | Date) => {
  const d = new Date(date);

  const dates = new Date(d).toLocaleDateString("pt-BR");
  const dateTimes = new Date(d).toLocaleTimeString("pt-BR");

  return `${dates} - ${dateTimes}`;
};
export const formatDate = (date: string | Date) => {
  const d = new Date(date);

  const day = d.getUTCDate().toString().padStart(2, "0");
  const month = (d.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = d.getUTCFullYear();

  return `${day}/${month}/${year}`;
};

export const getHoursTime = (dataAtual: string) => {
  const now = new Date();
  const hour = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const secunds = now.getSeconds().toString().padStart(2, "0");

  const DatetimeHours = new Date(`${dataAtual}T${hour}:${minutes}:${secunds}`);
  return DatetimeHours;
};
