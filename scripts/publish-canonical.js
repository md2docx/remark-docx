const { execSync } = require("child_process");

// Publish canonical packages
["@md2docx/remark-docx", "@mdast2docx/remark-docx"].forEach(pkg => {
  execSync(`sed -i -e "s/name.*/name\\": \\"${pkg.replace(/\//g, "\\\\/")}\\",/" lib/package.json`);
  execSync("cd lib && npm publish --provenance --access public");
});
