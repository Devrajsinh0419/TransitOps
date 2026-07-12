# 🚀 API Quick Reference Card

**Base URL**: `http://localhost:8000/api`  
**Auth**: `Authorization: Bearer {token}`  
**Content-Type**: `application/json`

---

## 🔐 AUTH

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/auth/register/` | Create account |
| POST | `/auth/login/` | Get tokens |
| POST | `/auth/refresh/` | Refresh access token |
| GET | `/auth/me/` | Current user |

---

## 🚗 VEHICLES

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/vehicles/` | List all |
| POST | `/vehicles/` | Create |
| GET | `/vehicles/{id}/` | Get one |
| PUT | `/vehicles/{id}/` | Update |
| DELETE | `/vehicles/{id}/` | Delete |

**Query Params**: `?page=1`, `?status=active`, `?search=toyota`, `?ordering=-created_at`

---

## 👨‍💼 DRIVERS

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/drivers/` | List all |
| POST | `/drivers/` | Create |
| GET | `/drivers/{id}/` | Get one |
| PUT | `/drivers/{id}/` | Update (assign vehicle) |
| DELETE | `/drivers/{id}/` | Delete |

**Query Params**: `?status=active`, `?license_type=hgv`, `?search=name`

---

## 🗺️ TRIPS

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/trips/` | List all |
| POST | `/trips/` | Create |
| GET | `/trips/{id}/` | Get one |
| PATCH | `/trips/{id}/` | Update status |
| DELETE | `/trips/{id}/` | Cancel |

**Query Params**: `?status=completed`, `?vehicle=1`, `?driver=1`, `?date_from=2024-01-01`

---

## 🔧 MAINTENANCE

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/maintenance/` | List all |
| POST | `/maintenance/` | Schedule |
| GET | `/maintenance/{id}/` | Get one |
| PATCH | `/maintenance/{id}/` | Mark complete |

**Query Params**: `?status=pending`, `?vehicle=1`, `?service_type=oil_change`

---

## ⛽ FUEL

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/fuel/` | List logs |
| POST | `/fuel/` | Add log |
| GET | `/fuel/statistics/` | Fuel stats |

**Query Params**: `?vehicle=1`, `?date_from=2024-01-01`, `?period=month`

---

## 💰 EXPENSES

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/expenses/` | List all |
| POST | `/expenses/` | Create (with file) |
| PATCH | `/expenses/{id}/` | Approve/Reject |

**Query Params**: `?status=pending`, `?category=maintenance`, `?vehicle=1`

---

## 📊 REPORTS

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/reports/fleet-summary/` | Fleet overview |
| GET | `/reports/vehicle-performance/` | Vehicle metrics |
| GET | `/reports/driver-performance/` | Driver metrics |
| GET | `/reports/financial-summary/` | Expense breakdown |

---

## 📝 Request Examples

### Login
```javascript
POST /auth/login/
{
  "username": "john_doe",
  "password": "password123"
}

Response:
{
  "access": "eyJhbGci...",
  "refresh": "eyJhbGci...",
  "user": { ... }
}
```

### Create Vehicle
```javascript
POST /vehicles/
{
  "make": "Toyota",
  "model": "Hiace",
  "year": 2022,
  "license_plate": "GJ01AB1234"
}
```

### Create Trip
```javascript
POST /trips/
{
  "vehicle": 1,
  "driver": 1,
  "start_location": "Ahmedabad",
  "end_location": "Surat",
  "start_time": "2024-01-20T08:00:00Z",
  "distance": 250,
  "cost": 15000
}
```

### Update Trip Status
```javascript
PATCH /trips/1/
{
  "status": "completed",
  "end_time": "2024-01-20T12:00:00Z"
}
```

### Create Expense (with file)
```javascript
POST /expenses/
FormData {
  vehicle: 1,
  category: "maintenance",
  description: "Oil change",
  amount: 5000,
  date: "2024-01-20",
  receipt: <File>
}
```

---

## 🔄 Response Format

### Success (200/201)
```json
{
  "id": 1,
  "field1": "value1",
  "field2": "value2",
  "created_at": "2024-01-20T10:30:00Z"
}
```

### List (200)
```json
{
  "count": 100,
  "next": "...?page=2",
  "previous": null,
  "results": [...]
}
```

### Error (4xx/5xx)
```json
{
  "error": "Error title",
  "detail": "Detailed message",
  "status_code": 400
}
```

---

## ⚡ Common Status Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | OK | Success |
| 201 | Created | Resource created |
| 400 | Bad Request | Check your data |
| 401 | Unauthorized | Get new token |
| 403 | Forbidden | No permission |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Report to backend |

---

## 💡 Tips

1. **Always include Authorization header**
   ```
   Authorization: Bearer YOUR_ACCESS_TOKEN
   ```

2. **List endpoints are paginated (10 per page)**
   ```
   ?page=1&page_size=20
   ```

3. **Use query params to filter**
   ```
   /vehicles/?status=active&search=toyota
   ```

4. **Use FormData for file uploads**
   ```javascript
   const form = new FormData();
   form.append('file', fileInput.files[0]);
   ```

5. **Token expires in 1 hour, use refresh to get new one**
   ```
   POST /auth/refresh/ with refresh token
   ```

6. **Always handle errors gracefully**
   ```javascript
   if (response.status === 401) {
     // Token expired, refresh it
     // Or redirect to login
   }
   ```

---

**Print this card and keep it handy!** 📌