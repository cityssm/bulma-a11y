"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const puppeteer = require("puppeteer");
const lighthouse = require("lighthouse");
const http = require("http");
const app = require("./server/app");
const getPort = require("get-port");
const lhReportGenerator = require("lighthouse/lighthouse-core/report/report-generator");
describe("bulma-a11y", () => {
    let httpServer;
    let portNumber;
    let browser;
    before(async () => {
        portNumber = await getPort();
        httpServer = http.createServer(app);
        httpServer.listen(portNumber);
        browser = await puppeteer.launch();
    });
    after(async () => {
        try {
            await browser.close();
            httpServer.close();
        }
        catch (_e) {
            console.log(_e);
        }
    });
    it("should load stylesheet", async () => {
        const url = "http://localhost:" + portNumber.toString() + "/bulma-a11y/bulma-a11y.min.css";
        const page = await browser.newPage();
        await page.goto(url)
            .then((res) => {
            assert.strictEqual(res.status(), 200);
        })
            .catch(() => {
            assert.fail();
        });
    });
    const testPages = ["buttons", "notifications", "tags", "messages"];
    for (const testPage of testPages) {
        it("should score a 100% accessibility score - " + testPage, async () => {
            var _a;
            const url = "http://localhost:" + portNumber.toString() + "/" + testPage + ".html";
            const report = await lighthouse(url, {
                "port": (new URL(browser.wsEndpoint())).port,
                "output": "json",
                "onlyCategories": ["accessibility"]
            });
            const reportJSON = JSON.parse(lhReportGenerator.generateReport(report.lhr, "json"));
            const score = reportJSON.categories.accessibility.score;
            if (score < 1) {
                const audits = Object.values(reportJSON.audits);
                for (const audit of Object.values(audits)) {
                    if (audit.score !== null && audit.score !== 1) {
                        console.log(audit.title);
                        console.log(audit.description);
                        for (const item of audit.details.items) {
                            console.log("- " + ((_a = item.node) === null || _a === void 0 ? void 0 : _a.selector));
                        }
                        console.log("\n");
                    }
                }
            }
            assert.strictEqual(score, 1);
        });
    }
});
