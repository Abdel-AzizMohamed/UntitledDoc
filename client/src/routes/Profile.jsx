import { useState } from "react";
import useAuth from "../hooks/useAuth";
import InputField from "../comps/Form/InputField";

function Profile() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  const { auth } = useAuth();

  async function updateUserInfo() {}

  return (
    <div className="profile-menu">
      <div className="user-info">
        <img
          src={
            auth?.user?.profile_image
              ? auth.user.profile_image
              : "/default_profile2.png"
          }
        />
        <span className="username">{auth?.user?.username}</span>
      </div>
      <form action="" method="POST">
        <InputField
          name="username"
          fieldType="text"
          fieldValue={username}
          setField={setUsername}
        />
        <InputField
          name="email"
          fieldType="text"
          fieldValue={email}
          setField={setEmail}
        />
        <InputField
          name="current password"
          fieldType="text"
          fieldValue={currentPassword}
          setField={setCurrentPassword}
        />
        <InputField
          name="new password"
          fieldType="text"
          fieldValue={newPassword}
          setField={setNewPassword}
        />
        <input type="submit" value="Update" onClick={updateUserInfo} />
      </form>
    </div>
  );
}

export default Profile;
