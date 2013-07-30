require 'sqlite3'
require 'active_record'

ActiveRecord::Base.establish_connection(
  :adapter => "sqlite3",
  :database => 'app.db'
  )
ActiveRecord::Migration.class_eval do
  unless table_exists? :inputs
    create_table :inputs do |table|
      table.column :name, :string
      table.column :selected_value, :string
    end
  end

  unless table_exists? :values
    create_table :values do |table|
      table.column :name, :string
      table.column :input_id, :int
    end
  end

  class Input < ActiveRecord::Base
    has_many :values
  end

  class Value < ActiveRecord::Base
    belongs_to :input
  end
end