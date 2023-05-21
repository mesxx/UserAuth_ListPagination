## Documentation

## Tech Stack

**Server:** Node, Express, MongoDB

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

Run seed

```bash
  npm run cseed
```

Remove seed

```bash
  npm run rseed
```

## API Reference

#### User Sign Up

```http
  POST /api/user/auth/signup
```

| Body       | Type     | Description   |
| :--------- | :------- | :------------ |
| `username` | `string` | **Required**. |
| `password` | `string` | **Required**. |
| `fullName` | `string` | **Required**. |

#### User Login

```http
  POST /api/user/auth/login
```

| Body       | Type     | Description   |
| :--------- | :------- | :------------ |
| `username` | `string` | **Required**. |
| `password` | `string` | **Required**. |

#### User List

```http
  GET /api/user/userlist
```

| Query Params | Type  | Description                  |
| :----------- | :---- | :--------------------------- |
| `limit`      | `int` | **Required for pagination**. |
| `page`       | `int` | **Required for pagination**. |
