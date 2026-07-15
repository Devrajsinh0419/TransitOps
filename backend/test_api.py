import requests

def test():
    try:
        response = requests.get('http://127.0.0.1:8000/api/fuel-logs/')
        print("Status Code:", response.status_code)
        print("Response:", response.json())
    except Exception as e:
        print("Error:", e)

test()
