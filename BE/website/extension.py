def create_json(x):
    data = {}
    for i in x:
        data[i[0]] = i[1][0]

    return data