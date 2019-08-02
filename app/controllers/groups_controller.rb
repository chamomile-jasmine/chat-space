class GroupsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_group_params, only: [:edit, :update]

  def search
    @users_except_me = User.where.not(id: current_user.id)
    @users = @users_except_me.where('name LIKE(?)', "%#{params[:keyword]}%")
    respond_to do |format|
    format.json
    end
  end


  def index
    @groups = current_user.groups.order(id: :DESC)
  end

  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      respond_to do |format|
        format.html { redirect_to root_path, notice: "グループを作成しました" }
        format.json
      end
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      render :edit
    end
  end



  private

  def group_params
    user_ids = params[:group]["user_ids"]
    user_ids << current_user.id.to_s
    params.require(:group).permit(:name, { :user_ids => [] })
  end

  def find_group_params
    @group = Group.find(params[:id])
  end
end
