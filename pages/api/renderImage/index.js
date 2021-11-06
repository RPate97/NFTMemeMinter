import playwright from 'playwright';
const fs = require('fs');

export default async function handler(req, res) {
    const browser = await playwright['chromium'].launch();
    // Create a page with the Open Graph image size best practise
    const page = await browser.newPage({
        viewport: {
            width: req.body.state.memeWidth + 50,
            height: req.body.state.memeHeight + 200,
        }
    });

    // Generate the full URL out of the given path (GET parameter)
    const url = "localhost:3000/memeTemplate?state=" + encodeURIComponent(JSON.stringify(req.body.state));
    await page.goto(url, {
        timeout: 30 * 1000
    })

    setTimeout(async function(){
        const data = await page.screenshot({
            type: "png"
        })
        await browser.close()
        fs.writeFileSync('test.png', data);
        // Set the s-maxage property which caches the images then on the Vercel edge
        res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate")
        res.setHeader('Content-Type', 'image/png')
        // write the image to the response with the specified Content-Type
        res.end(data)
    }, 100);
};