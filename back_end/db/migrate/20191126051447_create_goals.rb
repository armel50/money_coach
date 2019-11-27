class CreateGoals < ActiveRecord::Migration[5.2]
  def change
    create_table :goals do |t|
      t.datetime :deadline
      t.text :description
      t.float :cost

      t.references :user

      t.timestamps
    end
  end
end
