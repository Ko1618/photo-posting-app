class CommentsController < ApplicationController 

  def index
    post = Post.find(params[:post_id])
    comments = post.comments
    render json: comments, include: { user: [ :profile] }
  end

  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.build(comment_params)
    @comment.user_id = current_user.id
    comment_reply
    render json: @comment, include: { user: [ :profile] }
  end

  private
  def comment_params
    params.require(:comment).permit(:content).merge(user_id: current_user.id)
  end

  def comment_reply
    users = User.all
    users.each do |user|
      @to_name = user.username
      @from_name = @comment.user
      if @comment.content.include?("@#{@to_name}")
        @content = @comment.content
        CommentMailer.comment_reply(user, @from_name, @content).deliver_later
        @comment.save!
      else
        @comment.save!
      end
    end

  end

end