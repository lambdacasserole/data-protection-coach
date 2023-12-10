import os
from typing import List, Optional
from string import Template


def print_title_card ():
    """ Prints the title card for the utility.
    """
    print('\n'.join([
        "                          ____        _      _        _             _    ",
        "     /\                  / __ \      (_)    | |      | |           | |   ",
        "    /  \   _ __  _ __   | |  | |_   _ _  ___| | _____| |_ __ _ _ __| |_  ",
        "   / /\ \ | '_ \| '_ \  | |  | | | | | |/ __| |/ / __| __/ _` | '__| __| ",
        "  / ____ \| |_) | |_) | | |__| | |_| | | (__|   <\__ \ || (_| | |  | |_  ",
        " /_/    \_\ .__/| .__/   \___\_\\__,_|_|\___|_|\_\___/\__\__,_|_|   \__| ",
        "          | |   | |                                                      ",
        "          |_|   |_|        Let's get your AI-powered app off the ground! ",
        "                                            Utllity by Saul Johnson v1.0 ",
        "                                                                         ",
        "This utility will quickly scaffold your AI-powered web app to get you up ",
        "and running right away.                                                  ",
        "                                                                         ",
        "Answer the following questions to get started:                           ",
        "                                                                         ",
    ]))


def ask(prompt: str, allowed: Optional[List[str]] = None):
    """ Asks a question until one of an optional approved list of options is entered.
    Args:
        prompt (str): The prompt (question) to ask the user.
        allowed (Optional[List[str]]): The approved list of options.
    Returns:
        str: The user's input.
    """
    buffer = input(f'{prompt} ')

    # Loop until an allowed answer is selected (if a list of allowed answers was passed).
    while allowed is not None and buffer not in allowed:
        print(f"That option is not supported. Supported options are: {','.join(allowed)}")
        buffer = input(prompt)
    return buffer


def read_all(path: str):
    """ Reads the entire contents of a text file and returns it.
    Args:
        path (str): The path of the file to read.
    Returns:
        str: The contents of the file.
    """
    with open(path) as file:
        return file.read()
    

def write_all(path: str, contents: str):
    """ Writes text to a file.
    Args:
        path (str): The path of the file to write (existing files will be overwritten).
        contents (str): The text to write to the file.
    """
    with open(path, 'w') as file:
        file.write(contents)
    

def read_and_fill(path: str, substitutions: dict):
    """ Reads the entire contents of a text template file, performs substitutions and returns it.
    Args:
        path (str): The path of the file to read.
        substitutions (dict): A dictionary of subsitutions to make.
    Returns:
        str: The contents of the file after making substutitions.
    """
    return Template(read_all(path)).substitute(substitutions)


def enumize(name: str):
    """ Converts the specified name to an enum-friendly format.
    Args:
        name (str): The name to convert.
    Returns:
        str: The converted name.
    """
    return name.replace(' ', '_').upper()


# Show title card.
print_title_card()

# Ask for service information.
service_name = ask("What do you want to call your app?")
service_description = ask("Describe your app in a few words:")
service_topic = ask("What topic does your service cover? (e.g. GDPR, health and safety, business ethics)")

# Ask for prompt types.
prompt_type_1 = ask("Enter your first prompt type (e.g. job role, company size, business sector):")
prompt_type_2 = ask("Enter your second prompt type (e.g. job role, company size, business sector):")
prompt_type_3 = ask("Enter your third prompt type (e.g. job role, company size, business sector):")

# Ask the user to choose a color (options are restricted).
chosen_color = ask(
    "Which colour should your app be? (choose from orange, green, red, purple, blue)", 
    [
        "orange", 
        "green", 
        "red", 
        "purple", 
        "blue",
    ])

# Compile dictionary of substitutions.
substitutions = {
    'serviceName': service_name.capitalize(),
    'serviceDescription': service_description.capitalize(),
    'serviceTopic': service_topic,
    'promptType1': prompt_type_1.capitalize(),
    'promptTypeEnum1': enumize(prompt_type_1),
    'promptType2': prompt_type_2.capitalize(),
    'promptTypeEnum2': enumize(prompt_type_2),
    'promptType3': prompt_type_3.capitalize(),
    'promptTypeEnum3': enumize(prompt_type_3),
    'chosenColor': chosen_color,
}

# Perform substitutions on file templates.
homepage_code = read_and_fill('templates/index.tsx.template', substitutions)
trpc_endpoint_code = read_and_fill('templates/query.ts.template', substitutions)
database_schema_code = read_and_fill('templates/schema.prisma.template', substitutions)
button_component_code = read_and_fill('templates/CheckButton.tsx.template', substitutions)

# Write files back to disk.
write_all('src/pages/index.tsx', homepage_code)
write_all('src/server/api/routers/query.ts', trpc_endpoint_code)
write_all('prisma/schema.prisma', database_schema_code)
write_all('src/components/CheckButton.tsx', button_component_code)

# Help the user set up the database and launch the app.
if ask('Would you like to automatically clear and set up your database now? [y/n]', ['y', 'n']) == 'y':
    os.system("npx prisma db push --force-reset")
    if ask('Done! Would you like to start your app so you can access it at http://localhost:3000 right away? [y/n]', ['y', 'n']) == 'y':
        os.system("npm run dev")
    else:
        print('No problem! You can run your app later using the following command:')
        print('\tnpm run dev')
else:
    print('No problem! You can set up your database later using the following command:')
    print('\tnpx prisma db push --force-reset')
    print('Then, you can run your app using:')
    print('\tnpm run dev')
