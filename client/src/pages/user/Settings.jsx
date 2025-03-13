import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import DisplayCard from "@/components/user/DisplayCard";
import DisplayProfile from "@/components/user/DisplayProfile";
import SettingsLoading from "@/components/loading/SettingsLoading";

const Settings = () => {
  const { getProfile, profile } = useUserStore();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (!profile) return <SettingsLoading />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <DisplayCard />
      <DisplayProfile />
    </div>
  );
};

export default Settings;
