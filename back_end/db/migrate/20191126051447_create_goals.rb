class CreateGoals < ActiveRecord::Migration[5.2]
  def change
    create_table :goals do |t|
      t.integer :content
      t.references :user

      t.timestamps
    end
  end
end
