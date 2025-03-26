const fs = require("fs");
const path = require("path");
const { packageName, owner, repo, title } = require("./rebrand.config.json");
const packageJSON = require("../lib/package.json");

const rootDir = process.cwd();
const oldPkgName = packageJSON.name;
const [oldOwner, oldRepo] = packageJSON.repository.split(":")[1].split("/");

// update canonicals
const canonicalPath = path.resolve(rootDir, "scripts", "publish-canonical.js");
const canonicalContent = fs.readFileSync(canonicalPath, "utf-8");
if (packageName.startsWith("@m2d/") && oldPkgName.split("/")[1]) {
  fs.writeFileSync(
    canonicalPath,
    canonicalContent.replaceAll(oldPkgName.split("/")[1], packageName.split("/")[1]),
  );
} else {
  fs.writeFileSync(canonicalPath, canonicalContent.replace(/\[.*?\]/, "[]"));
}

// Update test file
const oldPluginName = oldPkgName.split("/")[1] || oldPkgName;
const pluginName = packageName.split("/")[1] || packageName;

const testFilePath = path.resolve(rootDir, "lib", "__tests__", "index.test.ts");
const testFileContent = fs.readFileSync(testFilePath, "utf-8");
fs.writeFileSync(testFilePath, testFileContent.replace(new RegExp(oldPluginName, "g"), pluginName));

// Update src_template
const srcTemplatePath = path.resolve(rootDir, "lib", "src_template", "index.ts");
const srcTemplateContent = fs.readFileSync(srcTemplatePath, "utf-8");
fs.writeFileSync(
  srcTemplatePath,
  srcTemplateContent
    .replace(new RegExp(oldPluginName, "g"), pluginName)
    .replace(
      new RegExp(oldPluginName[0].toUpperCase() + oldPluginName.slice(1), "g"),
      pluginName[0].toUpperCase() + pluginName.slice(1),
    ),
);

// Rebrand lib packageJSON
packageJSON.name = packageName;
packageJSON.description = "";
packageJSON.version = "0.0.0";
packageJSON.repository = `github:${owner}/${repo}`;
packageJSON.funding.pop();
packageJSON.bugs = `https://github.com/${owner}/${repo}/issues`;
packageJSON.homepage = `https://github.com/${owner}/${repo}/#readme`;
packageJSON.funding.unshift({
  type: "github",
  url: `https://github.com/sponsors/${owner}`,
});
packageJSON.keywords = packageJSON.keywords.slice(5);

fs.writeFileSync(
  path.resolve(rootDir, "lib", "package.json"),
  JSON.stringify(packageJSON, null, 2),
);

const updatePkgAndRemoveChangelogs = dir => {
  // update package.json for packages and examples
  const pkgPath = path.resolve(dir, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  pkg.version = "0.0.0";
  if (pkg.dependencies?.[oldPkgName]) {
    pkg.dependencies[oldPkgName] = "latest";
    pkg.dependencies[packageJSON.name] = "workspace:*";
  } else if (pkg.devDependencies?.[oldPkgName]) {
    pkg.devDependencies[oldPkgName] = "latest";
    pkg.dependencies[packageJSON.name] = "workspace:*";
  }

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

  // Delete old changelogs
  try {
    fs.unlinkSync(path.resolve(dir, "CHANGELOG.md"));
  } catch {
    /* empty */
  }
};

["examples", "packages"].forEach(dir => {
  fs.readdirSync(path.resolve(rootDir, dir)).forEach(f =>
    updatePkgAndRemoveChangelogs(path.resolve(rootDir, dir, f)),
  );
});

try {
  fs.unlinkSync(path.resolve(rootDir, "lib", "CHANGELOG.md"));
} catch {
  /* empty */
}

// Update README
const readme = fs
  .readFileSync(path.resolve(rootDir, "lib", "README.md"), "utf-8")
  .replace(new RegExp(oldPkgName, "g"), packageName)
  .replace(new RegExp(oldOwner, "g"), owner)
  .replace(new RegExp(oldRepo, "g"), repo)
  .replace(new RegExp(oldPkgName.replace("-", " "), "ig"), title)
  .replace(/> This package also.*[^\n]/, "");
fs.writeFileSync(path.resolve(rootDir, "README.md"), readme);
fs.writeFileSync(path.resolve(rootDir, "lib", "README.md"), readme);

// Update page title
const pageFilePath = path.resolve(rootDir, "examples", "nextjs", "src", "app", "page.tsx");
const pageCode = fs.readFileSync(pageFilePath, "utf-8").replace("React 18 Loaders", title);
fs.writeFileSync(pageFilePath, pageCode);

// Update TODO.md
const touchupTodo = content =>
  content
    .replaceAll(
      "[repository secret]",
      `[repository secret]((https://github.com/${owner}/${repo}/settings/secrets/actions))`,
    )
    .replace(
      "[private vulnerability reporting]",
      `[private vulnerability reporting](https://github.com/${owner}/${repo}/security)`,
    )
    .replace("- [ ] Create a new GitHub repository", "- [x] Create a new GitHub repository");

const todoPath = path.resolve(rootDir, "TODO.md");
fs.writeFileSync(todoPath, touchupTodo(fs.readFileSync(todoPath, "utf-8")));

const tkbPath = path.resolve(rootDir, ".tkb");
fs.writeFileSync(tkbPath, touchupTodo(fs.readFileSync(tkbPath, "utf-8")));
fs.renameSync(tkbPath, tkbPath);

// Update Funding
const fundingPath = path.resolve(rootDir, ".github", "FUNDING.yml");
fs.writeFileSync(
  fundingPath,
  fs
    .readFileSync(fundingPath, "utf-8")
    .replace("github: [mayank1513]", `github: [${owner}, mayank1513]`),
);

// Update workflows
const workflowsPath = path.resolve(rootDir, ".github", "workflows");
/** Update publish and manual-publish workflows */
const updatePublishFlow = name => {
  const publishWorkflowPath = path.resolve(workflowsPath, name);
  const publishWorkflow = fs
    .readFileSync(publishWorkflowPath, "utf-8")
    .replace("# - name", "- name")
    .replace("# run", "  run")
    .replace(oldOwner, owner);
  fs.writeFileSync(publishWorkflowPath, publishWorkflow);
};

updatePublishFlow("publish.yml");
updatePublishFlow("manual-publish.yml");

try {
  fs.unlinkSync(path.resolve(workflowsPath, "setup.yml"));
} catch {
  // empty
}

// Update SECURITY.md
const secFile = path.resolve(rootDir, "SECURITY.md");
fs.writeFileSync(
  secFile,
  fs.readFileSync(secFile, "utf-8").replace(`${oldOwner}/${oldRepo}`, `${owner}/${repo}`),
);
// clean up
const { execSync } = require("child_process");

console.log("\x1b[32m", "re-installing dependencies after updates...");
// reinstall dependencies --> this will update the pnpm-lock file as well which we need to add to commit
execSync("pnpm i", { stdio: "inherit" });

console.log("\x1b[32m", "cleaning up the lib/src and committing to repo...");
// clean lib/src and create commit
execSync(
  'rm -rf ./lib/src/ && mv lib/src_template lib/src && git add . && git commit -m "Rebrand 💖 <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a> [skip ci]" && turbo telemetry disable',
  { stdio: "inherit" },
);
