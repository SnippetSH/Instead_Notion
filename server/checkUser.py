import json

def check(value):
    if isinstance(value, str) and '-' in value:
        InitName = value.split('-')[0]
        key = value.split('-')[1]

        with open('.\\db\\user.json', 'r') as f:
            data = json.load(f)

        user = data["User"]
        for i in user:
            if i["InitName"] == InitName and i["key"] == key:
                if InitName == "AdminSH":
                    return 3
                else:
                    return 2
    else:
        return 0
    return 0

if __name__ == "__main__":
    print(check("babo"))
    print(check("AdminSH-A28w4M34q3F85"))
