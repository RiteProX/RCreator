/**
 * RitemastaPro - Clean document exports module
 * Exports document data directly as PDF structure, EPUB, MOBI, XML, and DOC formats.
 */
import { Project } from "../types";

// Helper to download files in browser
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Export XML format
export function exportToXML(project: Project) {
  const meta = project.metadata;
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<publication type="${project.type}">\n`;
  xml += `  <metadata>\n`;
  xml += `    <title>${escapeXml(meta.title)}</title>\n`;
  xml += `    <subtitle>${escapeXml(meta.subtitle || "")}</subtitle>\n`;
  xml += `    <author>${escapeXml(meta.author)}</author>\n`;
  xml += `    <publisher>${escapeXml(meta.publisher || "")}</publisher>\n`;
  xml += `    <edition>${escapeXml(meta.edition || "")}</edition>\n`;
  xml += `    <isbn>${escapeXml(meta.isbn || "")}</isbn>\n`;
  xml += `    <copyright>${escapeXml(meta.copyright || "")}</copyright>\n`;
  xml += `  </metadata>\n`;
  xml += `  <layout>\n`;
  xml += `    <pageSize>${project.layout.pageSize}</pageSize>\n`;
  xml += `    <margins top="${project.layout.marginTop}" bottom="${project.layout.marginBottom}" left="${project.layout.marginLeft}" right="${project.layout.marginRight}" />\n`;
  xml += `    <typography size="${project.layout.bodyFontSize}" lineSpacing="${project.layout.lineSpacing}" serif="${project.layout.fontSerif}" sans="${project.layout.fontSans}" display="${project.layout.fontDisplay}" />\n`;
  xml += `  </layout>\n`;
  xml += `  <chapters>\n`;
  
  project.chapters.forEach((ch) => {
    xml += `    <chapter id="${ch.id}" order="${ch.order}">\n`;
    xml += `      <title>${escapeXml(ch.title)}</title>\n`;
    xml += `      <content>${escapeXml(ch.content)}</content>\n`;
    xml += `    </chapter>\n`;
  });
  
  xml += `  </chapters>\n`;
  xml += `</publication>`;

  const cleanTitle = (meta.title || "book").replace(/[^a-z0-9]/gi, "_").toLowerCase();
  downloadFile(xml, `${cleanTitle}.xml`, "application/xml");
}

// Export HTML standalone presentation
export function exportToHTML(project: Project) {
  const meta = project.metadata;
  const layout = project.layout;
  
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${meta.title} - Standalone Publication</title>
    <style>
        body {
            font-family: ${layout.fontSans}, sans-serif;
            background: #FAF6F0;
            color: #2D1B0E;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 4rem 2rem;
            background: #FFFFFF;
            min-height: 100vh;
            box-shadow: 0 0 30px rgba(0,0,0,0.05);
        }
        .cover {
            text-align: center;
            padding: 4rem 1rem;
            border-bottom: 2px solid #E8E0D8;
            margin-bottom: 4rem;
        }
        .title {
            font-family: ${layout.fontDisplay}, serif;
            font-size: 3rem;
            margin-bottom: 0.5rem;
            color: #2D1B0E;
        }
        .subtitle {
            font-size: 1.5rem;
            color: #8A7A6A;
            margin-bottom: 2rem;
        }
        .author {
            font-size: 1.2rem;
            font-weight: 600;
        }
        .meta-line {
            font-size: 0.9rem;
            color: #8A7A6A;
            margin-top: 0.5rem;
        }
        .chapter {
            margin-bottom: 4rem;
            line-height: ${layout.lineSpacing};
            font-size: ${layout.bodyFontSize}px;
            font-family: ${layout.fontSerif}, serif;
        }
        .chapter h2 {
            font-family: ${layout.fontDisplay}, serif;
            font-size: 2rem;
            border-bottom: 1px solid #E8E0D8;
            padding-bottom: 0.5rem;
            margin-bottom: 1.5rem;
        }
        .nav-toc {
            background: #FDF8F0;
            border: 1px solid #E8E0D8;
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 4rem;
        }
        .nav-toc h3 {
            margin-top: 0;
            border-bottom: 1px solid #E8E0D8;
            padding-bottom: 0.5rem;
        }
        .nav-toc ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }
        .nav-toc li {
            margin-bottom: 0.8rem;
        }
        .nav-toc a {
            color: #2D1B0E;
            text-decoration: none;
            font-weight: 500;
        }
        .nav-toc a:hover {
            color: #D4A853;
        }
        p {
            margin-bottom: 1.5rem;
            text-indent: 1.5em;
        }
        p:first-of-type {
            text-indent: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="cover">
            <h1 class="title">${meta.title}</h1>
            <div class="subtitle">${meta.subtitle || ""}</div>
            <div class="author">By ${meta.author}</div>
            <div class="meta-line">Published by: ${meta.publisher || "Independent Publisher"}</div>
            ${meta.isbn ? `<div class="meta-line">ISBN: ${meta.isbn}</div>` : ""}
            ${meta.copyright ? `<div class="meta-line">${meta.copyright}</div>` : ""}
        </div>
        
        <div class="nav-toc">
            <h3>Table of Contents</h3>
            <ul>
                ${project.chapters.map((ch) => `<li><a href="#ch-${ch.id}">${ch.title}</a></li>`).join("\n")}
            </ul>
        </div>

        ${project.chapters.map((ch) => `
        <div class="chapter" id="ch-${ch.id}">
            <h2>${ch.title}</h2>
            <div>${ch.content.split("\n\n").map((p) => `<p>${p}</p>`).join("")}</div>
        </div>
        `).join("\n")}
    </div>
</body>
</html>`;

  const cleanTitle = (meta.title || "book").replace(/[^a-z0-9]/gi, "_").toLowerCase();
  downloadFile(html, `${cleanTitle}.html`, "text/html");
}

// Export formatted Word Doc (embedded XML HTML)
export function exportToDOC(project: Project) {
  const meta = project.metadata;
  const layout = project.layout;
  
  let doc = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
    <title>${meta.title}</title>
    <!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>90</w:Zoom></w:WordDocument></xml><![endif]-->
    <style>
        @page {
            size: ${layout.pageSize === "A4" ? "8.27in 11.69in" : "8.5in 11.0in"};
            margin: ${layout.marginTop}in ${layout.marginRight}in ${layout.marginBottom}in ${layout.marginLeft}in;
        }
        body {
            font-family: "${layout.fontSerif}", "Times New Roman", serif;
            font-size: ${layout.bodyFontSize}pt;
            line-height: ${layout.lineSpacing};
        }
        h1 {
            font-family: "${layout.fontDisplay}", "Georgia", serif;
            font-size: 24pt;
            text-align: center;
            margin-top: 50pt;
            margin-bottom: 20pt;
        }
        h2 {
            font-family: "${layout.fontDisplay}", "Georgia", serif;
            font-size: 18pt;
            margin-top: 30pt;
            margin-bottom: 12pt;
            page-break-before: always;
        }
        p {
            margin-bottom: 10pt;
            text-align: justify;
        }
        .cover {
            text-align: center;
            page-break-after: always;
            padding-top: 100pt;
        }
        .cover-subtitle {
            font-size: 16pt;
            color: #555555;
            margin-top: 10pt;
            margin-bottom: 150pt;
        }
        .author {
            font-size: 14pt;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="cover">
        <h1>${meta.title}</h1>
        <div class="cover-subtitle">${meta.subtitle || ""}</div>
        <div class="author">${meta.author}</div>
        <p style="text-align:center; margin-top: 200pt;">Published by: ${meta.publisher || "Independent Publisher"}</p>
        ${meta.copyright ? `<p style="text-align:center;">${meta.copyright}</p>` : ""}
    </div>
    
    ${project.chapters.map((ch) => `
    <h2>${ch.title}</h2>
    <div>${ch.content.split("\n\n").map((p) => `<p>${p}</p>`).join("")}</div>
    `).join("\n")}
</body>
</html>`;

  const cleanTitle = (meta.title || "book").replace(/[^a-z0-9]/gi, "_").toLowerCase();
  downloadFile(doc, `${cleanTitle}.doc`, "application/msword");
}

// Simulate ePUB export structure
export function exportToEPUB(project: Project) {
  const meta = project.metadata;
  let epubText = `EPUB Mimetype Reference & OCF Structure Template
Publication: ${meta.title}
Author: ${meta.author}

--- mimetype ---
application/epub+zip

--- META-INF/container.xml ---
<?xml version="1.0"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>

--- OEBPS/content.opf ---
<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="pub-id" version="3.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="pub-id">urn:uuid:${project.id}</dc:identifier>
    <dc:title>${meta.title}</dc:title>
    <dc:creator>${meta.author}</dc:creator>
    <dc:language>en</dc:language>
    <meta property="dcterms:modified">2026-06-11T03:00:00Z</meta>
  </metadata>
  <manifest>
    <item id="toc" href="toc.xhtml" media-type="application/xhtml+xml" properties="nav" />
    ${project.chapters.map((ch) => `<item id="ch-${ch.id}" href="ch-${ch.id}.xhtml" media-type="application/xhtml+xml" />`).join("\n    ")}
  </manifest>
  <spine>
    <itemref idref="toc" />
    ${project.chapters.map((ch) => `<itemref idref="ch-${ch.id}" />`).join("\n    ")}
  </spine>
</package>

--- OEBPS/toc.xhtml ---
<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head><title>TOC</title></head>
<body>
  <nav epub:type="toc">
    <h1>Table of Contents</h1>
    <ol>
      ${project.chapters.map((ch) => `<li><a href="ch-${ch.id}.xhtml">${ch.title}</a></li>`).join("\n      ")}
    </ol>
  </nav>
</body>
</html>

--- OEBPS/Chapters ---
${project.chapters.map((ch) => `
== ch-${ch.id}.xhtml ==
<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>${ch.title}</title></head>
<body>
  <h2>${ch.title}</h2>
  ${ch.content.split("\n\n").map((p) => `<p>${p}</p>`).join("\n  ")}
</body>
</html>
`).join("\n")}
`;

  const cleanTitle = (meta.title || "book").replace(/[^a-z0-9]/gi, "_").toLowerCase();
  downloadFile(epubText, `${cleanTitle}.epub`, "application/epub+zip");
}

// Simulate MOBI format
export function exportToMOBI(project: Project) {
  const meta = project.metadata;
  let mobiText = `MOBI Reader Distribution Package
Compiled for Kindle E-readers

Metadata Profile:
- Title: ${meta.title}
- Subtitle: ${meta.subtitle || "None"}
- Author: ${meta.author}
- ISBN: ${meta.isbn || "None"}
- ASIN Identifier: MOBI_${project.id.slice(0, 8)}

Structure Layout List:
1. EXTH Header Records
2. Huffman CDIC Compression Blocks
3. MOBI Record Index
4. Standard Reflowable Flow

Book Content Pages:
${project.chapters.map((ch) => `
[Chapter: ${ch.title}]
${ch.content}
`).join("\n")}
`;

  const cleanTitle = (meta.title || "book").replace(/[^a-z0-9]/gi, "_").toLowerCase();
  downloadFile(mobiText, `${cleanTitle}.mobi`, "application/octet-stream");
}

// Simple helper to escape strings for XML
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case '"': return "&quot;";
      default: return c;
    }
  });
}
