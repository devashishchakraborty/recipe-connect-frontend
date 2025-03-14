import { useEffect, useState } from "react";
import "../styles/Profile.css";

const Profile = ({ user }) => {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) {
      const timeoutId = setTimeout(() => {
        setCopied(false);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [copied]);
  return (
    <section className="pico container profile">
      <div>
        <b>Name</b>: {user.name}
      </div>
      <div>
        <b>Email</b>: {user.email}
      </div>
    </section>
  );
};

export default Profile;
