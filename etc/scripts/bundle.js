/* eslint no-console: 0 */

const path = require("path");
const del = require("del");
const copy = require("recursive-copy");

const getPathDest = (pathRoot, isPr, branchName) => {
  if (isPr) {
    return path.join(pathRoot, "pr", branchName);
  }

  return pathRoot;
};

(async function main() {
  const { BRANCH_NAME = "master", EVENT_NAME } = process.env;
  const IS_PR = EVENT_NAME === "pull_request";

  const ROOT = path.resolve(__dirname, "..", "..");

  const pathSource = path.join(ROOT, "dist");
  const pathDestRoot = path.join(ROOT, "gh-pages");
  const pathDest = getPathDest(pathDestRoot, IS_PR, BRANCH_NAME);

  console.log("============================================================");
  console.log(`Bundle '${BRANCH_NAME}'`);

  console.log("  Clean...");
  try {
    del.sync([
      path.join(ROOT, "gh-pages", ".git"),
      path.join(ROOT, "gh-pages", ".nojekyll"),
    ]);

    console.log("  Complete\n");
  } catch (err) {
    console.error("Clean FAILED: ", err.message);
  }

  console.log("  Delete...");
  try {
    if (IS_PR) {
      del.sync(pathDest);

      console.log("    Removed:");
      console.log(`      ${pathDest}`);
    } else {
      del.sync([
        `${pathDest}/**`,
        `!${path.join(ROOT, "gh-pages", "pr")}/**`,
      ]);

      console.log("    Removed:");
      console.log(`      ${pathDest}`);
      console.log(`      !${path.join(ROOT, "gh-pages", "pr")}/**`);
    }

    console.log("  Complete\n");
  } catch (err) {
    console.error("Delete FAILED: ", err.message);
  }

  console.log("  Copy...");

  console.log(`    From '${pathSource}'`);
  console.log(`    To '${pathDest}'`);

  try {
    await new Promise((resolve, reject) => {
      copy(pathSource, pathDest, (error, results) => {
        if (error) {
          console.error(`      Copy failed: ${error}`);
          reject(error);
        } else {
          console.info(`      Copied ${results.length} files`);
          resolve(results);
        }
      });
    });

    console.log("  Complete\n");
  } catch (err) {
    console.error("Copy FAILED: ", err.message);
  }

  console.log("Bundle complete");
  console.log("============================================================");
}());
