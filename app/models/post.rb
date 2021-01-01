class Post < ApplicationRecord
  validates :images, presence: true
  validates :content, presence: true

  has_many_attached :images
  
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  belongs_to :user

end
