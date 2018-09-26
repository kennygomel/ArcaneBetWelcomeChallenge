# ArcaneBet Welcome Challenge

> A Ruby on Rails + Vue.js project

## Installation

Make sure that you have installed Docker first
 
Use these commands to run the project

```
git clone https://github.com/kennygomel/ArcaneBetWelcomeChallenge-Docker.git ArcaneBet

cd ArcaneBet

docker-compose build

docker-compose run api db:migrate

docker-compose up
```

## Testing

At this project you can find **RSpec** and **Rubocop** for the backed part and the **Mocha** and **Cypress** for the frontend

**Attention:**
- **Mocha** can start only on local machine, not in Docker image because it using **Karma**
- If you can't execute **cypress** use NPX install command

```
# rspec

docker-compose run api rspec


# rubocop

docker-compose run api rubocop


# mocha

cd app

run app npm test


# cypress

cd app

# use 'run' to run tests in bash, or 'open' to do the same in UI
cypress run || open


#npx install command

npm i -g npx

#then use 'npx cyrpess' in 'app' folder to run cypress tests

```
