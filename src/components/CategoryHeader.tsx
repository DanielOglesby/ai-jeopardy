import React, { useState } from 'react';
import { Category } from '@/types';

interface CategoryHeaderProps {
  category: Category;
  isEditable: boolean;
  onCategoryChange: (categoryId: string, name: string) => void;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  category,
  isEditable,
  onCategoryChange,
}) => {
  const [editedName, setEditedName] = useState(category.name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
    onCategoryChange(category.id, e.target.value);
  };

  return (
    <div className="h-20 bg-jeopardy-blue border-2 border-black p-2 flex items-center justify-center uppercase font-bold text-white text-center">
      {isEditable ? (
        <input
          type="text"
          value={editedName}
          onChange={handleChange}
          className="category-input w-full h-full"
          placeholder="Enter category"
          maxLength={30}
        />
      ) : (
        <div className="w-full text-center text-sm md:text-base">{category.name}</div>
      )}
    </div>
  );
};

export default CategoryHeader;