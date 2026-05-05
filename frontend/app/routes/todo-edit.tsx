import { useParams } from "react-router";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { Loading } from "~/components/loading";
import { Error } from "~/components/error";

export const ToDoEdit = () => {
  const { id } = useParams();
  const GET_TODO_QUERY = gql`
    query GetTodo($id: ID!) {
      todo(id: $id) {
        id
        title
        description
        completed
      }
    }
  `;

  const UPDATE_TODO_MUTATION = gql`
    mutation UpdateTodo(
      $id: ID!
      $title: String!
      $description: String!
      $completed: Boolean!
    ) {
      updateTodo(
        id: $id
        title: $title
        description: $description
        completed: $completed
      ) {
        id
        title
        description
        completed
      }
    }
  `;

  const [updateTodo, { update_data, update_loading, update_error }] =
    useMutation(UPDATE_TODO_MUTATION);

  const { loading, error, data } = useQuery(GET_TODO_QUERY, {
    variables: { id },
  });

  if (loading || update_loading) return <Loading message="Loading todo..." />;
  if (error || update_error) return <Error message="Error fetching todo." />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit ToDo</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            defaultValue={data.todo.title}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            defaultValue={data.todo.description}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Completed</label>
          <input
            type="checkbox"
            defaultChecked={data.todo.completed}
            className="ml-2"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onSubmit={(e) => {
            e.preventDefault();
            updateTodo({
              variables: {
                id,
                title: (e.target as HTMLFormElement).title.valueOf(),
                description: (e.target as HTMLFormElement).description.valueOf(),
                completed: (e.target as HTMLFormElement).completed.checked,
              },
            });
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};
