import { useEffect } from "react";
import { useShopStore } from "@/store/useShopStore";
import ProfileDisplay from "@/components/dashboard/ProfileDisplay";
import StoreProfileLoading from "@/components/loading/StoreProfileLoading";

const Profile = () => {
  const { getStoreProfile, profile } = useShopStore();

  useEffect(() => {
    getStoreProfile();
  }, [getStoreProfile]);

  if (!profile) return <StoreProfileLoading />;
  return <ProfileDisplay />;
};

export default Profile;
