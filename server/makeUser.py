import json
import random
import string

Alpha = [i for i in string.ascii_letters]
AlphaLen = len(Alpha)

newUserKey = ''
for i in range(7):
    if i%2 == 0 or i%3 == 1:
        r = random.randrange(0, AlphaLen)
        newUserKey += (Alpha[r])
    else:
        r = int(random.random() * 100)
        newUserKey += (str(r))


with open('.\\db\\user.json', 'r') as f:
    data = json.load(f)

InitialName = "Babo"

data['User'].append({
    "InitName": InitialName,
    "key": newUserKey
})

with open('.\\db\\user.json', 'w') as f:
    json.dump(data, f, indent=4)