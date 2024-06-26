Practice.
Env variables load in via scripts:
'npm run...'
type set to es module
Add  .env and .env.* to .gitignore

### Automation Project

AIM: Automate generative content and automate comment dropping.

## Install

npm i
create .csv file for db if not generated
add .envs

## Component Structure

Making sense of the file tree for this project.
Ideally so if I leave it for a year, I can pick back up quickly.

# Entry point

Index.js is the entry point. Only contains run() and specifies which env.

# Utils

Holds all of the components and util functions.

__Puppeteer__

pupController - Puppeteer Controller.
* Top level puppeteer object instantiation. Gens the browser and page. Passes page to other util func
* Sequentially runs the puppeteer action functions.

pupLaunch - Puppeteer Launcher.
* Takes the browser to the gpt page and checks logged in.

pupSendPrompt - Puppeteer Send Prompt.
* Inserts the topic to search GPT into the textarea.
* Searches.

promptBuilder - Prompt Builder
* Dynamically generates the prompts to be sent to the llm.
* First prompt & n sequential prompts.
* thread builder prompt
* Carousel builder prompt
* Video script builder prompt
* FAQ prompt
* Claude3 prompt to stitch together blog with formatting

exportArticle
* Opens claude3 and sends prompt
* Checks claude3 has finished typing

getArticle
* concats previous bog article output so that it an be reformatted by claude3

__CSV Read / Write__

getTopic
* Generates an absolute path to csv db
* Get's topic from first row of CSV db

getInstructions
* Generates an absolute path to instructions csv db
* uses prompt number to calculate which article section to ask for


__Photo Scraper__

unsplashScraper.js
*rate limited photo scrpaper.
* arg is the topic.
* unsplash rate limit is 50 requests per hour.
* configured

jpgToAvifConvert.js
* checks if file has not yet been converted, then converts.
* Takes directory (portrait vs landscape as an arg)

__Tiktok Title Scraper__ / + views
tiktokTitleScraper.js
* Scrapes descriptions for a tiktok page. Just pass in url.
* You may need to do captchas. So not good for looping remotely.

__Other__

writeReplyToJson
* Saves chatGPTs responses to a json file

writeThreadToJson
* Saves chatGPTs gen threads to a json file

writeCarouselToJson

writeVideoScriptToJson

writeFAQToJSON

getArticleFromID
* Not currently used
* Was going to be used to feed back into GPT to strengthen the context.
* Article generated is to big an input
* may be useful for the other LLMs

sleep
* Random sleep time approx 1.5 sec to spoof rate limit checkers
* also long sleep to guarentee things are finished if can't use page.waitfor()

isTextRenderedFully
* The chatGPT reply textarea dynamically populates over time. Checks when resp. finished.

exportArticle & writeArticleToGoogleDrive
* Opens Claude3 stitches together copies, pastes into google drive saves with title.

jsonToCsv.js
Converts a json file from tiktok scraping into csv ready for sheets import


Tests to write:
On open GPT site, are you logged in and at home screen?

Feature:
If error on reaching chatgpt home[logged in], ping me a message saying server dead. Handle error
Abstract out absolute path builder for all CSV gets.


Thoughts:
If you have never signed into chat gpt, it will break looking for prompt text area
Pup controller browser instantiation should be in a try catch
At least once, the server has crashed. Error: Requesting main frame too early! Selector didn't appear
To counter this, the current run() should be aborted and retried.
Currently the thread is only generating from the last part of the article
But context window too small to give whole article...

Putting puppeteer in background hardships
by mouse click isnt working
by keyboard shortcuts not working
by applescript not working
by args --background --start-minimized not working
by chromium info.plist missing

Google drive hardships
Couldnt manipulate google drive menu very well
Instead, took the forwarding url as you click new doc before halfway through the url change
Hopefully it wont change and break!

Claude 3 stitch is over engineered?
Why not just join the article conversation array by \n, copy clipboard, paste in dive. Don't need claude 3.

Image compression:
Avif betetr than webp.
Insta takes avif, tiktok only png jpg.
