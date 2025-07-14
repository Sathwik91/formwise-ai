export const downloadAsFile = (
  data: Record<string, any>,
  filename: string,
  mimeType: string
) => {
  let content = '';

  if (mimeType === 'text/csv') {
    const keys = Object.keys(data);
    const values = keys.map(k => `"${String(data[k]).replace(/"/g, '""')}"`);
    content = `${keys.join(',')}\n${values.join(',')}`;
  } else {
    content = JSON.stringify(data, null, 2);
  }

  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};
// This function allows you to download data as a file in either JSON or CSV format.
// It creates a Blob from the data, generates a URL for it, and triggers a download