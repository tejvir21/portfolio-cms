import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div>
        <h1 className="text-4xl font-bold">Something went wrong</h1>

        <pre className="mt-4">{JSON.stringify(error, null, 2)}</pre>
      </div>
    </div>
  );
}
