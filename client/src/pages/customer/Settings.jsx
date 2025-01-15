import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "../../store/useUserStore";
import { useFileUpload } from "../../hooks/useFileUpload";
import { useHandleForm } from "../../hooks/useHandleForm";
import FormControls from "../../components/form/FormControl";
import { controlProfileForm, initialProfileForm } from "../../config";
import UserSettingSkeleton from "../../components/loading/UserSettingSkeleton";

const Settings = () => {
  const { formData, setFormData, handleChange } =
    useHandleForm(initialProfileForm);
  const [editProfile, setEditProfile] = useState(false);
  const { profile, updateUserProfile, getUserProfile, isProfileLoading } =
    useUserStore();

  const { singleUpload } = useFileUpload(
    formData,
    setFormData,
    updateUserProfile
  );

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile, setFormData]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setEditProfile(false);
    updateUserProfile(formData);
  };

  return (
    <section className="space-y-6">
      {!profile && <UserSettingSkeleton />}

      {profile && (
        <div className="grid grid-cols-12 gap-4 p-4 default_border">
          <div className="col-span-4">
            <div className="p-4 space-y-4 default_border ">
              <div className="relative h-60">
                {isProfileLoading && (
                  <div className="loading_background z-10 flex items-center justify-center">
                    <Loader2 size={60} className="animate-spin" />
                  </div>
                )}
                <img
                  src={profile.avatar}
                  className="w-full h-full object-cover"
                  alt="avatar"
                />
              </div>
              <div className="w-full h-14">
                <input
                  id="file"
                  name="avatar"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={singleUpload}
                  disabled={isProfileLoading}
                />
                <label
                  htmlFor="file"
                  className={`w-full inline-block text-white font-semibold py-2 px-4 text-center rounded cursor-pointer ${
                    isProfileLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {isProfileLoading ? "Uploading..." : "Change Photo"}
                </label>
                <div className="text-xs text-center py-2">
                  Maximum allowed size: 1MB
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-8 space-y-4">
            <form onSubmit={handleProfileUpdate}>
              <FormControls
                formData={formData}
                handleChange={handleChange}
                formControls={controlProfileForm}
                disabled={!editProfile}
              />

              <div className="flex justify-end space-y-2">
                {editProfile ? (
                  <div className="flex items-center  gap-2">
                    <Button type="button" onClick={() => setEditProfile(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Update</Button>
                  </div>
                ) : (
                  <Button type="button" onClick={() => setEditProfile(true)}>
                    Edit
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Settings;
