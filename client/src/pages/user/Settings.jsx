import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import SettingsAvatar from "@/components/user/SettingsAvatar";
import SettingsProfile from "@/components/user/SettingsProfile";
import SettingsLoading from "@/components/loading/SettingsLoading";

const Settings = () => {
  const { getProfile, profile } = useUserStore();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (!profile) return <SettingsLoading />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      <SettingsAvatar />
      <SettingsProfile />
    </div>
  );
};

export default Settings;
