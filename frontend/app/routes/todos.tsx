import { gql } from "@apollo/client";
import { Loading } from "~/components/loading";
import { Error } from "~/components/error";
import { Link } from "react-router";
import { useQuery } from "@apollo/client/react";

export const ToDos = () => {
    const GET_TODOS_QUERY = gql`
        query GetTodos {
            todos {
                id
                title
                description
                completed
            }
        }
    `;
    const { loading, error, data } = useQuery(GET_TODOS_QUERY);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">ToDos</h1>
            {loading && <Loading message="Loading todos..." />}
            {error && <Error message="Error fetching todos." />}
            {data?.todos.length === 0 && <p>No todos found.</p>}
            {data && data?.todos.length > 0 && (
                <div className="space-y-4">
                    {data.todos.map((todo: { id: string; title: string; description: string; completed: boolean }) => (
                        <Link to={`/todo/${todo.id}`} key={todo.id} className="block mb-4 p-4 border rounded hover:bg-gray-100"/>
                    ))}
                </div>
            )}
        </div>
    );
}