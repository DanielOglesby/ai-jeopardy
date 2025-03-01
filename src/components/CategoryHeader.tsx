import React, { useState, useEffect } from "react";
import { Category } from "@/types";

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
  const [isFirstClick, setIsFirstClick] = useState(true);

  // Check if the category name follows the default pattern "Category X"
  const isDefaultName = /^Category \d+$/.test(category.name);

  useEffect(() => {
    // Update editedName when category name changes from parent
    setEditedName(category.name);
  }, [category.name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
    onCategoryChange(category.id, e.target.value);
  };

  const handleFocus = () => {
    // Clear the input on first focus if it's a default category name
    if (isFirstClick && isDefaultName) {
      setEditedName("");
      onCategoryChange(category.id, "");
      setIsFirstClick(false);
    }
  };

  return (
    <div className="h-14 xs:h-16 sm:h-18 md:h-20 bg-jeopardy-blue border-2 border-black p-1 xs:p-2 flex items-center justify-center uppercase font-bold text-white text-center">
      {isEditable ? (
        <input
          type="text"
          value={editedName}
          onChange={handleChange}
          onFocus={handleFocus}
          className="category-input w-full h-full text-xs xs:text-sm md:text-base"
          placeholder=""
          maxLength={30}
        />
      ) : (
        <div className="w-full text-center text-2xs xs:text-xs sm:text-sm md:text-base">
          {category.name}
        </div>
      )}
    </div>
  );
};

export default CategoryHeader;
