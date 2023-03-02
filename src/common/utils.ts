export const getDate = (d: string | number) => {
  if (typeof d === 'string' && isNaN(Date.parse(d))) {
    throw new Error('Invalid date');
  }

  const date = new Date(d);
  const year = String(date.getFullYear()).padStart(4, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minuites = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${minuites}`;
};
