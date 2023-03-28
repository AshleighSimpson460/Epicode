const backendURL = "https://striveschool-api.herokuapp.com/api/product/";

const fetchRequest = async function () {
  await fetch(backendURL, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDFhNDY1ZWU3ZGE1MzAwMTNiNjZhZTIiLCJpYXQiOjE2Nzk0NDM1NTAsImV4cCI6MTY4MDY1MzE1MH0.bzDl7AP7acFQrVOzdIy1rEm1T9w1TChX53Vr8au-yP8",
    },
  })
    const awaitResponse = await awaitResponse.json()
    const productData = console.log(productData)
};
fetchRequest();
