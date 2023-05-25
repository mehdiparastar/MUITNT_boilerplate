import CryptoJS from 'crypto-js';

async function hashLargeFile(file: File): Promise<string> {
  const chunkSize = 1024 * 512; // 0.5 MB chunk size
  const fileSize = file.size;
  const chunks = Math.ceil(fileSize / chunkSize);
  let currentChunk = 0;
  let hash = CryptoJS.algo.SHA256.create();

  const readChunk = (start: number, end: number) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const chunkData = new Uint8Array(event.target?.result as ArrayBuffer);
        const wordArray = CryptoJS.lib.WordArray.create(Array.from(chunkData));
        hash.update(wordArray);

        currentChunk++;

        if (currentChunk < chunks) {
          readChunk(start + chunkSize, Math.min(start + chunkSize, fileSize))
            .then(resolve)
            .catch(reject);
        } else {
          resolve();
        }
      };

      const fileSlice = file.slice(start, end);
      reader.readAsArrayBuffer(fileSlice);
    });
  };

  await readChunk(0, Math.min(chunkSize, fileSize));

  return hash.finalize().toString();
}

export default hashLargeFile;
