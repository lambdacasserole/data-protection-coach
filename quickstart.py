from typing import List, Optional
from string import Template


def ask(prompt: str, allowed: Optional[List[str]] = None):
    buffer = input(f'{prompt} ')
    while allowed is not None and buffer not in allowed:
        print(f"That option is not supported. Supported options are: {','.join(allowed)}")
        buffer = input(prompt)
    return buffer

def read_all(path: str):
    with open(path) as f:
        return f.read()
    
def write_all(path: str, contents: str):
    with open(path, 'w') as f:
        f.write(contents)
    
def read_and_fill(path: str, d: dict):
    return Template(read_all(path)).substitute(d)

def enumize(p: str):
    return p.replace(' ', '_').upper()

service_name = ask("What do you want to call your app?")
service_description = ask("Describe your app in a few words:")
service_topic = ask("What topic does your service cover? (e.g. GDPR, health and safety, business ethics)")

prompt_type_1 = ask("Enter your first prompt type (e.g. job role, company size, business sector):")
prompt_type_2 = ask("Enter your second prompt type (e.g. job role, company size, business sector):")
prompt_type_3 = ask("Enter your third prompt type (e.g. job role, company size, business sector):")

chosen_color = ask("Which colour should your app be? (choose from orange, green, red, purple, blue)")

d = {
    'serviceName': service_name,
    'serviceDescription': service_description,
    'serviceTopic': service_topic,
    'promptType1': prompt_type_1,
    'promptTypeEnum1': enumize(prompt_type_1),
    'promptType2': prompt_type_2,
    'promptTypeEnum2': enumize(prompt_type_2),
    'promptType3': prompt_type_3,
    'promptTypeEnum3': enumize(prompt_type_3),
    'chosenColor': chosen_color,
}

h = read_and_fill('templates/index.tsx.template', d)
q = read_and_fill('templates/query.ts.template', d)
s = read_and_fill('templates/schema.prisma.template', d)
b = read_and_fill('templates/CheckButton.tsx.template', d)

write_all('src/pages/index.tsx', h)
write_all('src/server/api/routers/query.ts', q)
write_all('prisma/schema.prisma', s)
write_all('src/components/CheckButton.tsx', b)
