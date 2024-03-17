import json

# Read the JSON file containing domain names
with open('companies.json', 'r') as file:
    domains = json.load(file)

# Remove "www." prefix from domain names
cleaned_domains = [domain.replace('www.', '') for domain in domains]

# Write the updated domain names back to the JSON file
with open('dima.json', 'w') as file:
    json.dump(cleaned_domains, file, indent=4)

