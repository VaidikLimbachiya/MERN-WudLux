import { useEffect, useState } from "react";
import "./Users.css"; // Import CSS file
import { TfiLocationPin } from "react-icons/tfi";


const Users = ({ url }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!url) {
      console.error("URL is undefined in Users.jsx!");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch(`${url}/api/auth/users`);
        const data = await response.json();
        console.log("API Response:", data);
        setUsers(data); // Save data to state
      } catch (error) {
        console.error("API fetch error:", error);
      }
    };

    fetchUsers();
  }, [url]);

  return (
    <div className="container">
      <h2 className="title">Users List</h2>
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Addresses</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber || "N/A"}</td>
                <td>
                  {user.addresses?.length > 0 ? (
                    <ul className="address-list">
                      {user.addresses.map((address, index) => (
                        <li key={index}>
                          <TfiLocationPin  className="location-icon"/>{address.street}, {address.city}, {address.state}, {address.country} ({address.zipCode})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="no-address">No Addresses</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
