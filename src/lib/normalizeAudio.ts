import normalize from "@dharmendrasha/ffmpeg-normalize";
import fs from "fs";
import path from "path";

export const normalizeAudio = async (uploadPath: string, fileName: string) => {
  const orgFile = path.join(uploadPath, fileName);
  const normFile = path.join(uploadPath, `normalized_${fileName}`);

  try {
    const normalized = await normalize({
      input: orgFile,
      output: normFile,
      loudness: {
        normalization: "ebuR128",
        target: {
          input_i: -23,
          input_lra: 7.0,
          input_tp: -2.0,
        },
      },
      verbose: true,
    });

    console.log("Normalization successful:", normalized);

    fs.rmSync(orgFile);

    fs.renameSync(normFile, orgFile);
    console.log(`Normalized file renamed to original: ${orgFile}`);
  } catch (error) {
    console.error("Error during normalization:", error);
  }
};
