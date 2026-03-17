import React from "react";

const TodoHeader: React.FC = () => {
  return (
    <div className="bg-linear-to-r from-purple-600 to-blue-600 px-6 py-8">
      <h1 className="text-3xl font-bold text-white text-center">Todo List</h1>
      <p className="text-purple-100 text-center mt-2">支持撤销 / 重做功能</p>
    </div>
  );
};

export default TodoHeader;
