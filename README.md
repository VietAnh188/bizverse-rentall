# Bizverse RentAll

_Become a host, allow guest search and rent your rooms_.

## Features

- Can Login, Logout, update your profile
- Become a host, create new listings (host)
- View your reservations, approve, decline, cancel your reservations (host)
- Vote, review your guest (host)
- Searching for listing, book your trips (guest)
- View or cancel your trips (guest)
- Contact host by message (guest)
- Vote, review listing, host (guest)
- Message (host + guest)
- Receive email for new messages, booking state ( host + guest)
- ... (Add more later)

#### Environment
- Node 12.22.9
- NPM 6.14.15
- React 16.4.1
- mysql 2.13.0

#### Guideline

- Get project and setup environment
  - Step 1: Install mysql in your computer
  - Step 2: Clone project:
    ```
    git clone git@bitbucket.org:bizverse/bizverse-rentall-web.git
    ```
  - Step 3: clone suitable env file to .env, example for development:
    ```
    local: "cp env_local .env"
    development: "cp env_development .env"
    production: "cp env_production .env"
    ```
  - Step 4: import file database:
    ```
    mysql -u [username] -p rentall_v_3_2 < ./db/db_dump.sql
    ```
  - Step 5: Install packages:
    ```
    yarn install
    ```
  - Step 6.1: Start app:
    ```
    yarn start
    ```
  - Step 6.2: Build app (server):
    ```
    yarn build
    ```
#### Author

Rentall team
