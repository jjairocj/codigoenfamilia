with open('src/components/MissionDetailClient.tsx', 'r') as f:
    text = f.read()

text = text.replace('href={}', 'href={`/downloads/pasaporte-${mission.level}.pdf`}')

with open('src/components/MissionDetailClient.tsx', 'w') as f:
    f.write(text)

print('Successfully fixed href!')
