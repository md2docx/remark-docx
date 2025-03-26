const fs = require("node:fs");
const path = require("node:path");
// skipcq: JS-0258
const { prompt } = require("enquirer");
const { execSync } = require("child_process");

const config = require("./rebrand.config.json");

const [owner, repo] = execSync(
  'git remote get-url --push origin | sed "s/https:\\/\\/github.com\\///" | sed "s/.git//"',
)
  .toString()
  .trim()
  .split("/");

const packageName = `@m2d/${repo}`;

/** avoiding IIFE as formettter keeps misformettting IIFEs */
const rebrandFn = async () => {
  const { shouldRebrand } = await prompt({
    type: "confirm",
    name: "shouldRebrand",
    message: "Do you want to rebrand this repo?",
    initial: true,
  });

  if (!shouldRebrand) return;

  const rootDir = process.cwd();
  // if .tkb is not moved - setup workflow was not triggered or could not create the required commit
  if (fs.existsSync(path.resolve(rootDir, "scripts", ".tkb"))) {
    `rm .tkb
          mv ./scripts/.tkb ./.tkb`
      .split("\n")
      .forEach(cmd => execSync(cmd.trim(), { stdio: "inherit" }));
  }

  const { installExt, ...answers } = await prompt([
    {
      type: "input",
      name: "packageName",
      message: "What is the name of your library?",
      initial: packageName,
    },
    {
      type: "input",
      name: "owner",
      message:
        "Who is the owner of this repo? (GitHub user or organization login, .e.g, mayank1513)",
      initial: owner,
    },
    {
      type: "input",
      name: "repo",
      message: "What is the name of your repository?",
      initial: repo,
    },
    {
      type: "input",
      name: "title",
      message: "What is the title of your project?",
      initial: packageName
        .split("-")
        .map(w => w[0].toUpperCase() + w.slice(1))
        .join(" "),
    },
    {
      type: "confirm",
      name: "installExt",
      message: "Do you want to install the recommended VS Code extensions?",
      initial: true,
    },
  ]);

  if (installExt) {
    console.log("\x1b[32m", "Installing recommended VS Code extensions...");
    execSync("code --install-extension mayank1513.trello-kanban-task-board", { stdio: "inherit" });
    execSync("code --install-extension esbenp.prettier-vscode", { stdio: "inherit" });
  }

  console.log("\x1b[32m", "Creating rebrand.config.json...");
  fs.writeFileSync(
    path.resolve(process.cwd(), "scripts", "rebrand.config.json"),
    JSON.stringify(answers, null, 2),
  );

  console.log("\x1b[32m", "rebranding...");
  execSync("node ./scripts/rebrander.js", { stdio: "inherit" });

  console.log("\x1b[32m", "...");
  console.log("\x1b[32m", "...");
  console.log("\x1b[32m", "...");
  console.log("\x1b[32m", "Clean up repo by removing things that you don't need");

  /**
   * feats: Rebrander
   */
  const { shouldRemoveRebrandScripts } = await prompt({
    type: "confirm",
    name: "shouldRemoveRebrandScripts",
    message: "Do you want to remove the rebranding scripts?",
    initial: true,
  });

  const rootPackageJSON = require("../package.json");

  if (shouldRemoveRebrandScripts) {
    delete rootPackageJSON.scripts.rebrand;
    delete rootPackageJSON.devDependencies.enquirer;
    ["./scripts/rebrand.js", "./scripts/rebrander.js"].forEach(dirOrFile =>
      execSync("rm -rf " + dirOrFile, { stdio: "inherit" }),
    );
  } else {
    fs.writeFileSync(
      path.resolve(rootDir, "scripts", "rebrander.js"),
      fs
        .readFileSync(path.resolve(rootDir, "scripts", "rebrander.js"), "utf-8")
        .replace("rm -rf ./lib/src/ && mv lib/src_template lib/src && ", ""),
    );

    execSync(
      `sed -i -e 's/const packageName = repo/const packageName = config.packageName/' scripts/rebrand.js`,
      { stdio: "inherit" },
    );
  }

  try {
    fs.writeFileSync(
      path.resolve(rootDir, "package.json"),
      JSON.stringify(rootPackageJSON, null, 2),
    );
  } catch (e) {
    console.error(e);
  }

  execSync(
    'git add . && git commit -m "Cleaned up rebrand scripts 💖 <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a> [skip ci]"',
    { stdio: "inherit" },
  );

  console.log("\x1b[32m", "90% of rebranding completed!");
  console.log("\x1b[36m%s", ".");
  console.log("\x1b[36m%s", ".");
  console.log(
    "\x1b[36m",
    "Please open TKB (Workspace) and clear the Kanban Board to complete setting up your repo.",
  );
  console.log("\x1b[36m", ".");
  console.log(
    "\x1b[35m",
    "To open TKB (Workspace) click on the `TKB (Workspace)` button on the vscode taskbar or follow these steps.",
  );
  console.log("\x1b[36m", ".");
  console.log("\x1b[36m", "  1. Press `Ctrl/command` + `Shift` + `P` to open the command palette.");
  console.log(
    "\x1b[36m",
    "  2. Type 'TrelloKanban: Workspace' and hit Enter to open the TKB (Workspace).",
  );
  console.log("\x1b[36m", ".");
  console.log("\x1b[36m", ".");
  console.log(
    "\x1b[33m",
    "If you have any issues, please raise an issue at https://github.com/md2docx/md2docx-plugin-template/issues",
  );
};

rebrandFn();
