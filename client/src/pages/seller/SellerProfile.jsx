import { useEffect } from "react";
import { useShopStore } from "@/store/useShopStore";
import ProfilePreview from "@/components/seller/profile/ProfilePreview";
import ProfileSettings from "@/components/seller/profile/ProfileSettings";
import StoreProfileLoading from "@/components/loading/StoreProfileLoading";

const SellerProfile = () => {
  const { getStoreProfile, profile } = useShopStore();

  useEffect(() => {
    getStoreProfile();
  }, [getStoreProfile]);

  if (!profile) return <StoreProfileLoading />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ProfileSettings />
      <ProfilePreview />
    </div>
  );
};

export default SellerProfile;
