// fetch(url, {
//     method: 'POST',
//     mode: 'cors',
//     cache: 'no-cache',
//
//     headers: {
//         'content-type': 'application/grpc-web-text',
//         'X-Accept-Content-Transfer-Encoding': 'base64',
//     },
//     body: encodedEmptyReq,
// }).then(async response => {
//     const reader = response.body.getReader();
//     while (true) {
//         const {done, value} = await reader.read();
//         console.log(`Получено ${value}`)
//         if (done) {
//             break;
//         }
//     }
// })