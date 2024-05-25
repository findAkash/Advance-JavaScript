const todos = [];

const getTodos = (req, res) => {
  if (!todos) {
    res.status(404).json({ message: 'No todos found' });
  }
  todos.push(req.body);
  res.status(200).json(todos);
};

const getTodoIndex = (req, res) => {};

const addTodo = (req, res) => {};

const updateTodoAtIndex = (req, res) => {
  const { todo } = req.body;
  const { index } = req.params;

  if (todos.length < index) {
    res.status(404).json({ message: 'Todo not found' });
  }
};

const deleteTodoAtIndex = (req, res) => {
  const { index } = req.params;
  const todoIndex = parseInt(index, 10);
  if (isNaN(todoIndex) || todos.length < index || index < 0) {
    res.status(404).json({ error: 'index not found' });
  }
  todos.splice(index, 1);
  res.status(200).json(todos);
};

module.exports = {
  getTodos,
  getTodoIndex,
  addTodo,
  updateTodoAtIndex,
  deleteTodoAtIndex,
};
