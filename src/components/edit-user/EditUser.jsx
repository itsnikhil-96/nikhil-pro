import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { userLoginContext } from '../../contexts/userLoginContext';
import { useNavigate } from 'react-router-dom';

function EditUser() {
  const { register, handleSubmit, setValue } = useForm();
  const { currentUser, setCurrentUser } = useContext(userLoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Set default form values based on currentUser when component mounts
    setValue('username', currentUser.username);
    setValue('email', currentUser.email);
    setValue('mobile', currentUser.mobile);
    setValue('profileImage', currentUser.profile); // Assuming profileImage field matches your context
  }, [currentUser, setValue]);

  const onSave = async (modifiedUser) => {
    try {
      let res = await fetch(`http://localhost:3000/users/${currentUser.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(modifiedUser),
      });

      if (res.ok) {
        // Update currentUser context with modifiedUser data
        setCurrentUser({ ...currentUser, ...modifiedUser });
        navigate("/user-profile");
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <form className="mx-auto mt-5 bg-light p-3" onSubmit={handleSubmit(onSave)}>
        {/* username */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            {...register("username")}
          />
        </div>
        {/* email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            {...register("email")}
          />
        </div>
        {/* mobile */}
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">
            Mobile no
          </label>
          <input
            type="text"
            id="mobile"
            className="form-control"
            {...register("mobile")}
          />
        </div>
        {/* profileImage */}
        <div className="mb-3">
          <label htmlFor="profileImage" className="form-label">
            Profile Image URL
          </label>
          <input
            type="text"
            id="profileImage"
            className="form-control"
            {...register("profileImage")}
            disabled
          />
        </div>
        {/* submit button */}
        <button className="btn btn-success" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditUser;
