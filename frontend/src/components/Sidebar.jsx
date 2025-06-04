import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activePage }) => {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-white shadow-md">
      <nav className="mt-6">
        <ul>
          <li>
            <button
              onClick={() => navigate('/dashboards')}
              className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                activePage === 'dashboard' ? 'font-semibold bg-gray-200' : ''
              }`}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/campaigns')}
              className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                activePage === 'campaigns' ? 'font-semibold bg-gray-200' : ''
              }`}
            >
              Create Campaign
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/calendar')}
              className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                activePage === 'calendar' ? 'font-semibold bg-gray-200' : ''
              }`}
            >
              Calendar
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/payments')}
              className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                activePage === 'payments' ? 'font-semibold bg-gray-200' : ''
              }`}
            >
              Payments
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/analyticsq')}
              className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                activePage === 'analytics' ? 'font-semibold bg-gray-200' : ''
              }`}
            >
              Analytics
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/support')}
              className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                activePage === 'support' ? 'font-semibold bg-gray-200' : ''
              }`}
            >
              Support
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;