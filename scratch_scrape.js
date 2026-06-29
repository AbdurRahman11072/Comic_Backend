const https = require('https');

https.get('https://asurascans.com/comics/solo-leveling-030ff47a', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const match = data.match(/<meta property="og:image" content="([^"]+)"/);
    console.log(match ? match[1] : 'No image found');
  });
}).on('error', (err) => console.log('Error:', err.message));
