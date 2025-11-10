import { useState } from "react";
import { Button } from '../ui/button';


export default function Settings() {
  const [settings, setSettings] = useState({
    privacy: "public",
    theme: "light",
    notifications: true,
    twoFactorAuth: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, checked, value } = e.target as any;
    setSettings((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-teal-600 mb-6">Settings</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-6">

        {/* Account Settings */}
        <section>
          <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Account Settings</h2>
          <Button variant="outline" className="mr-2">Change Email</Button>
          <Button variant="outline" className="mr-2">Change Password</Button>
          <Button variant="destructive">Delete Account</Button>
        </section>

        {/* Privacy Settings */}
        <section>
          <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Privacy Settings</h2>
          <select name="privacy" value={settings.privacy} onChange={handleChange} className="w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600">
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="friends">Only Friends</option>
          </select>
        </section>

        {/* Theme Settings */}
        <section>
          <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Theme Settings</h2>
          <label className="flex items-center space-x-2">
            <input type="radio" name="theme" value="light" checked={settings.theme === "light"} onChange={handleChange} />
            <span>Light</span>
            <input type="radio" name="theme" value="dark" checked={settings.theme === "dark"} onChange={handleChange} />
            <span>Dark</span>
          </label>
        </section>

        {/* Notifications */}
        <section>
          <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Notifications</h2>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="notifications" checked={settings.notifications} onChange={handleChange} />
            <span>Receive Email Updates</span>
          </label>
        </section>

        {/* Security */}
        <section>
          <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Security</h2>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="twoFactorAuth" checked={settings.twoFactorAuth} onChange={handleChange} />
            <span>Enable Two-Factor Authentication</span>
          </label>
        </section>

        {/* Help & Support */}
        <section>
          <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Help & Support</h2>
          <Button variant="link">Contact Support</Button>
          <Button variant="link">FAQ</Button>
        </section>
      </div>
    </div>
  );
}
