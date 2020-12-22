"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        portNumber = yield getPort();
        httpServer = http.createServer(app);
        httpServer.listen(portNumber);
        browser = yield puppeteer.launch();
    }));
    after(() => {
        try {
            browser.close();
            httpServer.close();
        }
        catch (_e) {
            console.log(_e);
        }
    });
    it("should load stylesheet", () => __awaiter(void 0, void 0, void 0, function* () {
        const url = "http://localhost:" + portNumber + "/bulma-a11y/bulma-a11y.min.css";
        const page = yield browser.newPage();
        yield page.goto(url)
            .then((res) => {
            assert.strictEqual(res.status(), 200);
        })
            .catch(() => {
            assert.fail();
        });
    }));
    const testPages = ["buttons", "messages"];
    for (const testPage of testPages) {
        it("should score a 100% accessibility score - " + testPage, () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const url = "http://localhost:" + portNumber + "/" + testPage + ".html";
            const report = yield lighthouse(url, {
                port: (new URL(browser.wsEndpoint())).port,
                output: "json",
                onlyCategories: ["accessibility"]
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
        }));
    }
});
