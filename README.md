# Node Express Role Base Authorization App
This is a boilerplate for auth functionality, covering authentication and authorization.
It contains a complete sample CRUD operation.

`Note: Node >= 16`


# Setup
`git clone https://github.com/asifsabir5020/node_express_role_base_authorization_app .git`

`cd node_express_role_base_authorization_app`

`create .env file with the help of .env.sample file`

`npm install`

`npm run dev`

# Roles Short Description

In User Model we set three roles `admin` `author` `reader`

Only `admin` authorized to `{{base_url}}/users/all`

`author` can `create`, `update` and `delete`, the `book`

`admin` can also delete a `book`
