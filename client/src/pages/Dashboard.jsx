import { useEffect, useState } from "react";

import API from "../services/api";

import { toast } from "react-toastify";

function Dashboard() {

  const [stats, setStats] = useState({
    totalUsers: 0,
  });

  const [projects, setProjects] = useState([]);

  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    skills: "",
    github: "",
    linkedin: "",
  });

  const [profileForm, setProfileForm] = useState({
    bio: "",
    skills: "",
    github: "",
    linkedin: "",
  });

  useEffect(() => {

    fetchDashboard();

    fetchProjects();

    fetchProfile();

  }, []);

  const fetchDashboard = async () => {

    try {

      const res = await API.get("/auth/dashboard");

      setStats(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchProjects = async () => {

    try {

      const res = await API.get("/projects");

      setProjects(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchProfile = async () => {

    try {

      const res = await API.get("/auth/profile");

      setProfile(res.data);

      setProfileForm({
        bio: res.data.bio || "",
        skills: res.data.skills || "",
        github: res.data.github || "",
        linkedin: res.data.linkedin || "",
      });

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleProfileChange = (e) => {

    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value,
    });

  };

  const handleSaveProfile = async () => {

    try {

      const res = await API.put(
        "/auth/profile",
        profileForm
      );

      setProfile(res.data);

      toast.success(
        "Profile Updated Successfully"
      );

    } catch (error) {

      console.log(error);

      toast.error("Profile Update Failed");

    }

  };

  const handleCreateProject = async (e) => {

    e.preventDefault();

    try {

      const data = new FormData();

      data.append("title", formData.title);

      data.append(
        "description",
        formData.description
      );

      if (image) {

        data.append("image", image);

      }

      if (editingId) {

        await API.put(
          `/projects/${editingId}`,
          data,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        toast.success(
          "Project Updated Successfully"
        );

        setEditingId(null);

      } else {

        await API.post(
          "/projects/create",
          data,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        toast.success(
          "Project Created Successfully"
        );

      }

      setFormData({
        title: "",
        description: "",
      });

      setImage(null);

      fetchProjects();

    } catch (error) {

      console.log(error);

      toast.error("Operation Failed");

    }

  };

  const handleEditProject = (project) => {

    setFormData({
      title: project.title,
      description: project.description,
    });

    setEditingId(project._id);

  };

  const handleDeleteProject = async (id) => {

    try {

      await API.delete(`/projects/${id}`);

      toast.success(
        "Project Deleted Successfully"
      );

      fetchProjects();

    } catch (error) {

      console.log(error);

      toast.error("Delete Failed");

    }

  };

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";

  };

  return (

    <div className="min-h-screen bg-transparent text-white p-5 md:p-10">

      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">

        <h1 className="text-3xl md:text-5xl font-extrabold gradient-text">

          DevConnect Dashboard

        </h1>

        <button
          onClick={handleLogout}
          className="modern-button bg-red-500 text-white"
        >
          Logout
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

        <div className="glass card-hover rounded-3xl p-8">

          <h2 className="text-2xl font-bold mb-4">
            Total Users
          </h2>

          <p className="text-5xl font-bold text-blue-400">
            {stats.totalUsers}
          </p>

        </div>

        <div className="glass card-hover rounded-3xl p-8">

          <h2 className="text-2xl font-bold mb-4">
            Active Sessions
          </h2>

          <p className="text-5xl font-bold text-green-400">
            35
          </p>

        </div>

        <div className="glass card-hover rounded-3xl p-8">

          <h2 className="text-2xl font-bold mb-4">
            Projects
          </h2>

          <p className="text-5xl font-bold text-pink-400">
            {projects.length}
          </p>

        </div>

      </div>

      <div className="glass card-hover rounded-3xl p-8 mb-10">

        <h2 className="text-3xl font-bold mb-8 gradient-text">
          Developer Profile
        </h2>

        <div className="space-y-4 mb-8">

          <p>
            <span className="font-bold">
              Name:
            </span>
            {" "}
            {profile.name}
          </p>

          <p>
            <span className="font-bold">
              Email:
            </span>
            {" "}
            {profile.email}
          </p>

        </div>

        <div className="space-y-5">

          <textarea
            name="bio"
            placeholder="Enter Bio"
            value={profileForm.bio}
            onChange={handleProfileChange}
            className="modern-input"
            rows="3"
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills"
            value={profileForm.skills}
            onChange={handleProfileChange}
            className="modern-input"
          />

          <input
            type="text"
            name="github"
            placeholder="GitHub Link"
            value={profileForm.github}
            onChange={handleProfileChange}
            className="modern-input"
          />

          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn Link"
            value={profileForm.linkedin}
            onChange={handleProfileChange}
            className="modern-input"
          />

          <button
            onClick={handleSaveProfile}
            className="modern-button bg-emerald-500 text-white"
          >
            Save Profile
          </button>

        </div>

      </div>

      <div className="glass card-hover rounded-3xl p-8 mb-10">

        <h2 className="text-3xl font-bold mb-8 gradient-text">

          {editingId
            ? "Edit Project"
            : "Create Project"}

        </h2>

        <form
          onSubmit={handleCreateProject}
          className="space-y-5"
        >

          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            className="modern-input"
            required
          />

          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            className="modern-input"
            rows="4"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
            className="modern-input"
          />

          <button
            type="submit"
            className="modern-button bg-blue-600 text-white"
          >

            {editingId ? "Update" : "Create"}

          </button>

        </form>

      </div>

      <div>

        <h2 className="text-3xl font-bold mb-8 gradient-text">
          Latest Projects
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {projects.map((project) => (

            <div
              key={project._id}
              className="glass card-hover rounded-3xl overflow-hidden"
            >

              {project.image && (

                <img
                  src={project.image}
                  alt="project"
                  className="w-full h-60 object-cover"
                />

              )}

              <div className="p-6">

                <div className="flex justify-between items-center mb-4">

                  <h3 className="text-2xl font-bold">
                    {project.title}
                  </h3>

                </div>

                <p className="mb-6 text-gray-300">
                  {project.description}
                </p>

                <div className="flex gap-4">

                  <button
                    onClick={() =>
                      handleEditProject(project)
                    }
                    className="modern-button bg-blue-500 text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteProject(project._id)
                    }
                    className="modern-button bg-red-500 text-white"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Dashboard;