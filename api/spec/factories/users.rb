FactoryBot.define do
  factory :user do
    email { "rspec@email.com" }
    password_digest { "$2a$04$wo14ucnAbdYIIW979WAj1.b9zdU8n9sAKnVchX6S0nYXj5pjpNJke" }
    first { "Test" }
    last { "User" }
  end
end
