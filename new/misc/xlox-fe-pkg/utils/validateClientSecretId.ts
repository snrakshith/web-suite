const validateClientSecretId = async (
  clientSecretId: string
): Promise<boolean> => {
  // Replace with your actual API endpoint
  const response = await fetch(
    `/api/validate-key?clientSecretId=${clientSecretId}`
  );
  const data = await response.json();
  return data.isValid;
};
