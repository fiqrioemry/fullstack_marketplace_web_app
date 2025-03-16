import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import SettingsLoading from "@/components/loading/SettingsLoading";
import AccountProfileDisplay from "@/components/user/account/AccountProfileDisplay";
import AccountProfileSettings from "@/components/user/account/AccountProfileSettings";

const Account = () => {
  const { getProfile, profile } = useUserStore();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (!profile) return <SettingsLoading />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <AccountProfileSettings />
      <AccountProfileDisplay />
    </div>
  );
};

export default Account;
