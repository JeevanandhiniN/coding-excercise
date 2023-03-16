# Retail rewards point Calculator

A retailer offers a rewards program to its customers, which is based on points earned for every purchase.

A customer would receive,
  - Two points for every dollar spent over $100 in each transaction
  - One point for every dollar spent over $50 in each transaction

For example: In $120 purchase, points earned would be calculated as:
 2 x $20 + 1 x $50 = 90 points

Given a record of every transaction during a three month period, calculate the reward points earned for each customer per month and total.

Please follow the below steps to run the app:

    Fork and clone the repo.
    Run npm install
    npx json-server --watch src/dataset/transaction.json --port 3004
    npm run start
    select the month in the drop down to get the specific month's information
