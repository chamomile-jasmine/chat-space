# README

## DB設計

### users table
|Column|Type|Options|
|-------|----|-------|
|name|string|index: true,null: false,unique: true|
|mail|string|null: false,unique: true|

### Assocoation
- has_many :groups,through: :group_users
- has_many :messages
- has_many :group_users

* * *

### groups table
|Column|Type|Options|
|-------|----|-------|
|name|string|index: true,null: false,unique: true|

### Assocoation
- has_many :users,through: :group_users
- has_many :group_users
- has_many :messages

* * *

### messages table
|Column|Type|Options|
|-------|----|-------|
|body|text||
|image|string||
|group|reference|foreign_key: true|
|user|reference|foreign_key: true|

### Assocoation
- belongs_to :group
- belongs_to :user

* * *

### group_users table
|Column|Type|Options|
|-------|----|-------|
|group|reference|index: true,foreign_key: true,null: false|
|user|reference|index: true,foreign_key: true,null: false|

### Assocoation
- belongs_to :group
- belongs_to :user

