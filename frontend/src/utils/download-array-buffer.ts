export const downloadArrayBuffer = (arrayBuffer: ArrayBuffer, filename: string) => {
  const content = new Blob([new Uint8Array(arrayBuffer)]);

  const encodedUri = window.URL.createObjectURL(content);
  const link = document.createElement("a");

  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);

  link.click();
};
