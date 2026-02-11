/**
 * build-html.js — Process source HTML files for dist/
 *
 * SPA mode: only index.html gets full processing (remove CDN refs, inject bundle).
 * Redirect stubs (analisis.html, analisis-dolomita.html) are copied as-is.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SRC_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(__dirname, '..', 'dist');

// Compute short MD5 hash of built assets for cache busting
function fileHash(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(content).digest('hex').slice(0, 8);
}

const cssHash = fileHash(path.join(DIST_DIR, 'css', 'styles.min.css'));
const jsHash = fileHash(path.join(DIST_DIR, 'js', 'bundle.min.js'));
console.log(`  Cache busting: css=${cssHash} js=${jsHash}`);

// --- Process index.html (full SPA) ---

const HTML_FILES = ['index.html'];

// Lines to remove (matched by substring)
const REMOVE_PATTERNS = [
  '<!-- Tailwind CSS (compiled) -->',
  'href="css/tailwind.css"',
  'src="js/components.js"',
  'src="js/main.js"',
  '<!-- Custom Styles (async) -->',
  'href="css/styles.css" media="print"',
  '<!-- AOS Animations (async) -->',
  'unpkg.com/aos',
  '<!-- Alpine.js -->',
  'cdn.jsdelivr.net/npm/alpinejs',
];

// Lines to inject before </head> (with cache-busting hashes)
const INJECT = [
  `    <link rel="stylesheet" href="css/styles.min.css?v=${cssHash}" media="print" onload="this.media='all'">`,
  `    <script defer src="js/bundle.min.js?v=${jsHash}"></script>`,
].join('\n');

for (const file of HTML_FILES) {
  let html = fs.readFileSync(path.join(SRC_DIR, file), 'utf8');

  // Remove lines matching any pattern
  const lines = html.split('\n');
  const filtered = lines.filter(line => {
    return !REMOVE_PATTERNS.some(pat => line.includes(pat));
  });
  html = filtered.join('\n');

  // Collapse multiple consecutive blank lines into one
  html = html.replace(/\n{3,}/g, '\n\n');

  // Update preload for styles.css → styles.min.css with hash (index.html has it)
  html = html.replace(
    '<link rel="preload" href="css/styles.css" as="style">',
    `<link rel="preload" href="css/styles.min.css?v=${cssHash}" as="style">`
  );

  // Inject bundled assets before </head>
  html = html.replace('</head>', INJECT + '\n</head>');

  fs.writeFileSync(path.join(DIST_DIR, file), html, 'utf8');
  console.log(`  ✓ ${file}`);
}

// --- Copy redirect stubs as-is ---

const STUBS = ['analisis.html', 'analisis-dolomita.html'];
for (const stub of STUBS) {
  fs.copyFileSync(path.join(SRC_DIR, stub), path.join(DIST_DIR, stub));
  console.log(`  ✓ ${stub} (redirect stub)`);
}

console.log('HTML processing complete.');
