class CreateCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :categories do |t|
      t.string :name
      t.float :cost
      t.references :user

      t.timestamps
    end
  end
end
