console.log('Bismillah');
const fs = require('fs');
const http = require('http');
const url = require('url')
const { json } = require('node:stream/consumers');

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
const replaceTemplate = (template, product) => {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName)
  output = output.replace(/{%IMAGE%}/g, product.image)
  output = output.replace(/{%QUANTITY%}/g, product.quantity)
  output = output.replace(/{%PRICE%}/g, product.price)
  output = output.replace(/{%DESCRIPTION%}/g, product.description)
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
  output = output.replace(/{%FROM%}/g, product.from)
  output = output.replace(/{%ID%}/g, product.id)

  if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  return output
}
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const overviewPage = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8')
const productTemplate = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8')
const productCardTemplate = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')

const server = http.createServer ((req, res) => {
  const { pathname: pathName, query } = url.parse(req.url, true);
  // const pathName = req.url;

  //Hello Page
  if ( pathName === '/hello') {
    res.end('ini hello FSW 2 gais!')

  //Product Page
  // } else if ( pathName === '/product') {
  //   res.end(JSON.stringify({
  //     data: 'ini product gais!',
  //   }));

    //Simple APi
  } else if ( pathName === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json'
    })
    res.end(data);

    //Overview Page
  } else if ( pathName === '/overview') {
    const productCardsHtml = dataObj.map(el => replaceTemplate(productCardTemplate, el))
    const output = overviewPage.replace('{%PRODUCT_CARDS%}', productCardsHtml)

    res.end(output);

  } else if( pathName === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html'
    })
    const product = dataObj[query.id]
    const output = replaceTemplate[productTemplate, product]

    res.end(output);
    
  }  else {
    res.writeHead(404, {
      'Content-type': 'text/html'
    })
    res.end('<h1>Ini gada apa apa nya gais!!</h1>')
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server sudah jalan gais!')
});