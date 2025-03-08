import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import SettingsDisplay from "@/components/user/SettingsDisplay";
import SettingsLoading from "@/components/loading/SettingsLoading";

const Settings = () => {
  const { getProfile, profile } = useUserStore();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (!profile) return <SettingsLoading />;

  return <SettingsDisplay />;
};

export default Settings;
