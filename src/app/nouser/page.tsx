import Link from 'next/link';

type NoSignedUserProps = {
     params: { noUserText: string };
}

export default function NoSignedUser({ params }: NoSignedUserProps) {
  const { noUserText } = params;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center">
      <h1 className="text-4xl font-bold">No User Signed In</h1>
      <p className="mt-4 text-lg">{noUserText}</p>
      <Link href="/">
        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
          Login
        </button>
      </Link>
    </div>
  );
}