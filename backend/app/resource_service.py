def get_resources(risk_level):

    if risk_level == "Critical":
        return {
            "officers": 10,
            "barricades": 5,
            "diversions": 2
        }

    elif risk_level == "High":
        return {
            "officers": 7,
            "barricades": 3,
            "diversions": 1
        }

    elif risk_level == "Medium":
        return {
            "officers": 4,
            "barricades": 2,
            "diversions": 0
        }

    else:
        return {
            "officers": 2,
            "barricades": 1,
            "diversions": 0
        }