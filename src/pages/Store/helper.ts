
export const generateStoreCode = (storeName: string): string => {
  let code = '';
  if (storeName) {
    // Convert to lowercase and replace spaces with underscores
    code = storeName.toLowerCase().replace(/\s+/g, '_');
  }
  return code;
};
