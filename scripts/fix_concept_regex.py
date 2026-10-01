with open('src/app/conceptos/[id]/page.tsx', 'r') as f:
    text = f.read()

# Replace broken regexes
broken_1 = '''  let clean = body
    .replace(/^#\\s+[^
]+
+/, "")'''
fixed_1 = '''  let clean = body
    .replace(/^#\\s+[^\\n]+\\n+/, "")'''

broken_2 = '''  const adultMatch = clean.match(/>\\s*👩‍👧\\s*\\*\\*Para el adulto\\*\\*([\\s\\S]*?)(?=(?:
##|
---|$))/);'''
fixed_2 = '''  const adultMatch = clean.match(/>\\s*👩‍👧\\s*\\*\\*Para el adulto\\*\\*([\\s\\S]*?)(?=(?:\\n##|\\n---|$))/);'''

text = text.replace(broken_1, fixed_1)
text = text.replace(broken_2, fixed_2)

with open('src/app/conceptos/[id]/page.tsx', 'w') as f:
    f.write(text)

print('Successfully fixed regexes in concept page!')
