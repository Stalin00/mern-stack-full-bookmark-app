import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", { withCredentials: true });

function Dashboard() {
  const [bookmarks, setBookmarks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const fetchBookmarks = async () => {
    const res = await axios.get("http://localhost:5000/api/bookmarks", { withCredentials: true });
    setBookmarks(res.data);
  };

  useEffect(() => {
    fetchBookmarks();
    socket.on("refresh", fetchBookmarks);
  }, []);

  const addBookmark = async () => {
    await axios.post("http://localhost:5000/api/bookmarks", { title, url }, { withCredentials: true });
    setTitle("");
    setUrl("");
  };

  const deleteBookmark = async (id) => {
    await axios.delete(`http://localhost:5000/api/bookmarks/${id}`, { withCredentials: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <header className="max-w-5xl mx-auto mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">My Bookmarks</h2>
          <p className="text-sm text-slate-500">Quickly save and organize the links you love.</p>
        </div>
        <div className="text-sm text-slate-600">Connected</div>
      </header>

      <main className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            className="col-span-1 md:col-span-1 px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-300"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="col-span-1 md:col-span-1 px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-300"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="col-span-1 md:col-span-1 flex items-center">
            <button
              onClick={addBookmark}
              className="w-full px-4 py-2 bg-emerald-500 text-white rounded-lg shadow hover:bg-emerald-600 transition"
            >
              Add Bookmark
            </button>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarks.map((b) => (
            <li key={b._id} className="bg-white rounded-xl p-4 shadow-sm flex flex-col justify-between">
              <div>
                <a href={b.url} target="_blank" rel="noreferrer" className="text-sky-600 font-semibold hover:underline">
                  {b.title}
                </a>
                <p className="text-xs text-slate-400 mt-2 break-words">{b.url}</p>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => deleteBookmark(b._id)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Dashboard;