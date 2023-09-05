
export const createQuery = (options: any) => {
  const queryStringArray: string[] = [];

  for (const key in options) {
    if (options.hasOwnProperty(key)) {
      const value = options[key];
      // Replace spaces with '+' in the value
      const formattedValue = String(value).replace(/ /g, '+');
      queryStringArray.push(`${key}=${formattedValue}`);
    }
  }

  return queryStringArray.join('&');
}