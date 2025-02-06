import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import Profile from "@/components/dashboard/customer/Profile";
import ProfileLoading from "@/components/loading/ProfileLoading";

const ProfileLayout = () => {
  const { getProfile, loading } = useUserStore();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <section className="space-y-6">
      {loading ? <ProfileLoading /> : <Profile />}
    </section>
  );
};

export default ProfileLayout;
