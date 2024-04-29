export const fixExtension = (filename: string) => {
  return filename.split('.').reverse()[0];
};
