import * as assert from "assert";

import * as puppeteer from "puppeteer";
import * as lighthouse from "lighthouse";

import * as http from "http";
import * as app from "./server/app";

import * as getPort from "get-port";

import lhReportGenerator = require('lighthouse/lighthouse-core/report/report-generator');


interface AuditProperties {
  title: string;
  description: string;
  warnings: string[] | undefined;
  score: number | null;
  details: {
    items: {
      node: {
        selector: string
      }
    }[]
  }
}


describe("bulma-a11y", () => {

  let httpServer: http.Server;
  let portNumber: number;

  let browser: puppeteer.Browser;

  before(async () => {
    portNumber = await getPort();

    httpServer = http.createServer(app);
    httpServer.listen(portNumber);

    browser = await puppeteer.launch();
  });

  after(() => {
    try {
      browser.close();
      httpServer.close();

    } catch (_e) {
      console.log(_e);
      // ignore
    }
  });

  it("should load stylesheet", async () => {

    const url = "http://localhost:" + portNumber + "/bulma-a11y/bulma-a11y.min.css";

    const page = await browser.newPage();

    await page.goto(url)
      .then((res) => {
        assert.strictEqual(res.status(), 200);
      })
      .catch(() => {
        assert.fail();
      });
  });


  const testPages = ["buttons", "messages"];

  for (const testPage of testPages) {

    it("should score a 100% accessibility score - " + testPage, async () => {

      const url = "http://localhost:" + portNumber + "/" + testPage + ".html";

      const report = await lighthouse(url, {
        port: (new URL(browser.wsEndpoint())).port,
        output: "json",
        onlyCategories: ["accessibility"]
      });

      const reportJSON = JSON.parse(lhReportGenerator.generateReport(report.lhr, "json"));

      const score = reportJSON.categories.accessibility.score;



      if (score < 1) {
        const audits: AuditProperties[] = Object.values(reportJSON.audits);

        for (const audit of Object.values(audits)) {

          if (audit.score !== null && audit.score !== 1) {
            console.log(audit.title);
            console.log(audit.description);
            for (const item of audit.details.items) {
              console.log("- " + item.node ?.selector);
            }
            console.log("\n");
          }
        }
      }

      assert.strictEqual(score, 1);
    });
  }

});
