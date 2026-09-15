export const markdownToHtml = (markdown) => {
  if (!markdown) return '';

  const escapeHtml = (text) =>
    text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const lines = markdown.split(/\r?\n/);
  const html = [];
  
  let inCode = false;
  let codeLang = '';
  let codeLines = [];
  
  let inList = false;
  let listType = ''; // 'ul' or 'ol'
  
  let inTable = false;
  let tableRows = [];

  const flushTable = () => {
    if (!tableRows.length) return '';
    const header = tableRows[0].map((cell) => `<th>${cell.trim()}</th>`).join('');
    const body = tableRows.slice(1).map((row) => `<tr>${row.map((cell) => `<td>${cell.trim()}</td>`).join('')}</tr>`).join('');
    tableRows = [];
    inTable = false;
    return `<div class="blog-table-wrapper"><table class="blog-table"><thead><tr>${header}</tr></thead><tbody>${body}</tbody></table></div>`;
  };

  const flushList = () => {
    if (!inList) return '';
    inList = false;
    const tag = listType;
    listType = '';
    return `</${tag}>`;
  };

  const parseInline = (text) => {
    return text
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\$\$(.+?)\$\$/g, '<span class="blog-math blog-math--block">$1</span>')
      .replace(/\$([^$]+)\$/g, '<span class="blog-math">$1</span>');
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // 1. Code Block Handling
    if (trimmed.startsWith('```')) {
      // Close any open lists/tables first
      html.push(flushList());
      html.push(flushTable());

      if (inCode) {
        // End of code block
        const codeContent = escapeHtml(codeLines.join('\n'));
        html.push(`
          <div class="blog-code-container">
            <div class="blog-code-header">
              <span class="blog-code-lang">${codeLang || 'code'}</span>
              <button class="blog-copy-code-btn" aria-label="Copy code">
                <i class="fa-regular fa-copy"></i>
                <span>Copy</span>
              </button>
            </div>
            <pre class="blog-code-block"><code class="language-${codeLang || 'text'}">${codeContent}</code></pre>
          </div>
        `);
        inCode = false;
        codeLang = '';
        codeLines = [];
      } else {
        // Start of code block
        inCode = true;
        codeLang = trimmed.substring(3).trim().toLowerCase();
      }
      continue;
    }

    if (inCode) {
      codeLines.push(rawLine);
      continue;
    }

    // 2. Callout Box Handling
    if (trimmed.startsWith(':::')) {
      html.push(flushList());
      html.push(flushTable());
      
      const match = trimmed.match(/^:::\s*(note|info|warning|success)/);
      if (match) {
        const type = match[1];
        let title = type.toUpperCase();
        let icon = 'fa-circle-info';
        if (type === 'warning') icon = 'fa-triangle-exclamation';
        if (type === 'success') icon = 'fa-circle-check';
        if (type === 'note') icon = 'fa-pen-to-square';

        html.push(`
          <div class="blog-callout blog-callout--${type}">
            <div class="blog-callout__header">
              <i class="fa-solid ${icon}"></i>
              <span class="blog-callout__title">${title}</span>
            </div>
            <div class="blog-callout__content">
        `);
      } else {
        // End of callout box
        html.push(`
            </div>
          </div>
        `);
      }
      continue;
    }

    // 3. Headers
    const headerMatch = rawLine.match(/^(#{1,6})\s+(.+)$/);
    if (headerMatch) {
      html.push(flushList());
      html.push(flushTable());
      const level = headerMatch[1].length;
      const text = headerMatch[2].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      html.push(`<h${level} id="${id}">${parseInline(escapeHtml(text))}</h${level}>`);
      continue;
    }

    // 4. Blockquotes
    if (trimmed.startsWith('>')) {
      html.push(flushList());
      html.push(flushTable());
      const quoteText = rawLine.replace(/^>\s*/, '');
      html.push(`<blockquote>${parseInline(escapeHtml(quoteText))}</blockquote>`);
      continue;
    }

    // 5. Tables
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      html.push(flushList());
      const cells = trimmed.split('|').slice(1, -1);
      if (cells.every(cell => cell.trim().startsWith('-'))) {
        // Divider row, skip
        continue;
      }
      inTable = true;
      tableRows.push(cells.map(c => parseInline(escapeHtml(c.trim()))));
      continue;
    } else if (inTable) {
      html.push(flushTable());
    }

    // 6. Lists
    const unorderedMatch = rawLine.match(/^([*-])\s+(.+)$/);
    const orderedMatch = rawLine.match(/^(\d+)\.\s+(.+)$/);

    if (unorderedMatch || orderedMatch) {
      html.push(flushTable());
      const currentListType = unorderedMatch ? 'ul' : 'ol';
      const itemContent = parseInline(escapeHtml((unorderedMatch || orderedMatch)[2]));

      if (!inList) {
        inList = true;
        listType = currentListType;
        html.push(`<${listType}>`);
      } else if (listType !== currentListType) {
        html.push(flushList());
        inList = true;
        listType = currentListType;
        html.push(`<${listType}>`);
      }

      html.push(`<li>${itemContent}</li>`);
      continue;
    } else if (inList) {
      html.push(flushList());
    }

    // 7. Images
    const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      const caption = imageMatch[1];
      const src = imageMatch[2];
      html.push(`
        <figure class="blog-figure">
          <img src="${src}" alt="${caption}" loading="lazy" />
          ${caption ? `<figcaption>${parseInline(escapeHtml(caption))}</figcaption>` : ''}
        </figure>
      `);
      continue;
    }

    // 8. Plain Paragraphs
    if (trimmed !== '') {
      html.push(`<p>${parseInline(escapeHtml(trimmed))}</p>`);
    }
  }

  // Final flushes
  html.push(flushList());
  html.push(flushTable());

  return html.join('\n');
};

export const extractHeadings = (markdown) => {
  const headings = [];
  if (!markdown) return headings;
  const lines = markdown.split(/\r?\n/);
  lines.forEach((line) => {
    const match = line.match(/^(#{2,4})\s+(.+)$/);
    if (match) {
      headings.push({
        level: match[1].length,
        text: match[2].trim(),
        id: match[2].trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
      });
    }
  });
  return headings;
};
