export type TodoCreateForm = {
  title: string;
  description: string;
  error: string;
};

export function newTodoCreateForm(): TodoCreateForm {
  return { title: "", description: "", error: "" };
}
