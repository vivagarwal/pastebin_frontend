import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewSnippet() {
  const { uniqueLink } = useParams();  // Retrieve unique link from URL
  const [snippetData, setSnippetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BASE_URL;  // Backend URL
        const res = await fetch(`${baseUrl}/api/snippets/view/${uniqueLink}`);

        if (!res.ok) {
          throw new Error("Failed to fetch the snippet.");
        }

        const data = await res.json();
        setSnippetData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSnippet();
  }, [uniqueLink]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 shadow-lg rounded-md">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">Snippet Details</h2>
      <div className="bg-gray-100 p-4 rounded-md">
        <p className="whitespace-pre-wrap text-gray-800">{snippetData.content}</p>
      </div>
    </div>
  );
}

export default ViewSnippet;
