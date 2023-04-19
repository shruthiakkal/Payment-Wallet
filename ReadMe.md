# APIS

## API configs

All the IDS generated are system generated UUIDs

All dates are stored in DB as JS date format, in response date is converted to ISO8601 format

Base URL : `http:localhost:3000`

HEADER: `Content-Type:application/json`

API version : `v0`

## Create wallet API

Method: `POST`

URL: `{base_url}/api/v0/wallet/setup`

Request:

```
{
  "name": "SAM",
  "balance":100.1234
}
```

Response:

```
{
  "Status": 200,
  "body": {
    "id": "85ad5bdb-26d3-4edd-994f-12a724751824",
    "balance": 100.1235,
    "transactionId": "57b26c06-1dd0-4f2f-a1f8-67ed6d68ce3e",
    "name": "SAM",
    "date": "2023-04-19T18:38:15+05:30"
  }
}
```

Possible Error Codes:

| HTML ERROR Code | Custom Code | Description                    |
| --------------- | ----------- | ----------- |
| 200             | 200         |  Successful response           |
| 400                          |   400           | Request body parameters missing
| 404                |  404           | Resource not found            |
| 422                |  422           | Unprocessable Content            |
| 500                |  500           | Logic error            |


## Fetch wallet API

Method: `GET`

URL: `{base_url}/api/v0/wallet/:walletId`

URL Params:

```
walletId : ID of the wallet to fetch
```

Response:

```
{
  "Status": 200,
  "body": {
    "id": "9a02d977-7ff1-4ab2-b7f0-ac74d06ebfcf",
    "name": "SAM",
    "balance": 0,
    "date": "2023-04-19T15:39:08+05:30"
  }
}
```

Possible Error Codes:

| HTML ERROR Code | Custom Code | Description                    |
| --------------- | ----------- | ----------- |
| 200             | 200         |  Successful response           |
| 400                          |   400           | Request body parameters missing
| 404                |  404           | Resource not found            |
| 422                |  422           | Unprocessable Content            |
| 500                |  500           | Logic error            |


## Create transactions API

Method: `POST`

URL: `{base_url}/api/v0/wallet/transact/:walletid`

URL Params:

```
walletId : ID of the wallet to add transaction
```

Request:

```
{
"amount": 100.05,
"description":"Chaya"
}
```

Response:

```
{
  "Status": 200,
  "body": {
    "balance": 100.05,
    "transactionId": "f9b3d0c9-ff74-4ee0-a1c7-8c90ae0b9121"
  }
}

```

Possible Error Codes:

| HTML ERROR Code | Custom Code | Description                    |
| --------------- | ----------- | ----------- |
| 200             | 200         |  Successful response           |
| 400                          |   400           | Request body parameters missing
| 404                |  404           | Resource not found            |
| 422                |  422           | Unprocessable Content            |
| 500                |  500           | Logic error            |


## Fetch transactions API

Method: `GET`

URL: `{base_url}/api/v0/wallet/transactions?walletId={walletId}&skip={skip}&limit={limit}&sortField={sortField}&sortType={sortType}`

URL Params:

```
walletId : ID of the wallet to fetch transactions
limit : no of transactions given in each response
skip : no of blocks of transactions (each block equals limit) to skip
sortField: field with which to sort, AMOUNT and DATE are supported in this API
sortType: field to decide whether to sort in ascending or descending order,possible values DESC andASC

```

Response:

```
{
  "Status": 200,
  "body": [
    {
      "id": "4e20b3a6-deda-4216-992d-3933c300cf36",
      "walletId": "9a02d977-7ff1-4ab2-b7f0-ac74d06ebfcf",
      "amount": 100.1235,
      "balance": 100.1235,
      "description": "Credited",
      "date": "2023-04-19T15:39:08+05:30",
      "type": "CREDIT"
    },
    {
      "id": "689b8b56-918d-4566-b802-0df961ae1d4a",
      "walletId": "9a02d977-7ff1-4ab2-b7f0-ac74d06ebfcf",
      "amount": 100.05,
      "balance": 200.1,
      "description": "Chaya",
      "date": "2023-04-19T18:48:35+05:30",
      "type": "CREDIT"
    },
    {
      "id": "f9b3d0c9-ff74-4ee0-a1c7-8c90ae0b9121",
      "walletId": "9a02d977-7ff1-4ab2-b7f0-ac74d06ebfcf",
      "amount": 100.05,
      "balance": 100.05,
      "description": "Chaya",
      "date": "2023-04-19T18:47:31+05:30",
      "type": "CREDIT"
    }
  ]
}
```

Possible Error Codes:

| HTML ERROR Code | Custom Code | Description                    |
| --------------- | ----------- | ----------- |
| 200             | 200         |  Successful response           |
| 400                          |   400           | Request body parameters missing
| 404                |  404           | Resource not found            |
| 422                |  422           | Unprocessable Content            |
| 500                |  500           | Logic error            |
