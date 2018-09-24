FactoryBot.define do
  factory :stock do
    name { "Test Stock" }
    price { 10000 }
    interest { 5 }
    duration { 10 }
    user { nil }
  end
end
