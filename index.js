console.log('Bismillah');
const fs = require('fs');
const http = require('http');

// const textIn = fs.readFileSync('./txt/read-this.txt', 'utf-8');
// console.log(textIn);

// const textOut = 'ini teh : ${textIn}';
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('Success cetak penjelasan avocado!');


// fs.readFile('./txt/read-this.txt', 'utf-8', (err, data) => {
//   fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2) => {
//     fs.readFile(`./txt/final.txt`, 'utf-8', (err, data3) => {
//       fs.writeFile(`./txt/gabungan.txt`, `${data2}\n${data3}`, 'utf-8', err => {
//         console.log('Success menggabungkan data!');
//       });
//     });
//   });
// });
// console.log('Hai avocado!');


/////////////////////////////
// SERVER dengan HTTP
const server = http.createServer ((req, res) => {
  const pathName = req.url;
  if ( pathName === '/hello') {
    res.end('ini hello FSW 2 gais!')
  } else if ( pathName === '/product') {
    res.end(JSON.stringify({
      data: 'ini product gais!',
    }));
  } else if ( pathName === '/api') {
    const data = fs.readFileSync(`${__dirname}/dev-data/data.json`)
    res.writeHead(200, {
      'Content-type': 'application/json'
    })
    res.end(data);
  } else if ( pathName === '/overview') {
    const overviewPage = fs.readFileSync(`${__dirname}/templates/overview.html`)
    res.end(overviewPage);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html'
    })
    res.end('<h1>Ini gada apa apa nya gais!!</h1>')
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server sudah jalan gais!')
});