require 'rails_helper'

RSpec.describe Comment, type: :model do
  let!(:user) { create(:user) }
  let!(:post) { create(:post, user: user) }
  

  context '内容が入力されている場合' do

    let!(:comment) { create(:comment, user: user, post: post) }
    it 'コメントを保存できる' do 
      expect(comment).to be_valid
    end
  end
end



