export const normalizeAudio: (
  uploadPath: string,
  filename: string
) => void = async (uploadPath, fileName) => {
  const normalize = await import("@dharmendrasha/ffmpeg-normalize");
  const fs = await import("fs");
  const orgFile = uploadPath + "/" + fileName;
  const normFile = uploadPath + "/normalized_" + fileName;
  normalize({
    input: uploadPath + "/" + fileName,
    output: uploadPath + "/normalized_" + fileName,
    loudness: {
      normalization: "ebuR128",
      target: {
        input_i: -23,
        input_lra: 7.0,
        input_tp: -2.0,
      },
    },
    verbose: true,
  })
    .then((normalized) => {
      console.log("normalize success", normalized);
      fs.rmSync(orgFile);
      fs.rename(normFile, orgFile, (error) => console.log(error));
      // Normalized
    })
    .catch((error) => {
      console.log("error normalizing", error);
      // Some error happened
    });
};
