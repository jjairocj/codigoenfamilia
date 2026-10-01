with open('src/app/conceptos/[id]/page.tsx', 'r') as f:
    text = f.read()

# Replace any multi-line split("...") or replace("...")
text = text.replace('split(" \n ")', 'split("\\n")')
text = text.replace('split("\n")', 'split("\\n")')
text = text.replace('split("\n\n")', 'split("\\n\\n")')

# Let's inspect where literal newlines inside quotes exist
lines = text.splitlines(keepends=True)
fixed_lines = []
i = 0
while i < len(lines):
    line = lines[i]
    if line.endswith('split("\n'):
        # next line is likely '")' or '")) {'
        next_line = lines[i+1] if i+1 < len(lines) else ''
        fixed_lines.append(line.rstrip('\n') + '\\n' + next_line)
        i += 2
        continue
    elif line.endswith('split("\n\n'):
        next_line = lines[i+1] if i+1 < len(lines) else ''
        fixed_lines.append(line.rstrip('\n') + '\\n\\n' + next_line)
        i += 2
        continue
    fixed_lines.append(line)
    i += 1

text = "".join(fixed_lines)
with open('src/app/conceptos/[id]/page.tsx', 'w') as f:
    f.write(text)

print('Checked and updated lines!')
