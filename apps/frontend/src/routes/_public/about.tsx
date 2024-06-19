import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/about')({
  component: AboutComponent,
});

function AboutComponent() {
  return (
    <div className="mx-auto flex h-full flex-col p-4">
      <div className="flex flex-col justify-center text-center">
        <h1 className="text-4xl font-semibold">About Page</h1>
      </div>
    </div>
  );
}
