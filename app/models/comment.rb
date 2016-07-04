class Comment < ActiveRecord::Base
  validates :body, presence: true

  belongs_to :story
  has_one :user,
    through: :story,
    source: :user
end
