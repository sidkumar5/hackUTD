const puppeteer = require("puppeteer");

async function getLikedSongs(credentials) {
    let browser = await puppeteer.launch({ headless: false });
    //let browser = await puppeteer.launch();  -> if you do not want to open the browser

    let page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64)' +           
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36'); // prevents bot detection
    await page.goto("https://open.spotify.com/")

    await page.waitForSelector('[data-testid="login-button"]');
    await page.click('[data-testid="login-button"]');

    await page.waitForSelector("#login-username"); // page already loaded so not needed but waits for element to load
    await page.click("#login-username");
    await page.type('#login-username', credentials.username);

    
    await page.waitForSelector("#login-password");
    await page.click("#login-password");
    await page.type('#login-password', credentials.password);

    await page.click("#login-button");

    await page.waitForSelector(".bpIKwIzKlt4mtfM9n6y4");
    await page.click(".bpIKwIzKlt4mtfM9n6y4");

    const el = await page.waitForSelector('.jqC4kulx5rkKJSJHwWC0 div')
    const grabLikedSongs = await page.evaluate(() => {
        let titleTags = document.querySelectorAll(".jqC4kulx5rkKJSJHwWC0 div")
        let artistTags = document.querySelectorAll(".jqC4kulx5rkKJSJHwWC0 a")
        let titles = []
        let artists = []
        titleTags.forEach((Element) => {
            titles.push(Element.textContent);
        });
        artistTags.forEach((Element) => {
            artists.push(Element.textContent);
        });
        return {titles, artists}
    });
    //console.log(grabLikedSongs)

    browser.close()
    return grabLikedSongs
    

    // await page.waitForTimeout(10000);
    // await browser.close();
}

async function createPlaylist(artistList, credentials, names) {
    let browser = await puppeteer.launch({ headless: false });
    //let browser = await puppeteer.launch();  -> if you do not want to open the browser

    let page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64)' +           
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36'); // prevents bot detection
    await page.goto("https://open.spotify.com/")

    await page.waitForSelector('[data-testid="login-button"]');
    await page.click('[data-testid="login-button"]');

    await page.waitForSelector("#login-username"); // page already loaded so not needed but waits for element to load
    await page.click("#login-username");
    await page.type('#login-username', credentials.username);

    
    await page.waitForSelector("#login-password");
    await page.click("#login-password");
    await page.type('#login-password', credentials.password);

    await page.click("#login-button");

    // create playlist button
    await page.waitForSelector(".toLXZndUKcF0hDJ3tz7s");
    await page.click(".toLXZndUKcF0hDJ3tz7s");

    await page.waitForSelector(".oStn5XbXP5fETx83AmIj");
    await page.click(".oStn5XbXP5fETx83AmIj");

    let namesCombo = ": " + names[0] + " + " + names[1] + " 🙈"
    await page.waitForSelector('[data-testid="playlist-edit-details-name-input"]');
    await page.click('[data-testid="playlist-edit-details-name-input"]');
    // await page.evaluate( () => document.getElementById("text-input-8016936bea775b37").value = namesCombo)
    await page.type('[data-testid="playlist-edit-details-name-input"]', namesCombo);

    await page.waitForSelector('[data-testid="playlist-edit-details-save-button"]');
    await page.click('[data-testid="playlist-edit-details-save-button"]');

    for (let i = 0; i < artistList.length; i++){
        await page.waitForSelector('[role="searchbox"]');
        await page.click('[role="searchbox"]');
        await page.type('[role="searchbox"]', artistList[i]);
        await page.waitForTimeout(1000);

        await page.waitForSelector('[data-testid="add-to-playlist-button"]');
        await page.click('[data-testid="add-to-playlist-button"]');

        await page.waitForSelector('[stroke="currentColor"]');
        await page.click('[stroke="currentColor"]');
    }

    browser.close()

    
    

    // await page.waitForTimeout(10000);
    // await browser.close();
}

// let credentials = {username: "brownmamba156@gmail.com", password: "314159265"}
// getLikedSongs(credentials)

// let artistList = ['Kanye', 'Bazzi', 'Ali Gatie']
// let names = ['Kim', 'Kanye']
// createPlaylist(artistList, credentials, names)

module.exports = {
    getLikedSongs,
    createPlaylist
}