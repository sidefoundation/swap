export const timestampToDate = (timestamp: number): string => {
  const date = new Date(Number(timestamp));
  const dateTimeString = date.toLocaleString();
  return dateTimeString;
};

export const base64StringToUnit8Array = (base64Signature: string) => {
  // Convert from base64 to binary string
  const binaryString = atob(base64Signature);

  // Create a Uint8Array from the binary string
  const uint8ArraySignature = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    uint8ArraySignature[i] = binaryString.charCodeAt(i);
  }
  return uint8ArraySignature;
};
