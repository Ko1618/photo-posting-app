FactoryBot.define do
  factory :post do
    content { Faker::Lorem.characters(number: 30) }
    after(:build) do |post|
      post.images.attach(io: File.open(Rails.root.join('spec', 'fixtures', 'files', 'サンプル.png')), filename: 'サンプル.png', content_type: 'image/png')
    end
  end
end