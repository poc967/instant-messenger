const AWS = require("aws-sdk");
const fileStream = require("fs");

AWS.config.update({ region: process.env.s3_region });

s3 = new AWS.S3({ apiVersion: "2006-03-01" });

async function s3Upload(file, filename, contentType, encoding) {
  var uploadParams = {
    Bucket: "instant-messenger-images",
    Key: "",
    Body: "",
    ContentType: "",
    ContentEncoding: "",
    ACL: "public-read",
  };

  uploadParams.Body = file;
  uploadParams.Key = filename;
  uploadParams.ContentType = contentType;
  uploadParams.ContentEncoding = "base64";

  try {
    let url = await s3.upload(uploadParams).promise();
    return url.Location;
  } catch (error) {
    return error;
  }
}

function listAllS3Buckets() {
  s3.listBuckets(function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Buckets);
    }
  });
}

module.exports = {
  s3Upload,
  listAllS3Buckets,
};
