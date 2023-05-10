const { program } = require("commander");

program
  .option(
    "-c, --concurrency <concurrency>",
    "Number of parallel requests to perform at a time"
  )
  .option(
    "-n, --requests <requests>",
    "Number of requests to perform for the benchmarking session"
  )
  .option("-b, --body", "Send a random generated body with the request")
  .requiredOption("-u, --url <url>", "URL to send requests to")
  .parse(process.argv);

const options = program.opts();
const concurrency = parseInt(options.concurrency) || 1;
const numRequests = parseInt(options.requests) || 4;
const sendBody = options.body;
const url = options.url;
const RESPONSE_DELAY = 100;

const requestOptions = {
  method: "GET", // Default method is GET
  headers: {
    "Content-Type": "text/plain",
  },
};

if (sendBody) {
  requestOptions.method = "POST";
  requestOptions.headers["Content-Length"] = 0; // Will be updated when generating the body
}

const startTime = new Date().getTime();
let successfulCount = 0;
let failedCount = 0;
let totalTime = 0;

async function sendRequest() {
  try {
    if (sendBody) {
      const randomBody = generateRandomBody();
      requestOptions.headers["Content-Length"] = Buffer.byteLength(randomBody);
    }

    await fetch(url, requestOptions);

    const end = new Date().getTime();
    const responseTime = end - startTime;
    totalTime += responseTime;
    successfulCount++;

    console.log(`Request ${successfulCount + failedCount}: ${responseTime}ms`);
  } catch (error) {
    failedCount++;
  }

  if (successfulCount + failedCount === numRequests) {
    printStats();
  }
}

function generateRandomBody() {
  // Generate a random body
  const randomBody = [];
  const bodyLength = Math.floor(Math.random() * 1000);

  for (let i = 0; i < bodyLength; i++) {
    randomBody.push(Math.floor(Math.random() * 10));
  }

  return randomBody.join("");
}

function printStats() {
  const averageTime = totalTime / numRequests;

  console.log(`\nRequests ${numRequests} times`);
  console.log(`${successfulCount} successful, ${failedCount} failing`);
  console.log(`Average response time: ${averageTime}ms`);

  console.table([
    {
      "Number of requests": numRequests,
      "Number of concurrent requests": concurrency,
      "Average response time (ms)": averageTime,
      "Successful requests": successfulCount,
      "Failed requests": failedCount,
    },
  ]);
}

// Start sending requests
for (let i = 0; i < concurrency; i++) {
  for (let j = 0; j < numRequests; j++) {
    setTimeout(sendRequest, i * RESPONSE_DELAY);
  }
}
