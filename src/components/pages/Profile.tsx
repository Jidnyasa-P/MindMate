import { useState } from "react";
import { Button } from '../ui/button';

export default function Profile() {
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    bio: "",
    notifications: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as any;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-teal-600 mb-6">My Profile</h1>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-4">
        {/* Profile Picture */}
        <div className="flex items-center space-x-4">
          <img src="https://via.placeholder.com/80" alt="Profile" className="rounded-full h-20 w-20" />
          <Button variant="outline">Change Photo</Button>
        </div>

        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" name="email" value={formData.email} readOnly className="w-full rounded-md border-gray-300 bg-gray-100 dark:bg-gray-700 dark:text-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600">
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600" />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium mb-1">About Me</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} className="w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600" rows={4}></textarea>
        </div>

        {/* Notifications */}
        <div className="flex items-center space-x-2">
          <input type="checkbox" name="notifications" checked={formData.notifications} onChange={handleChange} />
          <label>Receive notifications and updates</label>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="reset">Cancel</Button>
          <Button type="submit" className="bg-teal-600 text-white hover:bg-teal-700">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
