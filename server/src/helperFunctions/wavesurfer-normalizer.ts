import * as fs from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

interface JSONContent {
  version: number;
  channels: number;
  sample_rate: number;
  samples_per_pixel: number;
  bits: number;
  length: number;
  data: number[];
}

function decimalLimit(num: number, fixed: number) {
  fixed = fixed || 0;
  fixed = Math.pow(10, fixed);
  return Math.floor(num * fixed) / fixed;
}

function normalize(channelData) {
  const firstChannel = channelData[0];
  if (firstChannel.some((n) => n > 1 || n < -1)) {
    const length = firstChannel.length;
    let max = 0;
    for (let i = 0; i < length; i++) {
      const absN = Math.abs(firstChannel[i]);
      if (absN > max) max = absN;
    }
    for (const channel of channelData) {
      for (let i = 0; i < length; i++) {
        channel[i] = decimalLimit(channel[i] / max, 2);
      }
    }
  }
  return channelData;
}

export const scaleJSON = async (filename: string) => {
  try {
    const fileContent = await readFileAsync(filename, 'utf8');
    const jsonContent: JSONContent = JSON.parse(fileContent);

    const data = jsonContent.data;
    const channels = jsonContent.channels;
    const digits = 2;

    // let maxVal = Number.NEGATIVE_INFINITY;

    // for (const num of data) {
    //   if (num > maxVal) {
    //     maxVal = num;
    //   }
    // }
    // const new_data = data.map((x) => parseFloat((x / maxVal).toFixed(digits)));

    const [new_data] = normalize([data]);

    if (channels > 1) {
      const deinterleavedData = deinterleave(new_data, channels);
      jsonContent.data = deinterleavedData;
    } else {
      jsonContent.data = new_data;
    }

    const updatedFileContent = JSON.stringify(jsonContent, null);

    await writeFileAsync(filename, updatedFileContent, 'utf8');
    console.log('File successfully updated.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

function deinterleave(data: number[], channelCount: number) {
  //first step is to separate the values for each audio channel and min/max value pair, hence we get an array with channelCount * 2 arrays
  // deinterleaved = [data[idx::channelCount * 2] for idx in range(channelCount * 2)]

  const deinterleaved = [];

  for (let idx = 0; idx < channelCount * 2; idx++) {
    const channelData: number[] = [];
    for (let i = idx; i < data.length; i += channelCount * 2) {
      channelData.push(data[i]);
    }
    deinterleaved.push(channelData);
  }

  const new_data = [];

  // this second step combines each min and max value again in one array so we have one array for each channel

  for (let ch = 0; ch < channelCount; ch++) {
    const idx1 = 2 * ch;
    const idx2 = 2 * ch + 1;
    const ch_data = new Array<number>(
      deinterleaved[idx1].length + deinterleaved[idx2].length,
    );
    ch_data.forEach((_, i) => {
      if (i % 2 === 0) {
        ch_data[i] = deinterleaved[idx1][i / 2];
      } else {
        ch_data[i] = deinterleaved[idx2][(i - 1) / 2];
      }
    });
    new_data.push(ch_data);
  }

  return new_data;
}

// import * as fs from 'fs';

// interface JsonContent {
//   data: number[] | number[][];
//   channels: number;
// }

// export const scaleJson = (filepath: string): void => {
//   const fileContent = fs.readFileSync(filepath, 'utf8');
//   const jsonContent: JsonContent = JSON.parse(fileContent);
//   const { data, channels } = jsonContent;
//   const digits = 2;

//   const maxVal = Math.max(...(data as number[]));
//   const newData = data.map((x) =>
//     parseFloat(((x as number) / maxVal).toFixed(digits)),
//   );

//   if (channels > 1) {
//     const deinterleavedData = deinterleave(newData, channels);
//     jsonContent.data = deinterleavedData;
//   } else {
//     jsonContent.data = newData;
//   }

//   const updatedContent = JSON.stringify(jsonContent, null, 2);
//   fs.writeFileSync(filepath, updatedContent);
// };

// const deinterleave = (data: number[], channelCount: number): number[][] => {
//   const deinterleaved: number[][] = Array.from(
//     { length: channelCount * 2 },
//     (_, idx) => data.filter((_, i) => i % (channelCount * 2) === idx),
//   );

//   const newdata: number[][] = [];
//   for (let ch = 0; ch < channelCount; ch++) {
//     const idx1 = 2 * ch;
//     const idx2 = 2 * ch + 1;
//     const chData: number[] = [];
//     for (let i = 0; i < deinterleaved[idx1].length; i++) {
//       chData.push(deinterleaved[idx1][i], deinterleaved[idx2][i]);
//     }
//     newdata.push(chData);
//   }
//   return newdata;
// };
