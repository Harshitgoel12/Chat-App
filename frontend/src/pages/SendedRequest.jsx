import { useSelector } from 'react-redux';

const SendedRequest = ({ setSendRequest }) => {
  const user = useSelector(state => state.user.userData);
  const requests = user?.RequestSend?.filter(req => req.Status === "Pending") || [];

  const dummyAvatars = [
    "https://randomuser.me/api/portraits/men/75.jpg",
    "https://randomuser.me/api/portraits/women/65.jpg",
    "https://randomuser.me/api/portraits/men/85.jpg",
    "https://randomuser.me/api/portraits/women/45.jpg",
    "https://randomuser.me/api/portraits/men/55.jpg",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md max-h-[80vh] rounded-xl shadow-xl p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Friend Requests Sent</h2>
          <button
            className="text-gray-500 hover:text-red-600 text-lg font-bold"
            onClick={() => setSendRequest(false)}
          >
            ✕
          </button>
        </div>

        {requests.length === 0 ? (
          <p className="text-gray-600 text-center mt-10">No pending requests sent.</p>
        ) : (
          requests.map((req, idx) => {
            const avatar = dummyAvatars[idx % dummyAvatars.length];
            const username = req?.User?.username || `User ${idx + 1}`;

            return (
              <div
                key={idx}
                className="flex items-center justify-between p-3 mb-3 bg-gray-50 rounded-lg shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={avatar}
                    alt="avatar"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">{username}</h3>
                    <p className="text-sm text-gray-500">{req.Status}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SendedRequest;
