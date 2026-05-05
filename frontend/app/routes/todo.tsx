import { useParams } from "react-router";
import { gql } from "@apollo/client";
import { Loading } from "~/components/loading";
import { Error } from "~/components/error";
import { Card } from "~/components/card";
import { useQuery } from "@apollo/client/react";

export const Todo = () => {
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
  const { loading, error, data } = useQuery(GET_TODO_QUERY, {
    variables: { id },
  });

  if (loading) return <Loading message="Loading todo..." />;
  if (error) return <Error message="Error fetching todo." />;

  return (
    <div>
      <h1>Todo Details</h1>
      <Card title={data.todo.title} description={data.todo.description}>
        <p>Completed:</p>
        {data.todo.completed ? (
          <div className="text-green-500 font-bold">Yes</div>
        ) : (
          <div className="text-red-500 font-bold">No</div>
        )}
        <div className="mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => (window.location.href = "/todos")}
          >
            Back to List
          </button>
        </div>
        <div className="mt-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() =>
              (window.location.href = `/todos/${data.todo.id}/edit`)
            }
          >
            Edit
          </button>
        </div>
      </Card>
    </div>
  );
};
