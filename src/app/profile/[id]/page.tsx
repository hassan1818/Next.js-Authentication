// Grabbing params from the URL

export default function UserProfile({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Specific user profile page:
        <span className="text-black p-2 bg-orange-600 rounded-lg ml-2">{params.id}</span>
      </p>
    </div>
  );
}
