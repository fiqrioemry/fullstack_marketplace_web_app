import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import SettingsLoading from "@/components/loading/SettingsLoading";
import ProfilePreview from "@/components/customer/profile/ProfilePreview";
import ProfileSettings from "@/components/customer/profile/ProfileSettings";

const CustomerProfile = () => {
  const { getProfile, profile } = useUserStore();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (!profile) return <SettingsLoading />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ProfileSettings />
      <ProfilePreview />
    </div>
  );
};

export default CustomerProfile;
