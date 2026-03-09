#!/usr/bin/env python3
"""
Convert AI Trading Playbook to HTML (browser-printable as PDF)
No LaTeX or pandoc required!
"""

import re

def markdown_to_html(md_content):
    """Simple Markdown to HTML converter"""
    html = md_content
    
    # Handle front matter
    html = re.sub(r'^---\n.*?---\n', '', html, flags=re.DOTALL)
    
    # Convert headers
    html = re.sub(r'^# (.+)$', r'<h1>\1</h1>', html, flags=re.MULTILINE)
    html = re.sub(r'^## (.+)$', r'<h2>\1</h2>', html, flags=re.MULTILINE)
    html = re.sub(r'^### (.+)$', r'<h3>\1</h3>', html, flags=re.MULTILINE)
    html = re.sub(r'^#### (.+)$', r'<h4>\1</h4>', html, flags=re.MULTILINE)
    
    # Convert bold
    html = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', html)
    
    # Convert italic
    html = re.sub(r'\*(.+?)\*', r'<em>\1</em>', html)
    
    # Convert inline code
    html = re.sub(r'`([^`]+)`', r'<code>\1</code>', html)
    
    # Convert code blocks
    html = re.sub(r'```python\n(.+?)```', r'<pre class="python"><code>\1</code></pre>', html, flags=re.DOTALL)
    html = re.sub(r'```\n(.+?)```', r'<pre><code>\1</code></pre>', html, flags=re.DOTALL)
    
    # Convert tables
    html = convert_tables(html)
    
    # Convert images FIRST (before links, because link regex would capture !)
    html = re.sub(r'!\[(.*?)\]\((.+?)\)', r'<img src="\2" alt="\1">', html)
    
    # Convert links
    html = re.sub(r'\[(.+?)\]\((.+?)\)', r'<a href="\2">\1</a>', html)
    
    # Convert unordered lists
    html = convert_lists(html)
    
    # Convert blockquotes
    html = re.sub(r'^> (.+)$', r'<blockquote>\1</blockquote>', html, flags=re.MULTILINE)
    
    # Convert horizontal rules
    html = re.sub(r'^---+$', r'<hr>', html, flags=re.MULTILINE)
    
    # Wrap paragraphs
    html = wrap_paragraphs(html)
    
    return html

def convert_tables(text):
    """Convert markdown tables to HTML"""
    lines = text.split('\n')
    result = []
    in_table = False
    table_html = []
    
    for line in lines:
        if '|' in line and not line.strip().startswith('##'):
            if not in_table:
                in_table = True
                table_html = ['<table>']
            
            # Skip separator line
            if '|' in line and '-' in line and all(c in '|-:\s' for c in line):
                continue
            
            cells = [cell.strip() for cell in line.split('|')[1:-1]]
            row_html = '<tr>' + ''.join(f'<td>{cell}</td>' for cell in cells) + '</tr>'
            table_html.append(row_html)
        else:
            if in_table:
                table_html.append('</table>')
                result.append('\n'.join(table_html))
                in_table = False
            result.append(line)
    
    if in_table:
        table_html.append('</table>')
        result.append('\n'.join(table_html))
    
    return '\n'.join(result)

def convert_lists(text):
    """Convert markdown lists to HTML"""
    lines = text.split('\n')
    result = []
    in_list = False
    
    for line in lines:
        if line.strip().startswith('- ') or line.strip().startswith('* '):
            if not in_list:
                in_list = True
                result.append('<ul>')
            content = line.strip()[2:]
            result.append(f'<li>{content}</li>')
        elif in_list and line.strip() == '':
            in_list = False
            result.append('</ul>')
            result.append(line)
        else:
            if in_list:
                in_list = False
                result.append('</ul>')
            result.append(line)
    
    if in_list:
        result.append('</ul>')
    
    return '\n'.join(result)

def wrap_paragraphs(text):
    """Wrap plain text in paragraphs"""
    lines = text.split('\n')
    result = []
    para = []
    
    block_tags = ['<h', '<ul>', '<pre>', '<table>', '<blockquote>', '<hr', '</ul>', '</table>', '<img']
    
    for line in lines:
        stripped = line.strip()
        is_block = any(stripped.startswith(tag) for tag in block_tags)
        
        if stripped == '' or is_block:
            if para:
                result.append('<p>' + ' '.join(para) + '</p>')
                para = []
            if stripped != '':
                result.append(line)
        else:
            para.append(line)
    
    if para:
        result.append('<p>' + ' '.join(para) + '</p>')
    
    return '\n'.join(result)

def create_full_html(content):
    """Create complete HTML document"""
    css = """
    @page {
        size: 8.5in 11in;
        margin: 1in;
    }
    
    * {
        box-sizing: border-box;
    }
    
    body {
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 11pt;
        line-height: 1.6;
        color: #333;
        max-width: 7.5in;
        margin: 0 auto;
        padding: 0.5in;
    }
    
    img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 1em auto;
        text-align: center;
        page-break-inside: avoid;
    }
    
    h1 {
        color: #1a1a1a;
        font-size: 28pt;
        margin-top: 0;
        margin-bottom: 0.5em;
        text-align: center;
        page-break-before: avoid;
    }
    
    h2 {
        color: #2c3e50;
        font-size: 18pt;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        border-bottom: 2px solid #3498db;
        padding-bottom: 0.2em;
        page-break-after: avoid;
    }
    
    h3 {
        color: #34495e;
        font-size: 14pt;
        margin-top: 1.2em;
        page-break-after: avoid;
    }
    
    p {
        margin-bottom: 0.8em;
        text-align: justify;
    }
    
    ul {
        margin-bottom: 1em;
        padding-left: 2em;
    }
    
    li {
        margin-bottom: 0.4em;
    }
    
    code {
        font-family: 'Courier New', monospace;
        background: #f4f4f4;
        padding: 2px 5px;
        border-radius: 3px;
        font-size: 0.9em;
    }
    
    pre {
        background: #2d2d2d;
        color: #f8f8f2;
        padding: 1em;
        border-radius: 5px;
        overflow-x: auto;
        margin: 1em 0;
        font-size: 9pt;
        line-height: 1.4;
        page-break-inside: avoid;
    }
    
    pre code {
        background: none;
        padding: 0;
        color: inherit;
    }
    
    table {
        width: 100%;
        border-collapse: collapse;
        margin: 1em 0;
        page-break-inside: avoid;
    }
    
    td, th {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }
    
    th {
        background-color: #f5f5f5;
        font-weight: bold;
    }
    
    tr:nth-child(even) {
        background-color: #fafafa;
    }
    
    blockquote {
        border-left: 4px solid #3498db;
        margin: 1em 0;
        padding: 0.5em 1em;
        background: #f8f9fa;
        font-style: italic;
    }
    
    hr {
        border: none;
        border-top: 1px solid #ddd;
        margin: 2em 0;
    }
    
    strong {
        color: #2c3e50;
    }
    
    a {
        color: #3498db;
        text-decoration: none;
    }
    
    a:hover {
        text-decoration: underline;
    }
    
    .cover {
        text-align: center;
        page-break-after: always;
    }
    
    .cover h1 {
        font-size: 36pt;
        margin-top: 2in;
    }
    
    .cover .subtitle {
        font-size: 14pt;
        color: #666;
        margin-top: 1em;
    }
    
    .cover .meta {
        margin-top: 2em;
        color: #999;
    }
    
    @media print {
        body {
            padding: 0;
        }
    }
    """
    
    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Trading Playbook</title>
    <style>{css}</style>
</head>
<body>
{content}
</body>
</html>'''
    
    return html

def main():
    print("="*60)
    print("🚀 AI Trading Playbook - HTML/PDF Generator")
    print("="*60)
    
    # Read the markdown file
    with open('products/AI_Trading_Playbook_v1.md', 'r') as f:
        md_content = f.read()
    
    print("📖 Converting markdown to HTML...")
    
    # Convert to HTML
    body_content = markdown_to_html(md_content)
    
    # Create full HTML document
    full_html = create_full_html(body_content)
    
    # Save HTML file
    html_path = 'playbook.html'
    with open(html_path, 'w') as f:
        f.write(full_html)
    
    print(f"✅ HTML created: {html_path}")
    print("")
    print("="*60)
    print("📋 To create PDF:")
    print("="*60)
    print("1. Open playbook.html in Chrome/Firefox/Edge")
    print("2. Press Ctrl+P (or Cmd+P on Mac)")
    print("3. Select 'Save as PDF' as destination")
    print("4. Set: Paper Size = Letter, Margins = Default")
    print("5. Click Save")
    print("")
    print("📧 Alternative: View in browser and share link")
    print("="*60)

if __name__ == '__main__':
    main()
