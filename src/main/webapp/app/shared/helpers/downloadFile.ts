const downloadFile = (data, fileName) => {
  const file = new Blob([data]);
  const downloadUrl = window.URL.createObjectURL(file);
  const linkUrl = document.createElement('a');

  linkUrl.download = downloadUrl;
  linkUrl.href = downloadUrl;
  linkUrl.setAttribute('download', fileName);
  linkUrl.click();
  setTimeout(() => {
    window.URL.revokeObjectURL(downloadUrl);
  }, 0);
};

export default downloadFile;
