require 'rails_helper'

RSpec.describe Post, type: :model do
  let!(:user) { create(:user) }
  

  context '写真と内容が入力されている場合' do
    let!(:post) { create(:post, user: user) }
    it '写真を保存できる' do 
      expect(post).to be_valid
    end
  end
end
